/** @format */
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const email = process.env.EMAIL_USER;
const password = process.env.EMAIL_PASS;

const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });
    console.log("Email transporter created", text);
    const mailOptions = {
      from: email,
      to,
      subject,
      text,
      html: `
        <h1>${subject}</h1>
        <p>${text}</p>
        <p>Thank you for using our service!</p>
        <p>Best regards,</p>
        <p>Leo kln</p>`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email", error);
    throw new Error("Failed to send email");
  }
};
export default sendEmail;
