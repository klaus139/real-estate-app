//controller for the authentication routes
import { Request, Response } from "express";

export const registerUser = async (req:Request, res:Response): Promise<void> => {
    try{
        
    }catch(error){
        //catch the error
        res.status(500).json({ message: "Internal server error", error: error });
    }
}