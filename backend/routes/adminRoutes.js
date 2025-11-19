import express from "express";
import {
  adminDeletePost,
  getAdminDashboard,
} from "../controllers/adminController.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";

const adminRoutes = express.Router();

adminRoutes.get("/dashboard", protect, adminOnly, getAdminDashboard);
adminRoutes.delete("/posts/:id", protect, adminOnly, adminDeletePost);

export default adminRoutes;

