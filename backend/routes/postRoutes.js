import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import {
  getAllPost,
  createPost,
  deletePost,
  editPost,
  likeUnlike,
} from "../controllers/postController.js";

const postRoutes = express.Router();

postRoutes.post("/newpost", protect, createPost);
postRoutes.put("/edit/:id", protect, editPost);
postRoutes.delete("/delete/:id", adminOnly, deletePost);
postRoutes.get("/like/:userId", protect, likeUnlike);
postRoutes.get("/all", getAllPost);

export default postRoutes;
