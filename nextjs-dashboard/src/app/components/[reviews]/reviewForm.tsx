"use client";
import React, { useState } from "react";
import Link from 'next/link'
import headerStyles from '../../ui/header.module.css'

interface ReviewFormProps {
  productId?: string;
  // numeric itemId used to link a review to a specific item
  itemId?: number;
  // optional sellerId if available
  sellerId?: number;
  userId: string | null;
  username: string | null;
  onReviewAdded?: (review: ReviewResponse) => void;
}

interface ReviewResponse {
  _id: string;
  productId?: string;
  itemId?: number;
  sellerId?: number;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ReviewForm({ productId, itemId, sellerId, userId, username, onReviewAdded }: ReviewFormProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Only allow the form when a real user is provided. Do not use any dev
  // fallback here — the page should require an authenticated user. The
  // server-side page should pass `userId`/`username` when available.

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
  body: JSON.stringify({ productId, itemId, sellerId, userId, username, rating, comment }),
      });

      const data = await res.json();
      if (data.success) {
        setRating(5);
        setComment('');
        // call callback if provided (client-only)
        try { onReviewAdded && onReviewAdded(data.data) } catch (e) { /* ignore */ }
        // dispatch a global event so other client components can listen and update
        try {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('review:added', { detail: data.data }))
          }
        } catch (e) {
          // ignore
        }
      } else {
        setError(data?.message || 'Failed to submit review');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  // presentation wrapper class used for the boxed area
  const boxClass = "p-4 border rounded-md bg-surface dark:bg-surface-dark border-muted dark:border-muted-dark max-w-3xl mx-auto";

  if (!userId) {
    return (
      <div className={boxClass}>
        <h3 className="text-xl md:text-2xl font-semibold text-center">Leave A Review</h3>
        <div className="flex flex-col items-center py-6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <p className="mb-3 text-sm text-fg dark:text-fg-dark text-center">Please log in to leave feedback.</p>
          <div className="mt-4" style={{ marginTop: '1rem' }}>
            <Link href="/login">
              <button className={`${headerStyles.button} login-button`} style={{ margin: '0.5rem auto', padding: '0.6rem 1.25rem' }}>Login</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={boxClass}>
      <h3 className="text-xl md:text-2xl font-semibold text-center">Leave A Review</h3>

      <form onSubmit={handleSubmit} className="mt-3">
        {error && <div className="text-red-600 mb-2">{error}</div>}

  <label className="block mb-2 text-fg dark:text-fg-dark text-lg font-semibold">Rating:</label>
  <div className="flex items-center gap-3 mb-3 justify-center">
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
                  className="focus:outline-none review-star-button"
                aria-label={`${starValue} star`}
                style={{ background: 'transparent', border: 'none', padding: 0 }}
              >
                  <span className={`inline-block mr-1 align-middle text-3xl review-star ${active ? 'active' : 'inactive'}`}>
                    {active ? '★' : '☆'}
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
          <button type="submit" disabled={loading} className={`${headerStyles.button} review-submit-button`}>
            {loading ? 'Submitting…' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
