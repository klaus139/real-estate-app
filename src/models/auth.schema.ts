import { v } from "../utils/validator";

export const registerSchema = v.object({
  email: v.string().email("Invalid email address"),
  password: v.string().min(8, "Password must be at least 8 characters"),
  fullName: v.string().min(1, "Full name is required"),
  role: v.string().optional(),
});

export const loginSchema = v.object({
  email: v.string().email("Invalid email address"),
  password: v.string().min(1, "Password is required"),
});
