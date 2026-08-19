//controller for the authentication routes
import { Request, Response } from "express";
import * as authenticationService from "../../services/authentication/auth.interface.js"

export const async registerUser = (req:Request, res:Response) => {
    try{
        const { fullName, mobileNumber, email, password } = req.body;
              const newUser = await authenticationService.createUser({
                fullName,
                email,
                mobileNumber,
                password,
              });
              res.status(201).json({
                success: true,
                message: "User created successfully",
                data: newUser,
              });
            } catch (error) {
              console.log(`Error creating user: ${error}`);
              res.status(500).json({ message: "Failed to create user" });
            }
          }
        
        