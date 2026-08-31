import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { User } from '../../models/user.model';
import { sendVerificationEmail } from '../emailService';

//  Register User Logic
export const registerUser = async (fullName: string, email: string, password: string, phone: string) => {
  const existingUser = await User.findOne({ email: email || phone });
  if (existingUser) {
    throw new Error('Email already registered');
  }
  if (!fullName || !email || !password) {
    throw new Error('All fields are required');
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Generate secret random token
  const verificationToken = crypto.randomBytes(32).toString('hex');

  // Create user in DB
  const newUser = await User.create({
    fullName,
    email,
    passwordHash,
    phone,
    isVerified: false,
    verificationToken,
  });

  // Send verification email
  await sendVerificationEmail(newUser.email.toString(), verificationToken.toString());

  return newUser;
};

//  Verify Email Token Logic
export const verifyEmailToken = async (token: string) => {
  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    throw new Error('Invalid or expired token');
  }

  // Set user as verified and remove token
  await User.updateOne(
    { _id: user._id },
    { isVerified: true, verificationToken: null }
  );

  return true;
};