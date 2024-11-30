// api/auth/route.js
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/db";
import { createToken } from "@/lib/auth";

export async function POST(req) {
  const { email, password } = await req.json();

  const client = await clientPromise;
  const db = client.db("iclinicdb");
  const user = await db.collection("users").findOne({ email });

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.pwd);

  if (!isPasswordValid) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
    });
  }

  const token = createToken({ email: user.email, role: user.role });

  return new Response(JSON.stringify({ token, message: "Login Successful" }), {
    status: 200,
  });
}
