import { Request, Response, NextFunction } from "express";
// import { Error } from "../utils/error.js";

export const errorHandler = ( err: Error, req: Request, res: Response, next: NextFunction ) => {
    if ( err instanceof Error ) {
        return res.status(404).send(
            {
                message: "Page Not Found" }
            );
    } 
    return res.status(400).send({ errors: [{ message: "Something is wrong with this" }]
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               );
};