import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import {
  getAllPost,
  createPost,
  deletePost,
  editPost,
  likeUnlike,
  getUserPosts,
  getPostById,
} from "../controllers/postController.js";

const postRoutes = express.Router();

postRoutes.post("/newpost", protect, createPost);
postRoutes.put("/edit/:id", protect, editPost);
postRoutes.delete("/delete/:id", protect, deletePost);
postRoutes.get("/like/:_id", protect, likeUnlike);
postRoutes.get("/all", getAllPost);
postRoutes.get("/user-posts", protect, getUserPosts);
postRoutes.get("/:id", getPostById);

export default postRoutes;
