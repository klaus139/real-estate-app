import { Request, Response } from "express";
// import { AuthenticationService } from "../services/authentication/auth.interface.js"; 
import * as authenticationService from "../services/authentication/auth.interface.js";

  // const authenticationService = new AuthenticationService();

  // constructor() {
  //   this.authenticationService = new AuthenticationService();
  // }

  export async function createUser(req: Request, res: Response): Promise<void> {
    //lets call the service
    try {
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

