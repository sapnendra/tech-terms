import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import contactFormRoute from "./routes/contactFormRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// database & cloudinary connection
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from server...");
});

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/contact", contactFormRoute);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
