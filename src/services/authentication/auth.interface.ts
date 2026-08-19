import { createUser as createUserService } from "./auth.service.js";

export interface CreateUserDTO {
    fullName:string;
    mobileNumber:number;
    email:string;
    password:string;
}

export interface IAuthService {
    createUser(input:CreateUserDTO):Promise<any>;   
}

export async function createUser(input: CreateUserDTO): Promise<any> {
    if (!input.fullName || !input.email || !input.mobileNumber || !input.password) {
        throw new Error("All fields are required");
    }
    const newUser = await createUser(input);
    return newUser;
    }
