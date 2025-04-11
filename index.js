import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import cors from "cors";
import validateEmailAndUsername from "./middlewares/validateEmailAndUsername.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  }),
);

const client = new PrismaClient();

app.post("/auth/register", [validateEmailAndUsername], async (req, res) => {
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
    res.status(500).json({ message: "Something went wrong. please try again" });
  }
});

const port = process.env.PORT || 4000;

app.listen("4000", () => {
  console.log(`Server running on port ${port}`);
});
