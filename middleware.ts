import Cookies from "js-cookie";
import { NextResponse, type NextRequest } from "next/server";
import IUser from "./app/(full-page)/auth/types/IUser";
import { haveAccess } from "./app/(full-page)/auth/services/AuthService";

const routeModuleDictionary: Readonly<{ [key: string]: string }> = {
    // "/maintenance/locations": "Ubicación",
    // "/maintenance/asignations": "Asignaciones",
    "access": "access",
};

export function middleware(request: NextRequest) {
    // const user = Cookies.get("auth") as IUser | undefined;
    // console.log(user);
    // if (!user) return NextResponse.redirect(new URL("/auth/login", request.url));

    // var modules = routeModuleDictionary[request.nextUrl.pathname];

    // if (modules == undefined) return NextResponse.next();

    // if (!(haveAccess(modules, user)).hasPermission)
    //     return NextResponse.redirect(new URL("/auth/access", request.url));
}

