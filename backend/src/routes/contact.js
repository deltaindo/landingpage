const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { sendEmail } = require("../config/email");

// Submit contact form
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("phone").trim().notEmpty().withMessage("Phone number is required"),
    body("message").trim().notEmpty().withMessage("Message is required"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { name, email, phone, message } = req.body;

      // Send email to admin
      await sendEmail({
        to: process.env.EMAIL_USER,
        subject: "New Contact Form Submission - Delta Indonesia",
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });

      // Send confirmation to user
      await sendEmail({
        to: email,
        subject: "Terima Kasih - Delta Indonesia",
        html: `
          <h2>Terima kasih telah menghubungi kami!</h2>
          <p>Halo ${name},</p>
          <p>Kami telah menerima pesan Anda dan akan segera menghubungi Anda kembali.</p>
          <br>
          <p>Salam,<br>Tim Delta Indonesia</p>
        `,
      });

      res.json({
        success: true,
        message: "Message sent successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
