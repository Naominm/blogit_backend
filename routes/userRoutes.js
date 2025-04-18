import express from "express";
import {
  createOrUpdateUserProfile,
  getUserProfile,
} from "../controllers/userController.js";
import verifyUser from "../middlewares/verifyUser.js";

const router = express.Router();

router.get("/profile", verifyUser, getUserProfile);
router.post("/profile", verifyUser, createOrUpdateUserProfile);

export default router;
