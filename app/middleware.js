// ~/middleware.js
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // If no token, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = verifyToken(token); // Decode JWT token to get user info
    const { role } = decoded;
    const url = req.nextUrl.clone();

    // Redirect based on role
    if (req.nextUrl.pathname === "/dashboard") {
      if (role === "doctor") {
        url.pathname = "/dashboard/doctor";
      } else if (role === "patient") {
        url.pathname = "/dashboard/patient";
      } else if (role === "admin") {
        url.pathname = "/dashboard/admin";
      } else {
        // For any other role, redirect to a default error page
        url.pathname = "/unauthorized";
      }
      return NextResponse.redirect(url);
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware only to the dashboard route
export const config = {
  matcher: "/dashboard/:path*",
};
