import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware triggered");
  const token = request.cookies.get("token")?.value;
  const protectedRoutes = ["/dashboard"];
  const unAuthorizedRoutes = ["/", "/login", "/signup", "/reset-password"];
  console.log(request.nextUrl.pathname, "path");

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (unAuthorizedRoutes.includes(request.nextUrl.pathname) && token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
