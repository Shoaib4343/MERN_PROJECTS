import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port:  process.env.SMTP_PORT,
  // secure: false, // true for 465, false for other ports
  auth: {
    user:  process.env.SMTP_USER,
    pass:  process.env.SMTP_PASS,
  },
});

// optional: verify connection on startup
transporter.verify((err) => {
  if (err) console.error("❌ SMTP connection error:", err);
  else     console.log("✅ Mailtrap SMTP ready");
});

export default transporter;