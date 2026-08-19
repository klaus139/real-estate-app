import mongoose, { Schema, model } from "mongoose";
// import {userSchema } from "../schemas/user.schemas.js"

interface IUser {
    fullName: string;
    mobileNumber: number;
    email: string;
    password?: string;
    role?: "user" | "admin";
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema(
    {
        fullName: {
            type: String, 
            required: true,
            maxlength: 30
        },
        mobileNumber: {
            type: Number,
            required: true
        },
        email: {
            type: String, 
            required: true, 
            unique: true,
            maxlength: 60
        },
        password: {
            type: String, 
            required: true
        },
        role: {
            type: String,
            enum: [ "buyer", "admin" ],
            default: "buyer"
        } 
    },
    { timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    },}
);

const User = mongoose.model("User", userSchema);
export { IUser };
export default User;