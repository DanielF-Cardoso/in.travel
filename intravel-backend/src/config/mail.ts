import nodemailer from "nodemailer";
import { env } from "./env";

export async function getMailClient() {
  const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    secure: env.EMAIL_SECURE,
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.error("Error verifying transporter:", error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  return transporter;
}
