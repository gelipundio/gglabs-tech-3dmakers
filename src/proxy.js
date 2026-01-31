import { NextResponse } from "next/server";

export function proxy(request) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
        const adminSession = request.cookies.get("admin_session")?.value;

        if (!adminSession || adminSession !== "true") {
            const url = request.nextUrl.clone();
            url.pathname = "/admin/login";
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
