"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await res.json();

    if (res.status === 200) {
      sessionStorage.setItem("data", JSON.stringify(data.rows[0]));
      if (role === "Patients") {
        router.push("/dashboard/patients");
      } else if (role === "Doctors") {
        router.push("/dashboard/doctors");
      } else {
        router.push("/dashboard/admins");
      }
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label className="mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-4 py-2"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-4 py-2"
            required
          />
        </div>
        <h4>Please select one:</h4>
        <fieldset className="flex">
          <div className="mx-2">
            <input
              type="radio"
              id="patients"
              name="role"
              value="Patients"
              required
              checked={role == "Patients"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label for="patients" className="mx-1">
              Patients
            </label>
          </div>
          <div className="mx-2">
            <input
              type="radio"
              id="doctors"
              name="role"
              value="Doctors"
              checked={role == "Doctors"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label for="doctors" className="mx-1">
              Doctors
            </label>
          </div>
          <div className="mx-2">
            <input
              type="radio"
              id="admins"
              name="role"
              value="Admins"
              checked={role == "Admins"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label for="admins" className="mx-1">
              Staffs
            </label>
          </div>
        </fieldset>

        <button className="bg-blue-500 my-4 text-white px-4 py-2 rounded">
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
