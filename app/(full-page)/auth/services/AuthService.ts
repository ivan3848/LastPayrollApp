import ApiService from "@/services/ApiService";
import Cookies from 'js-cookie';
import { redirect } from "next/navigation";
import { ILogin } from "../types/ILogin";
import { IRolModule } from "../types/IRolModule";
import IUser from "../types/IUser";
import IPermission from "../types/IPermission";

const apiService = new ApiService<ILogin, IUser>("employee/user/");

function* createRolModule(rolModuleList: IRolModule[]) {
    for (let element of rolModuleList) {
        yield { module: element.module, canWrite: element.canWrite };
    }
}

export async function login(username: string, password: string) {
    const response = await apiService.post({ username, password }, "login");

    if (typeof response === "string")
        return response;

    const { employeeName, userId, idCompany, rol } = response as IUser;
    let rolModule: IRolModule[] = Array.from(createRolModule(response.rolModule));
    const result: IUser = { employeeName, userId, idCompany, rol, rolModule };

    Cookies.set('auth', JSON.stringify(result), { expires: 2 });

    return "success"
}

export async function logout() {
    await apiService.postEmpty("logout");
    // Cookies.remove('auth');
}

export function haveAccess(rolModule: string, user: IUser | undefined): IPermission {

    if (user === undefined)
        redirect("/auth/signin");

    var modules = user!.rolModule.find(
        (element: IRolModule) =>
            element.module.toLocaleLowerCase() === rolModule.toLocaleLowerCase(),
    );

    if (!modules) return { hasPermission: false, isReadOnly: true };
    return { hasPermission: true, isReadOnly: !modules?.canWrite };
}

export function outSession() {
    redirect("/auth/login");
}