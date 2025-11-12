const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { sendEmail } = require("../config/email");

// Subscribe to newsletter
router.post(
  "/",
  [body("email").isEmail().withMessage("Valid email is required")],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { email } = req.body;

      // Send welcome email
      await sendEmail({
        to: email,
        subject: "Selamat Datang - Newsletter Delta Indonesia",
        html: `
          <h2>Terima kasih telah berlangganan!</h2>
          <p>Anda akan menerima update terbaru tentang program pelatihan dan sertifikasi K3 dari kami.</p>
          <br>
          <p>Salam,<br>Tim Delta Indonesia</p>
        `,
      });

      res.json({
        success: true,
        message: "Successfully subscribed to newsletter",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
