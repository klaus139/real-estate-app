export interface CreateUserDTO {
    fullName:string;
    email:string;
    mobileNumber:number;
    password:string;
}

export interface IAuthService {
    createUser(input:CreateUserDTO):Promise<any>;
}