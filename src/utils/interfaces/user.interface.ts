import { Types } from "mongoose";
import { UserRole } from "../types/user.types";

export interface IUser {
    _id: Types.ObjectId;
    name: string;
    email:string;
    password:string;
    phone:string;
    role:UserRole;
    isVerifed:boolean
   
}


