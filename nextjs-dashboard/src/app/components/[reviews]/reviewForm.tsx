"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import headerStyles from "@/app/ui/header.module.css";

interface ReviewFormProps {
  productId: string;
  itemId: number;
  sellerId?: number | null;
}

export default function ReviewForm({ productId, itemId, sellerId }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<{ id: string; username: string } | null>(null);

  // Fetch logged-in user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser({ id: data._id, username: data.username || data.name });
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    fetchUser();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!user) return; // Safety check

    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          itemId,
          sellerId,
          rating,
          comment,
          userId: user.id,
          username: user.username,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit review");

      setRating(0);
      setComment("");
      alert("Review submitted successfully!");
    } catch (err) {
      console.error(err);
      setError("Something went wrong while submitting your review.");
    } finally {
      setLoading(false);
    }
  };

  // Show login prompt if user not logged in
  if (!user) {
    return (
      <div className="p-4 border rounded-md bg-surface dark:bg-surface-dark border-muted dark:border-muted-dark max-w-3xl mx-auto text-center">
        <h3 className="text-xl md:text-2xl font-semibold mb-3">Leave a Review</h3>
         <Link href="/login">
              <button className={`${headerStyles.button} login-button`} style={{ margin: '0.5rem auto', padding: '0.6rem 1.25rem' }}>Login</button>
            </Link>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-md bg-surface dark:bg-surface-dark border-muted dark:border-muted-dark max-w-3xl mx-auto">
      <h3 className="text-xl md:text-2xl font-semibold text-center mb-3">Leave a Review</h3>

      {error && <div className="text-red-600 mb-2">{error}</div>}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-fg dark:text-fg-dark text-lg font-semibold">Rating:</label>
        <div className="flex items-center gap-3 mb-3 justify-center">
          {Array.from({ length: 5 }, (_, i) => {
            const starValue = i + 1;
            const active = starValue <= (hoverRating || rating);
            return (
              <button
                key={i}
                type="button"
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHoverRating(starValue)}
                onMouseLeave={() => setHoverRating(0)}
                style={{ background: "transparent", border: "none", padding: 0 }}
                className="focus:outline-none review-star-button"
              >
                <span className={`inline-block mr-1 align-middle text-3xl review-star ${active ? "active" : "inactive"}`}>
                  {active ? "★" : "☆"}
                </span>
              </button>
            );
          })}
        </div>

        <label className="block mb-2 text-fg dark:text-fg-dark text-lg font-semibold">Comment:</label>
        <textarea
          placeholder="Write your review here:"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border w-full md:w-3/4 mx-auto block p-3 rounded review-textarea"
          style={{ minHeight: 160 }}
          maxLength={1000}
        />

        <div className="mt-3 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`${headerStyles.button} review-submit-button`}
          >
            {loading ? "Submitting…" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
