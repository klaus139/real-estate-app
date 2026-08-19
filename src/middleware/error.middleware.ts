import { Request, Response, NextFunction } from "express";
import { createError } from "../utils/error";

export const errorHandler = ( err: any, req: Request, res: Response, next: NextFunction ) => {
    if ( err && typeof err.formatErrors === "function" ) {
        return res.status( err.statusCode ).send(
            { error: err.formatErrors() }
        )
    } 
    return res.status(400).send({ errors: [{ message: "Something went wrong" }] 
    })

};
