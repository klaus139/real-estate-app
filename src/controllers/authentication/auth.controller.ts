import { Request, Response } from 'express';
import crypto from 'crypto';
import { sendVerificationEmail, sendPasswordResetEmail } from '../../services/emailService';

//  REGISTER USER & SEND VERIFICATION EMAIL
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Generate token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Save user to DB (unverified)
    const newUser = await User.create({
      username,
      email,
      password,
      isVerified: false,
      verificationToken,
    });

    // Send verification email
    await sendVerificationEmail(newUser.email, verificationToken);

    res.status(201).json({
      message: 'Registration successful! Please check your email to verify your account.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during registration', error });
  }
};

//  VERIFY EMAIL TOKEN (Triggered when user clicks email link)
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: 'Verification token is required' });
    }

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined; 
    await user.save();

    res.status(200).json({ message: 'Email verified successfully! You can now log in.' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying email', error });
  }
};

//  REQUEST PASSWORD RESET & SEND RESET EMAIL
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      // Return 200 for security so attackers can't probe valid emails
      return res.status(200).json({ message: 'If that email exists, a reset link has been sent.' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    await user.save();

    // Send password reset email
    await sendPasswordResetEmail(user.email, resetToken);

    res.status(200).json({ message: 'Password reset link sent to your email.' });
  } catch (error) {
    res.status(500).json({ message: 'Error requesting password reset', error });
  }
};