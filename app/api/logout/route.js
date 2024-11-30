import { NextResponse } from "next/server";

export async function POST(req) {
  // Clear the authentication token by setting it as expired
  const response = NextResponse.json({ message: "Logged out successfully" });

  response.headers.set(
    "Set-Cookie",
    "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict"
  );

  return response;
}
