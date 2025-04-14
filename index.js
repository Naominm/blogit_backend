import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";

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

app.get("/", (req, res) => {
  console.log("Root route hit!");
  res.send("API is running");
});

export default app;
