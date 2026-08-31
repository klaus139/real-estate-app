import { ILoginUserPayload, IRegisterUserPayload } from "../../utils/interfaces/auth.interface";
import { IPublicUser } from "../../utils/interfaces/user.interface";

export interface AuthService {
    RegisterUser(payload:IRegisterUserPayload): Promise<any>;
    LoginUser(payload: ILoginUserPayload): Promise<any>;
    GetUserById(id: string): Promise<IPublicUser | null>;
}