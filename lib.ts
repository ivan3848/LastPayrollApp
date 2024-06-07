import ApiService from "@/services/ApiService";
import Cookies from 'js-cookie';
import { redirect } from "next/navigation";
import { ILogin } from "./app/(full-page)/auth/types/ILogin";
import IPermission from "./app/(full-page)/auth/types/IPermission";
import { IRolModule } from "./app/(full-page)/auth/types/IRolModule";
import IUser from "./app/(full-page)/auth/types/IUser";


function* createRolModule(rolModuleList: IRolModule[]) {
    for (let element of rolModuleList) {
        yield { module: element.module, canWrite: element.canWrite };
    }
}

export async function login(username: string, password: string) {
    const apiService = new ApiService<ILogin, IUser>("employee/user/login");

    const response = await apiService.post({ username, password });

    if (typeof response === "string")
        return response;

    const { employeeName, userId, idCompany, rol } = response as IUser;
    let rolModule: IRolModule[] = Array.from(createRolModule(response.rolModule));
    const result: IUser = { employeeName, userId, idCompany, rol, rolModule };

    Cookies.set('auth', JSON.stringify(result), { expires: 2 });
    const user = Cookies.get('auth') ?? "{}";
    console.log(user);
    return "success"
}

// export async function logout() {
//     const apiService = new ApiService<ILogin, IUser>("employee/user/logout");

//     await apiService.postEmpty();
//     Cookies.remove('auth');
// }

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
    const user = Cookies.get('auth') ?? "{}";
    if (user === "{}") return redirect("/auth/login");
}