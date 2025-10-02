"use client";
import React, { useState } from "react";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

interface ReviewFormProps {
  productId: string;
  userId: string | null;
  username: string | null;
  onReviewAdded: (review: ReviewResponse) => void;
}

interface ReviewResponse {
  _id: string;
  productId: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ReviewForm({ productId, userId, username, onReviewAdded }: ReviewFormProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !username) return;
    // client-side validation
    setError(null);
    if (!(Number.isFinite(rating) && rating >= 1 && rating <= 5)) {
      setError('Rating must be between 1 and 5');
      return;
    }

    // enforce 200-word limit
    const words = comment.trim().length === 0 ? 0 : comment.trim().split(/\s+/).length;
    if (words > 200) {
      setError('Comment must be 200 words or fewer');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, userId, username, rating, comment }),
      });

      const data = await res.json();
      if (data.success) {
        setRating(5);
        setComment('');
        onReviewAdded(data.data);
      } else {
        setError(data?.message || 'Failed to submit review');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return <p className="p-4 border rounded-md mt-4">Please log in to write a review.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md mt-4 bg-surface dark:bg-surface-dark border-muted dark:border-muted-dark max-w-3xl mx-auto">
      <h3 className="text-lg font-semibold mb-2 text-fg dark:text-fg-dark">Write a Review</h3>

      {error && <div className="text-red-600 mb-2">{error}</div>}

      <label className="block mb-2 text-fg dark:text-fg-dark">Rating:</label>
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }, (_, i) => {
          const starValue = i + 1;
          const active = starValue <= (hoverRating || rating);
          return (
            <button
              type="button"
              key={i}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none"
              aria-label={`${starValue} star`}
            >
              {active ? (
                <StarSolid className="h-5 w-5 text-yellow-400 flex-shrink-0" />
              ) : (
                <StarOutline className="h-5 w-5 text-yellow-400 flex-shrink-0" />
              )}
            </button>
          );
        })}
        <span className="ml-3 text-sm text-fg dark:text-fg-dark">{rating} / 5</span>
      </div>

      <label className="block mb-2 text-fg dark:text-fg-dark">Comment (max 200 words):</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border w-full p-2 rounded bg-surface dark:bg-surface-dark text-fg dark:text-fg-dark border-muted dark:border-muted-dark"
        rows={4}
        maxLength={1000}
      />

      <div className="mt-3 flex justify-end">
        <button type="submit" disabled={loading} className="bg-primary text-gray-50 px-4 py-2 rounded disabled:opacity-50">
          {loading ? 'Submitting…' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
}
