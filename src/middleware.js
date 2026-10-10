import { NextResponse } from "next/server";

export function middleware(request) {

  const sessionCookie = request.cookies.get("better-auth.session_token") || request.cookies.get("__Secure-better-auth.session_token");

  const { pathname } = request.nextUrl;

 
  const isProtectedPath = pathname.startsWith("/product") || pathname.startsWith("/category");

  if (isProtectedPath && !sessionCookie) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/product/:path*",
     "/category/:path*",
    "/all-category/:path*",
    "/price-up/:path*",
    "/price-low/:path*"
    ],
};