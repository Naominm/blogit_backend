import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import blogsRouter from "./routes/blogsRoute.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://blog-it-git-master-naomi-mbuguas-projects.vercel.app",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use("/auth", authRouter);
app.use("/blogs", blogsRouter);

app.get("/", (req, res) => {
  console.log("Root route accessed!");
  res.send("API is running");
});

export default app;
