import { sendEmail } from '../utils/sendEmail';
import dotenv from 'dotenv';

dotenv.config();

export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {

  await sendEmail({
    to: email,
    subject: 'Verify Your Email Address',
    text: `Welcome to our platform! Please verify your account by opening this link in your browser:\n\n${process.env.verificationUrl}`,
  });
};