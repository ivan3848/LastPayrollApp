import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import IPermission from "./app/(full-page)/auth/types/IPermission";
import IAuth from "./app/(full-page)/auth/types/IAuth";
import IUser from "./app/(full-page)/auth/types/IUser";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";
import IRolModule from "./Features/rolModule/Types/IRolModule";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error: any) {
        if (error.code === "ERR_JWT_EXPIRED") {
            return null;
        }
        throw error;
    }
}

export function haveAccess(
    rolModule: string,
    user: IUser | undefined
): IPermission {
    if (user === undefined) redirect("/auth/login");
    var modules = user!.rolModule.find(
        (element: IRolModule) =>
            element.module.toLocaleLowerCase() === rolModule.toLocaleLowerCase()
    );

    if (!modules) return { hasPermission: false, isReadOnly: true };
    return { hasPermission: true, isReadOnly: !modules?.canWrite };
}

export function outSession() {
    const user = Cookies.get("session") ?? "{}";
    if (user === "{}") return redirect("/auth/login");
}

export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    const test = await decrypt(session);
    return test?.result as IAuth;
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}
