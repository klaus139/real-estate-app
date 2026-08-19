import User from "../models/user.model";
import { ICreateUserInput } from "../utils/interfaces/user.interface";

export const createUser = async (input: ICreateUserInput) => {
    try {
        const user = await User.create(input);
        return user;
    } catch (error: any) {
        if (error.code === 11000) {
            throw new Error("Email already exists");
        }
        throw error;
    }
};

export const FindById = async (id: String) => {
    return await User.findById({ id });
};

export const FindByEmail = async (email: String) => {
    return await User.findOne({ email });
};

export const findAll = async () => {
    return await User.find();
};
