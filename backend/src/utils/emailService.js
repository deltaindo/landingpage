const { sendEmail } = require("../config/email");

class EmailService {
  static async sendContactNotification(contactData) {
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Phone:</strong> ${contactData.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${contactData.message}</p>
      `,
    });
  }

  static async sendWelcomeEmail(email, name) {
    await sendEmail({
      to: email,
      subject: "Selamat Datang di Delta Indonesia",
      html: `
        <h2>Selamat Datang, ${name}!</h2>
        <p>Terima kasih telah menghubungi Delta Indonesia.</p>
        <p>Kami akan segera menghubungi Anda untuk informasi lebih lanjut.</p>
      `,
    });
  }
}

module.exports = EmailService;
