/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserFromLocalStorage } from "../../lib/auth";
import "../../(landingComponents)/sellers/[id]/seller-detail.css";

type UserProfile = {
  name: string;
  email: string;
  role?: string;
  orders?: any[];
  preferences?: any[];
};

export default function UserDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", email: "" });

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (!user) return router.push("/login");

    fetch("/api/user/profile", {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) return router.push("/login"); // token invalid
        setProfile(data);
        setEditData({ name: data.name, email: data.email });
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!profile) return;
    const user = getUserFromLocalStorage();
    if (!user) return;

    try {
      const res = await fetch("/api/user/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(editData),
      });

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();
      setProfile(updated);
      setIsEditing(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  if (loading || !profile) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {profile.name}!</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      {profile.role !== "seller" && (
        <section className="user-card">
          <h2 className="section-title">Your Account Info</h2>
          {isEditing ? (
            <>
              <input
                name="name"
                value={editData.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <input
                name="email"
                value={editData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <p>Name: {profile.name}</p>
              <p>Email: {profile.email}</p>
              <p>Role: {profile.role}</p>
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            </>
          )}
        </section>
      )}

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
