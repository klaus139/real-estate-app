// IT IS A CONTROLLER FUNCTION THAT HANDLES USER LOGIN REQUESTS. IT TAKES IN A REQUEST AND RESPONSE OBJECT FROM EXPRESS, EXTRACTS THE EMAIL AND PASSWORD FROM THE REQUEST BODY, AND CALLS THE loginUser SERVICE FUNCTION TO AUTHENTICATE THE USER. IF SUCCESSFUL, IT RETURNS A 200 STATUS WITH THE RESULT; IF NOT, IT RETURNS A 401 STATUS WITH AN ERROR MESSAGE.
// import { Request, Response } from "express";
// import {loginUser } from "../services/auth.service.js";
// export const login = async (req: Request, res: Response) => {
//     try{
//         const{ email, password } = req.body;
//         const result = await loginUser(email, password);
//         return res.status(200).json(result);
//     }
//     catch{
//         return res.status(401).json({ message: "Invalid credentials" });

// }
// }