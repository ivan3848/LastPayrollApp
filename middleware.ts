import { NextResponse, type NextRequest } from "next/server";
import { haveAccess } from "./app/(full-page)/auth/services/AuthService";
import { updateSession } from "./lib";

const routeModuleDictionary: Readonly<{ [key: string]: string }> = {
    // "/main/pages/maintenance/location": "Ubicación",
    // "/main/pages/maintenance/asignation": "Asignaciones",
    "access": "access",
};

export async function middleware(request: NextRequest) {

    const modules = routeModuleDictionary[request.nextUrl.pathname];

    if (modules == undefined) return NextResponse.next();
  
    if (!(await haveAccess(modules)).hasPermission)
      return NextResponse.redirect(new URL("/auth/pages/notfound", request.url));
  
    return await updateSession(request);
}