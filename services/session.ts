import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

const cookie = {
    name: "session",
    options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
    duration: 2 * 24 * 60 * 60 * 1000,
};

async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(key);
}

async function decrypt(input: string): Promise<any> {
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

export async function createSession(userId: string) {
    const expires = new Date(Date.now() + cookie.duration);
    const session = await encrypt({ userId, expires });

    cookies().set(cookie.name, session, { ...cookie, expires });
    redirect("/");
}

export async function verifySession() {
    const cookieSession: any = cookies().get(cookie.name)?.value;
    const session = await decrypt(cookieSession);

    if (!session) return redirect("/auth/login");

    return { userId: session.userId, expires: session.expires };
}

export async function deleteSession() {
    cookies().delete(cookie.name);
    redirect("/auth/login");
}
