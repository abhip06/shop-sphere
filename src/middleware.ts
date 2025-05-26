import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const authToken: string | undefined = request.cookies.get("access-token")?.value || request.headers.get("Authorization")?.replace("Bearer", "");

    if(request.nextUrl.pathname === "/api/auth/login" || request.nextUrl.pathname === "/api/auth/sign-up"){
        return;
    }

    const loggedInUserNotAccessPaths: boolean =
        request.nextUrl.pathname === "/sign-in" ||
        request.nextUrl.pathname === "/sign-up";

    if (loggedInUserNotAccessPaths) {
        if (authToken) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    } else {
        if(!authToken){
            return NextResponse.redirect(new URL("/sign-in", request.url));        
        }
    }
}

export const config = {
    matcher: [
        "/sign-up",
        "/sign-in",
        "/api/auth/:path*",
        "/my-account/:path*",
        "/checkout",
        "/orders/:path*",
        "/dashboard/:path*",
    ],
};