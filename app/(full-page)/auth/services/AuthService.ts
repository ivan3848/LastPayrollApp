"use server";
import ApiService from "@/services/ApiService";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ILogin } from "../types/ILogin";
import IUser from "../types/IUser";
import { encrypt, getSession } from "@/lib";
import IRolModule from "@/Features/rolModule/Types/IRolModule";

export interface Permission {
    hasPermission: boolean;
    isReadOnly: boolean;
}

const apiService = new ApiService<ILogin, IUser>("employee/user/");
function* createRolModule(rolModuleList: IRolModule[]) {
    for (let element of rolModuleList) {
        yield { module: element.module, canWrite: element.canWrite };
    }
}

export async function login(username: string, password: string) {
    const response = await apiService.loginPost(
        { username, password },
        "login"
    );

    if (typeof response === "string") return response;

    const { employeeName, userId, idCompany, rol } = response as IUser;

    let rolModule: IRolModule[] = Array.from(
        createRolModule(response.rolModule)
    );

    const result: IUser = { employeeName, userId, idCompany, rol, rolModule };
    const session = await encrypt({ result, expires: 2 * 24 * 60 * 60 * 1000 });

    cookies().set("session", session, { httpOnly: true });
    return "success";
}

export async function logout() {
    const sessionData = await getSession();
    await apiService.loginPost(sessionData?.userId as any, "logout");
    cookies().delete("session");
}

export async function haveAccess(rolModule: string): Promise<Permission> {
    const sessionData = await getSession();

    if (sessionData!.userId === "") {
        redirect("/auth/login");
    }

    var modules = sessionData!.rolModule.find(
        (element: IRolModule) =>
            element.module.toLocaleLowerCase() === rolModule.toLocaleLowerCase()
    );

    if (!modules) return { hasPermission: false, isReadOnly: true };

    return { hasPermission: true, isReadOnly: !modules?.canWrite };
}

export async function outSession() {
    redirect("/auth/login");
}