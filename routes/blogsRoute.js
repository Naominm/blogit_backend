import { Router } from "express";
import { createBlog } from "../controllers/blogsController.js";

const router = Router();

router.route("/").post(createBlog);

export default router;
