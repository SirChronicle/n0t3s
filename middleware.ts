import { NextRequest, NextResponse } from "next/server";

const AUTH_PASSWORD = "your-secret-password"; // Replace with your desired password

export function middleware(req: NextRequest) {
    // Check if the password is already validated in cookies
    const cookie = req.cookies.get("authenticated");
    if (cookie === AUTH_PASSWORD) {
        return NextResponse.next(); // Allow access
    }

    // If not validated, check the query string for the password
    const url = req.nextUrl;
    const password = url.searchParams.get("password");

    if (password === AUTH_PASSWORD) {
        const response = NextResponse.next();

        // Set a cookie for future requests
        response.cookies.set("authenticated", AUTH_PASSWORD, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });

        return response;
    }

    // Redirect to an error page or deny access
    url.pathname = "/access-denied";
    return NextResponse.redirect(url);
}
