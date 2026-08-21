import { Types } from "mongoose";
import { userRole } from "../types/user.types";

export interface IUser {
    _id: Types.ObjectId;
    fullName: String;
    email: String;
    passwordHash: String;
    phone: String;
    role: userRole;
    isVerified: boolean;
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
import { Types } from "mongoose";
import { UserRole } from "../types/user.types";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
}
