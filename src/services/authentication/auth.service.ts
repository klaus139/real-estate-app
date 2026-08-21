import { ILoginUserPayload, IRegisterUserPayload } from "../../utils/interfaces/auth.interface";

export interface AuthService {
    RegisterUser(payload:IRegisterUserPayload): Promise<any>;
    LoginUser(payload: ILoginUserPayload): Promise<any>;
}