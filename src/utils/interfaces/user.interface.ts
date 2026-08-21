import { Types } from "mongoose";
import { UserRole } from "../types/user.types";


export interface IPublicUser {
    _id: Types.ObjectId;
    fullName: String;
    role: UserRole;
    isVerified: boolean;
}

export interface ICreateUserInput {
    fullName: String;
    email: String;
    passwordHash: String;
}


export interface IUser {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
}
