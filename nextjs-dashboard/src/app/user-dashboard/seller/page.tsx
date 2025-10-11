/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getUserFromLocalStorage } from "../../lib/auth";
import SellerItems from "../../ui/sellers/SellerItems";
import SellerStory from "../../ui/sellers/SellerStory";
import "../../(landingComponents)/sellers/[id]/seller-detail.css";
import { Int32 } from "mongodb";

type UserProfile = {
  name: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  joinedAt?: string;
  role?: string;
  sellerId?: Int32 | null; 
  orders?: any[];
  preferences?: any[];
  stories?: any[];
  items?: any[];
};

export default function UserDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);


  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    bio: "",
    avatarUrl: "",
    location: "",
  });


  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (!user) {
      router.push("/login");
      return;
    }

    const endpoint =
      user.role === "seller" ? "/api/user/seller" : "/api/seller/profile";

    fetch(endpoint, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.message === "Unauthorized" || data.message === "Invalid token") {
          router.push("/login");
          return;
        }

        const userProfile: UserProfile = {
          name: data.name,
          email: data.email,
          role: user.role,
          sellerId: data.sellerId || null,
          orders: data.orders || [],
          preferences: data.preferences || [],
          bio: data.bio || "",
          avatarUrl: data.avatarUrl || "",
          location: data.location || "",
          joinedAt: data.joinedAt || "",
        };

        if (user.role === "seller") {
          const [itemsRes, storiesRes] = await Promise.all([
            fetch(`/api/items/${data.sellerId}`),
            fetch(`/api/stories?sellerId=${data.sellerId}`)
          ]);

          if (itemsRes.ok) userProfile.items = await itemsRes.json();
          if (storiesRes.ok) userProfile.stories = await storiesRes.json();
        }

        setProfile(userProfile);
        setEditData({
          bio: userProfile.bio || "",
          avatarUrl: userProfile.avatarUrl || "",
          location: userProfile.location || "",
        });
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

    const [newStory, setNewStory] = useState({ title: "", content: "" });

  const handleNewStoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewStory({ ...newStory, [e.target.name]: e.target.value });
  };

  const handleNewStorySubmit = async () => {
    const user = getUserFromLocalStorage();
    if (!user) return;

    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
        title: newStory.title,
        content: newStory.content,
      }),
      });

      if (!res.ok) throw new Error("Failed to add story");

      const addedStory = await res.json();
      setProfile(prev => prev ? { ...prev, stories: [...(prev.stories || []), addedStory] } : prev);
      setNewStory({ title: "", content: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to upload story");
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!profile) return;
    const user = getUserFromLocalStorage();
    console.log(user);
    if (!user) return;

    try {
      const res = await fetch("/api/user/seller", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(editData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const updatedSeller = await res.json();
      setProfile({ ...profile, ...updatedSeller });
      setIsEditing(false);

      window.location.reload();
    } catch (err) {
      console.error("Failed to update seller profile:", err);
      alert("Error updating profile.");
    }
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

      {profile.role !== "seller" && (
        <section className="user-card">
          <h2 className="section-title">Your Account Info</h2>
          <p>Email: {profile.email}</p>
          <p>Role: {profile.role}</p>
        </section>
      )}

      {profile.role === "seller" && (
        <section className="seller-profile-card">
          <div className="seller-header">
            <Image
              src={editData.avatarUrl || profile.avatarUrl || "/images/spoons.webp"}
              alt={profile.name}
              className="seller-profile-avatar"
              width={120}
              height={120}
            />
            <div className="seller-info">
              <h1 className="seller-profile-name">{profile.name}</h1>

              {isEditing ? (
                <>
                  <textarea
                    name="bio"
                    value={editData.bio}
                    onChange={handleChange}
                    placeholder="Bio"
                  />
                  <input
                    name="location"
                    value={editData.location}
                    onChange={handleChange}
                    placeholder="Location"
                  />
                  <input
                    name="avatarUrl"
                    value={editData.avatarUrl}
                    onChange={handleChange}
                    placeholder="Avatar URL"
                  />
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
              ) : (
                <>
                  <p className="seller-profile-bio">{profile.bio}</p>
                  <p className="seller-meta">
                    📍 {profile.location || "Unknown"} · Joined{" "}
                    {profile.joinedAt
                      ? new Date(profile.joinedAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p className="seller-email">{profile.email}</p>
                  <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </>
              )}
            </div>
          </div>

          {profile.stories && <SellerStory stories={profile.stories} />}
          {profile.items && <SellerItems items={profile.items} />}
          {profile.role === "seller" && (
          <section className="seller-upload-story">
            <h2>Add New Story</h2>
            <input
              type="text"
              name="title"
              value={newStory.title}
              onChange={handleNewStoryChange}
              placeholder="Story Title"
            />
            <textarea
              name="content"
              value={newStory.content}
              onChange={handleNewStoryChange}
              placeholder="Story Content"
            />
            <button onClick={handleNewStorySubmit}>Upload Story</button>
          </section>
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
