import { Router } from "express";
import { createBlog } from "../controllers/blogsController.js";
import verifyUser from "../middlewares/verifyUser.js";

const router = Router();

router.route("/").post(verifyUser, createBlog);

export default router;
