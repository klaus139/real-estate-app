import {Schema, model} from "mongoose";
import { IUser } from "../utils/interface/user.interface";
import { UserRole } from "../utils/types/user.types";

const userSchema = new Schema<IUser>({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:false,
        enum:UserRole
    },
    phone:{
        type:String,
        required:false,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationToken:{
        type: String,
    },
}, { timestamps: true });

const User = model<IUser>("User", userSchema);

export  { User };