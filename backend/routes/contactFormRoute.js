import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { sendContactForm } from "../controllers/contactFormController.js";

const contactFormRoute = express.Router();

contactFormRoute.post("/send", protect, sendContactForm);

export default contactFormRoute;