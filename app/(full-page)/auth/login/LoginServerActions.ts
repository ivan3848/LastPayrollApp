"use server";
import { getSession } from "@/lib";
import { login } from "../services/AuthService";
import { ILogin } from "../types/ILogin";

const SignIn = async (data: ILogin) =>
    await login(data.username, data.password);

export const sessionCheck = async () => await getSession();

export default SignIn;
