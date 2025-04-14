import express from "express";
import cors from "cors";
import validateEmailAndUsername from "./middlewares/validateEmailAndUsername.js";
import checkPasswordStrength from "./middlewares/checkPasswordStrength.js";
import { register, login } from "./controllers/authController.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.post(
  "/auth/register",
  [validateEmailAndUsername, checkPasswordStrength],
  register,
);

app.post("/auth/login", login);

const port = process.env.PORT || 4000;

app.listen("4000", () => {
  console.log(`Server running on port ${port}`);
});
