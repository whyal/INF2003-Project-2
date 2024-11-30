// api/dashboard/page.js
export const runtime = "nodejs";

import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  let redirectPath = null;
  const token = cookies().get("token")?.value;

  if (!token) {
    return redirect("/login"); // If no token, redirect to login
  }

  try {
    const { role } = verifyToken(token);
    console.log(role);
    // Redirect users based on their role
    switch (role) {
      case "doctor":
        redirectPath = "/dashboard/doctor";
        break;
      case "patient":
        redirectPath = "/dashboard/patient";
        break;
      case "admin":
        redirectPath = "/dashboard/admin";
        break;
      default:
        redirectPath = "/unauthorized";
        break;
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    redirectPath = "/login";
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
}
