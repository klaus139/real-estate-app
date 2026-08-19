import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Token from "../interfaces/token.interface.js";

export const createToken = (user: User): string => {
    return jwt.sign({ id: user._id  }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: "1d",
    });

};

