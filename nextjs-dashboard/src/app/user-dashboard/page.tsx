"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type UserProfile = {
  name: string;
  email: string;
  orders?: any[];      // optional: placeholder for user-specific data
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
    router.push("/login");
  };

  if (loading || !profile) {
    return <p className="text-center mt-20 text-xl">Loading dashboard...</p>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {profile.name}!</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* User-specific content */}
      <div className="p-4 border rounded max-w-md mx-auto mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Account Info</h2>
        <p>Email: {profile.email}</p>
        {/* Add more user info here */}
      </div>

      <div className="p-4 border rounded max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-2">Orders / Preferences</h2>
        {profile.orders?.length || profile.preferences?.length ? (
          <ul>
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
      </div>
    </div>
  );
}
