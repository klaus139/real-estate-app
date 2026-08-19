import { Request, Response, NextFunction } from "express";
import { Error} from "../utils/error";

export const errorHandler = ( err: Error, req: Request, res: Response, next: NextFunction ) => {
    if ( err instanceof Error ) {
        return
        res.status( err.statusCode). send({errors: err.formatErrors() });
    } 
    return res.status(400).send({ errors: [{ message: "Something went wrong" }]});
};