import { NextResponse, type NextRequest } from "next/server";
import { getSession, updateSession } from "./lib";
import { IModuleDictionary } from "./types/IModuleDictionary";

export async function middleware(request: NextRequest) {
    const session = await getSession();
    const pathName = request.nextUrl.pathname;
    const module = IModuleDictionary[pathName];

    // const modules = routeModuleDictionary[request.nextUrl.pathname];

    // if (!(await haveAccess(modules)).hasPermission)
    //     return NextResponse.redirect(
    //         new URL("/auth/pages/notfound", request.url)
    //     );

    if (!module) return NextResponse.next();

    const hasAccess = session?.rolModule?.some(
        (roleModule) => roleModule.module === module
    );

    if (!hasAccess) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return await updateSession(request);
}
