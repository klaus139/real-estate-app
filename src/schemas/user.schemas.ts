import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema({
    fullName: { 
        type: String, 
        required: true 
    },
    
    mobileNumber: {
        type: Number,
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    }
},
    { timestamps: true },
); 

