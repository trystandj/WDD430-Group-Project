"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CTAButton from "../ui/components/CTAButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      localStorage.setItem("user", username);
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-4">
      <h2 className="text-2xl font-bold">Login</h2>
      {error && (
        <p className="bg-red-100 text-red-600 p-2 rounded w-72 text-center">{error}</p>
      )}
      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-72">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <CTAButton text={loading ? "Logging in..." : "Login"} />
      </form>
    </div>
  );
}
