"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CTAButton from "../components/CTAButton";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
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
      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-72">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <CTAButton text="Login" />
      </form>
    </div>
  );
}
