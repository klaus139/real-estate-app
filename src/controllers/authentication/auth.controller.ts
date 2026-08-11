//controller for the authentication routes
import { Request, Response } from "express";

export const registerUser = (req:Request, res:Response) => {
    try{
        //try to register the user
        //call the service to register the user
    }catch(error){
        //catch the error
        res.status(500).json({ message: "Internal server error", error: error });
    }
}