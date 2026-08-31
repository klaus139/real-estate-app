import User from "../models/user.model"
import { IUser, ICreateUserInput } from "../utils/interfaces/user.interface";


export class AuthRepository {
    async createUser(data: ICreateUserInput): Promise<IUser> {
        const user = new User(data);
        const savedUser = await user.save();
        return savedUser;
      }
    
      async findByEmail(email: string): Promise<IUser | null> {
        const user = await User.findOne({ email });
        return user || null;
      }
    
      async findById(id: string): Promise<IUser | null> {
        const user = await User.findById(id);
        return user || null;
      }
}