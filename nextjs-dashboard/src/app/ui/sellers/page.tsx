"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SellerItems from "./SellerItems";
import SellerStory from "./SellerStory";

type Item = {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  createdAt: string | Date;
};

type Story = {
  sellerId: number;
  title: string;
  content: string;
  createdAt: string | Date;
};

type SellerProfile = {
  id: number;
  name: string;
  email: string;
  items: Item[];
  stories: Story[];
};

export default function SellerDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<SellerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (!token || role !== "seller") {
      router.push("/login");
      return;
    }

   
    fetch("/api/seller/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          
          router.push("/login");
        } else {
          setProfile({
            id: data.id,
            name: data.name,
            email: data.email,
            items: data.items || [],
            stories: data.stories || [],
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

      <SellerItems items={profile.items} sellerId={String(profile.id)} />

  
      <SellerStory stories={profile.stories} />
    </div>
  );
}