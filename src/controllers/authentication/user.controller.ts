import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// export class UserController {

readonly JWT_SECRET = process?.env?.JWT_SECRET ?? "";

// Function to generate JWT token

  export async function signup(req: Request, res: Response): Promise<void> {
    try {
      const {
        fullName,
        role,
        email,
        password,
      } = req.body;

      const hash_password = await bcrypt.hash(password, 15);

const _user = new User({
      fullName,
      email,
      hash_password,
      role: role ?? "user",
    });
    
const savedUser = await _user.save();
res.status(200).json({
      message: "User is signed up successfully",
      body: { User: savedUser },
    });
  } 
  catch (error) { 
    res.status(400).json({
      message: "Error while saving the user",
      error: JSON.stringify(error),
    });
  }
};
