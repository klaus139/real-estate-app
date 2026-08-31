import { Request, Response } from 'express';
import { registerUser, verifyEmailToken } from '../../services/authentication/auth.service';

// Register User & Send Verification Email
export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, phone } = req.body;

    // Call functional service directly
    await registerUser(fullName, email, password, phone);

    return res.status(201).json({
      message: 'Registration successful! Please check your email to verify your account.',
    });
  } catch (error: any) {
    if (error.message === 'Email already registered') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Error during registration', error: error.message || error });
  }
};

// Verify Email Token (When user clicks link)
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    const verificationToken = Array.isArray(token) ? token[0] : token;

    if (!verificationToken) {
      return res.status(400).json({ message: 'Verification token is required' });
    }

    // Call functional service directly
    await verifyEmailToken(verificationToken as string);

    return res.status(200).json({ message: 'Email verified successfully! You can now log in.' });
  } catch (error: any) {
    if (error.message === 'Invalid or expired token') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Error verifying email', error: error.message || error });
  }
};