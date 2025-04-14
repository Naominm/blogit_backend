import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use("/auth", authRouter);

export default app;
