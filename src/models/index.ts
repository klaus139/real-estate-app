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
        required:true,
        enum:UserRole
    },
    phone:{
        type:String,
        required:true,
    },
    isVerifed:{
        type:Boolean,
        default:false
    },
    
}, { timestamps: true });

const User = model<IUser>("User", userSchema);

export default User;