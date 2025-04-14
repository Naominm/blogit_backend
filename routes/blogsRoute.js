import { Router } from "express";
import { createBlog } from "../controllers/blogsController";

const router = Router();

router.route("/blogs").post(createBlog);

export default router;
