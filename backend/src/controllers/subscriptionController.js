const { sendEmail } = require("../config/email");

exports.subscribe = async (req, res, next) => {
  try {
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
};
