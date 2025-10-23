const Contact = require("../models/Contact");
const { sendEmail } = require("../config/email");

exports.sendContactMessage = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;

    // Save to database
    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    // Send email notification to admin
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Send confirmation email to user
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

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateContactStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: "Contact not found",
      });
    }

    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
