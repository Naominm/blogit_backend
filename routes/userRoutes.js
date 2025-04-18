import express from "express";
import {
  createOrUpdateUserProfile,
  getUserProfile,
  updateUserAccountInfo,
  updateUserPassword,
} from "../controllers/userController.js";
import verifyUser from "../middlewares/verifyUser.js";

const router = express.Router();

router.get("/profile", verifyUser, getUserProfile);
router.post("/profile", verifyUser, createOrUpdateUserProfile);
router.patch("/profile", verifyUser, updateUserAccountInfo);
router.patch("/password", verifyUser, updateUserPassword);

export default router;
