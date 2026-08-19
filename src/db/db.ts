import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.DB_URL!;

mongoose.set("strictQuery", true);

const connectDb = async (): Promise<void>=> {
    try {
        await mongoose.connect(dbUrl);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("Database connection error:", error);
        process.exit(1);
    }
};

export default connectDb;