'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      router.push("/login");
    } else {
      alert("Signup failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-80">
        <h1 className="text-2xl font-bold mb-4 text-green-800">Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Sign Up
        </button>
      </form>
    </main>
  );
}
