import { IResetPassword } from "@/Features/UserConfiguration/Types/IResetPassword";

export interface ILogin extends IResetPassword {
    username: string;
    password: string;
}
