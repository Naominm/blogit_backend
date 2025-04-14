import { Router } from "express";
import validateEmailAndUsername from "../middlewares/validateEmailAndUsername.js";
import checkPasswordStrength from "../middlewares/checkPasswordStrength.js";
import { register, login } from "../controllers/authController.js";

const router = Router();

router
  .route("/register")
  .post( [validateEmailAndUsername,checkPasswordStrength],register);

router.route("/login").post(login);

export default router;
