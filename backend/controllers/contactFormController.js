import ContactForm from "../models/contactFormModel.js";

// Send contact form
export const sendContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.json({
        message: "Please fill all the fields",
        success: false,
      });
    }
    await ContactForm.create({ name, email, subject, message });
    return res.json({
      message: "Contact form sent successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: "Internal server error", success: false });
  }
};
