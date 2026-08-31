import User from "../models/user.model"
import { IUser } from "../utils/interfaces/user.interface";


export class AuthRepository {
    async findByEmail(email:string): Promise<IUser | null> {
        const user = await User.findOne({ email: email });
        return user|| null;
    }
    async findById(id: string): Promise<IUser | null> {
        const user = await User.findById(id);
        return user || null;
    }
}
