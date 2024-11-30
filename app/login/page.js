"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.ok) {
        // Store JWT token in cookies
        Cookies.set("token", data.token);
        // Redirect to the dashboard
        Cookies.set("email", user.email);
        router.push("/dashboard");
      } else {
        setError(data.error || "Failed to login");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form
        className="w-full max-w-sm shadow-lg p-12 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col mb-4">
          <label className="mb-2">Email:</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border rounded px-4 py-2"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2">Password:</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="border rounded px-4 py-2"
            required
          />
        </div>
        <button className="bg-blue-500 my-4 text-white px-4 py-2 rounded">
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {loading ? "Logging in..." : ""}
      </form>
    </div>
  );
}
