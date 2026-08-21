import { UserRole } from "../types/user.types";

export type IRegisterUserPayload = {
    fullName: string;
    email: string;
    password: string;
    role: UserRole;
}

export type ILoginUserPayload = {
    email: string;
    password: string;
}