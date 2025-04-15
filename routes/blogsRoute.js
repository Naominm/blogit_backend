import { Router } from "express";
import { createBlog, getBlog } from "../controllers/blogsController.js";
import verifyUser from "../middlewares/verifyUser.js";

const router = Router();

router.route("/").post(verifyUser, createBlog);
router.route("/:blogId").get(verifyUser, getBlog);

export default router;
