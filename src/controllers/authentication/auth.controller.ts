import { Request, Response } from 'express';
import crypto from 'crypto'; 
import bcrypt from 'bcrypt'; 
import { User } from '../../models/index';
import { sendVerificationEmail } from '../../services/emailService';

//  Register User & Send Verification Email
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Generate secret random token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create user in DB 
    const newUser = await User.create({
      name: username,
      email,
      password: hashedPassword,
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

//  Verify Email Token (When user clicks link)
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    const verificationToken = Array.isArray(token) ? token[0] : token;

    if (!verificationToken) {
      return res.status(400).json({ message: 'Verification token is required' });
    }

    const user = await User.findOne({ verificationToken: verificationToken as string });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Set user as verified and remove token
    await User.updateOne(
      { _id: user._id },
      { isVerified: true, verificationToken: null }
    );

    res.status(200).json({ message: 'Email verified successfully! You can now log in.' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying email', error });
  }
};