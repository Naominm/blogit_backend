import { Router } from "express";
import validateEmailAndUsername from "../middlewares/validateEmailAndUsername";
import checkPasswordStrength from "../middlewares/checkPasswordStrength";
import { register } from "../controllers/authController";

const router = Router();

router
  .route("/auth/register")
  .post([validateEmailAndUsername, checkPasswordStrength], register);
