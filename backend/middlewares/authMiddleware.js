import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// protect user actions
export const protect = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not Authorized", success: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};

// Admin only actions
export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not Authorized", success: false });
  }

  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Admins only access", success: false });
  }

  next();
};