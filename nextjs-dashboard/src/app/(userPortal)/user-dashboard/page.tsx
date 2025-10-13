/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


type UserProfile = {
  name: string;
  email: string;
  orders?: any[];
  preferences?: any[];
};

export default function UserDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (!token || role !== "user") {
      router.push("/login");
      return;
    }

    fetch("/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          router.push("/login");
        } else {
          setProfile({
            name: data.name,
            email: data.email,
            orders: data.orders || [],
            preferences: data.preferences || [],
          });
        }
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
         localStorage.clear();
     
    router.push("/login");
    window.location.href = "/";
    
  };

  if (loading || !profile) {
    return <p className="dashboard-loading">Loading dashboard...</p>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {profile.name}!</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      <section className="user-card">
        <h2 className="section-title">Your Account Info</h2>
        <p>Email: {profile.email}</p>
      </section>

      <section className="user-card">
        <h2 className="section-title">Orders / Preferences</h2>
        {profile.orders?.length || profile.preferences?.length ? (
          <ul className="data-list">
            {profile.orders?.map((order, i) => (
              <li key={i}>{JSON.stringify(order)}</li>
            ))}
            {profile.preferences?.map((pref, i) => (
              <li key={i}>{JSON.stringify(pref)}</li>
            ))}
          </ul>
        ) : (
          <p>No orders or preferences yet.</p>
        )}
      </section>
    </div>
  );
}
