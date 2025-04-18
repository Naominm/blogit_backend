import { Router } from "express";
import {
  createBlog,
  getBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} from "../controllers/blogsController.js";
import verifyUser from "../middlewares/verifyUser.js";

const router = Router();

router.route("/").post(verifyUser, createBlog);
router.route("/").get(verifyUser, getBlogs);
router.route("/:blogId").get(verifyUser, getBlog);
router.route("/:blogId").delete(verifyUser, deleteBlog);
router.route("/:blogId").patch(verifyUser, updateBlog);

export default router;
