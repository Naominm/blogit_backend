import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const client = new PrismaClient();

export const register = async (req, res) => {
  const { firstName, lastName, emailAddress, userName, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const newUser = await client.user.create({
      data: {
        firstName,
        lastName,
        emailAddress,
        userName,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "user created successfully" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong. please try again" });
  }
};

export const login = async (req, res) => {
  try {
    //1. Read the identifier and the password from the client
    const { identifier, password } = req.body;
    //2. Get the record where emailAddress or username matches the identifier
    const user = await client.user.findFirst({
      where: {
        OR: [{ emailAddress: identifier }, { userName: identifier }],
      },
    });

    //3. If the record doesn't exist, wrong login
    if (!user) {
      return res.status(401).json({ message: "wrong login credentials" });
    }
    //4. if the record exist, compare the password with the stored hash password
    const isMatch = await bcrypt.compare(password, user.password);

    //5. If the password don't math, wrong login credentials.
    if (!isMatch) {
      return res.status(401).json({ message: "wrong login credentials" });
    }
    //6. if they match, save important info into a json web token and send the json web token to the client
    const jwtPayload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY);

    res
      .status(200)
      .cookie("blogitAuthToken", token, {
        secure: false,
        sameSite: "None",
        // secure:true,
        // httpOnly:true,
        // sameSite:"None"
      })
      .json({
        token,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        userName: user.userName,
      });
  } catch (e) {
    res.status(500).json({
      message: "something went wrong one",
    });
  }
};
