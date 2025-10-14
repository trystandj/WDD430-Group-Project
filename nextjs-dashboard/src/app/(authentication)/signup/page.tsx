"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      // create model
      if (res.ok) {
        alert("Signup successful!");
        router.push("/");
      } else {
        alert(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      alert("An unexpected error occurred.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="user">User</option>
        <option value="seller">Seller</option>
      </select>
      <button type="submit">Sign Up</button>
    </form>
  );
}
