import { AuthRepository } from "../../../repository/auth.repository";
import { IRegisterUserPayload, ILoginUserPayload } from "../../../utils/interfaces/auth.interface";
import { AuthService } from "../auth.service";
import publicUser from "../../../utils/helpers/user.helper"
import { IPublicUser } from "../../../utils/interfaces/user.interface";

export class DefaultAuthService implements AuthService {
    private authRepository: AuthRepository;
    
    constructor() {
        this.authRepository = new AuthRepository();
    }
    //two methods to implement
    async RegisterUser(payload: IRegisterUserPayload): Promise<any> {
       try{
        // Implement the logic for registering a user
        //validate the payload, create a new user in the database, and return the created user or a success message
        const {fullName, email, password, role} = payload;

        if (!fullName || !email || !password || !role) {
            throw new Error("Missing required fields for user registration.");
        }

        //check if is user already exisiting
        const oldUser = await this.authRepository.findByEmail(email);

        if (oldUser){
            throw new Error("User with this email already exists.");
        }

        

       }catch(error){
        console.log("Error occurred while registering user:", error);
        throw new Error("Error occurred while registering user.");
       }
    }

    async LoginUser(payload: ILoginUserPayload): Promise<any> {
        // Implement the logic for logging in a user
        // This could involve validating the payload, checking the user's credentials, and returning a token or session information
        throw new Error("Method not implemented.");
    }
    async GetUserById(id: string): Promise<IPublicUser | null> {
        const user = await this.authRepository.findById(id);

        if (!user) {
            return null;
        }

        return publicUser(user);    
    }
}