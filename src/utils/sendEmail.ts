import nodemailer from 'nodemailer';

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string; // Plain text only
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({ to, subject, text }: SendEmailOptions): Promise<void> => {
  await transporter.sendMail({
    from: `"Real Estate Platform" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  });
};