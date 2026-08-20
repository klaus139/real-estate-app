import { sendEmail } from '../utils/sendEmail';

export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
  const verificationUrl = `http://localhost:5000/api/auth/verify-email?token=${token}`;

  await sendEmail({
    to: email,
    subject: 'Verify Your Email Address',
    text: `Welcome to our platform! Please verify your account by opening this link in your browser:\n\n${verificationUrl}`,
  });
};