import bcrypt from "bcrypt";
import User, { IUser } from "../../models/user.model.js";

export const createUser = async ( 
    fullName: string, 
    mobileNumber: string, 
    email: string, 
    password: string ): Promise<IUser> => {

    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userPayload = {
        fullName,
        mobileNumber: Number(mobileNumber),
        email,
        password: hashedPassword,
    };

    const user = new User(userPayload);

    try {
        const savedUser = await user.save();
        return savedUser.toObject() as IUser;
    } catch (err) {
        throw err;
    }
}