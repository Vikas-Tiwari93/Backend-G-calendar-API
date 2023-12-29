import * as nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vikastiwarisync@gmail.com",
    pass: process.env.GMAIL_PASSWORD,
  },
  secure: false,
});

export const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: "vikastiwarisync@gmail.com",
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        console.log("Email sent: " + info.response);
        resolve(info.response);
      }
    });
  });
};
