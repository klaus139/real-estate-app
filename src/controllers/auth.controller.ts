import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { comparePassword } from "../services/password.service.js";
// login User
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
// Find Registered User by email
const user = await User.findOne({ email }) .lean();
// Check if User exist 
if (!user || !user.password){
    return res.status(401).json({
        message:"Account not Found"
    })
}
// Check Password
const isPasswordValid = await comparePassword(password, String(user.password));
// wrong Password
if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email and password" });
}
// Generate a JWT token
const token = jwt.sign(
    {
        sub: user._id.toString(),
        role:user.role,
        email: user.email,

    },
    process.env.JWT_SECRET as string,
    {
        expiresIn: "40d",
    }
);
// Return the token and user information
return res.status(200).json({
    token,
    user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
    }
});
};
