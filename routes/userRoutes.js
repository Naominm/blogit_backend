import express from "express";
import {
  createOrUpdateUserProfile,
  getUserProfile,
  updateUserAccountInfo,
} from "../controllers/userController.js";
import verifyUser from "../middlewares/verifyUser.js";

const router = express.Router();

router.get("/profile", verifyUser, getUserProfile);
router.post("/profile", verifyUser, createOrUpdateUserProfile);
router.patch("/profile", verifyUser, updateUserAccountInfo);

export default router;
