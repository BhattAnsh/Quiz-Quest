/** @format */

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Define the function parameters
const mailSender = async (email: string, title: string, body: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send mail
    const info = await transporter.sendMail({
      from: `Quiz-Quest - by BhattAnsh`,
      to: email,
      subject: title,
      html: body,
    });

    console.log(info);
    return info;
  } catch (err) {
    console.error("Error in sending mail", err);
    throw new Error("Failed to send email");
  }
};

export default mailSender;
