import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import cors from "cors";
import validateEmailAndUsername from "./middlewares/validateEmailAndUsername.js";
import checkPasswordStrength from "./middlewares/checkPasswordStrength.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  }),
);

const client = new PrismaClient();

app.post(
  "/auth/register",
  [validateEmailAndUsername, checkPasswordStrength],
  async (req, res) => {
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
      console.error("Error creating user:", e);
      res
        .status(500)
        .json({ message: "Something went wrong. please try again" });
    }
  },
);

app.post("/auth/login", async (req, res) => {
  try {
    //1. Read the identifier and the password from the client
    const { identifier, password } = req.body;
    //2. Get the record where emailAddress or username matches the identifier
    const user = await client.user.findFirst({
      where: {
        OR: [{ emailAddress: identifier }, { userName: identifier }],
      },
    });
    console.log(user);
    //3. If the record doesn't exist, wrong login credentials
    //4. if the record exist, compare the password with the stored hash password
    //5. If the password don't math, wrong login credentials.
    //6. if they match, save important info into a json web token and ssend the json web token to the client
  } catch (e) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

const port = process.env.PORT || 4000;

app.listen("4000", () => {
  console.log(`Server running on port ${port}`);
});
