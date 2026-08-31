import { IUser } from "../utils/interfaces/user.interface";
import { userRole } from "../utils/types/user.types";
import { Schema, model } from "mongoose";

const userSchema = new Schema <IUser> ({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        enum: userRole,
        default: userRole.BUYER,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken:{
        type: String,
    },
},
{timestamps: true})

export const User = model<IUser>("User", userSchema);