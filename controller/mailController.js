import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendMail = async (req, res) => {
  const { name, email, phone, eventType, eventDate, guestCount, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    const htmlMessage = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Event Type:</strong> ${eventType}</p>
      <p><strong>Event Date:</strong> ${eventDate}</p>
      <p><strong>Guests:</strong> ${guestCount}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: `New Inquiry from ${name}`,
      html: htmlMessage,
    });

    res.json({ success: true, message: "Email sent successfully!" });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Email sending failed!" });
  }
};
