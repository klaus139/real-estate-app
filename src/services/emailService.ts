import { sendEmail } from '../utils/sendEmail';

// Registration Verification
export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
  const verificationUrl = `http://localhost:3333/api/auth/verify-email?token=${token}`;

  await sendEmail({
    to: email,
    subject: 'Verify Your Email Address',
    text: `Welcome! Please verify your account by opening this link in your browser:\n\n${verificationUrl}`,
  });
};

// Password Reset 
export const sendPasswordResetEmail = async (email: string, token: string): Promise<void> => {
  const resetUrl = `http://localhost:5000/api/auth/reset-password?token=${token}`;

  await sendEmail({
    to: email,
    subject: 'Password Reset Request',
    text: `You requested a password reset. Please open this link in your browser to reset your password:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`,
  });
};