import { Types } from "mongoose";
import { userRole } from "../types/user.types";

export interface IUser {
    _id: Types.ObjectId;
    fullName: String;
    email: String;
    passwordHash: String;
    phone?: String;
    role: userRole;
    isVerified: boolean;
    verificationToken: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPublicUser {
    _id: Types.ObjectId;
    fullName: String;
    role: userRole;
    isVerified: boolean;
}

export interface ICreateUserInput {
    fullName: String;
    email: String;
    passwordHash: String;
}