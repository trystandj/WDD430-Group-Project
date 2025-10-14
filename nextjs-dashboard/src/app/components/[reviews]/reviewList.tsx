import React from 'react'
import Image from 'next/image'

interface Review {
  _id: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  const Stars = ({ rating }: { rating: number | string | null | undefined }) => {
    const n = Math.max(0, Math.min(5, Number(rating) || 0));
    return (
      <span
        className="review-stars ml-1 text-[#eedb61]"
        style={{ color: '#eedb61', fontSize: '0.85rem', lineHeight: 1 }}
        aria-hidden
      >
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className="inline-block mr-0.5 align-middle">{i < n ? '★' : '☆'}</span>
        ))}
      </span>
    );
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="mt-4 max-w-3xl mx-auto px-2">
        <div
          className="border rounded-md shadow-sm p-6 bg-surface dark:bg-surface-dark border-muted dark:border-muted-dark h-40"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <p className="text-gray-600 dark:text-gray-300 text-2xl md:text-3xl font-semibold">
            No reviews yet. Be the first to review!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4 max-w-3xl mx-auto px-2">
      {reviews.map((review) => (
        <article key={review._id} className="review-box">
          <div className="review-header">
            <Image
              src="/images/spoons.webp"
              alt="avatar"
              className="review-avatar"
              width={48}
              height={48}
            />
            <div>
              <p className="review-author">{review.username}</p>
              <div className="review-meta inline-flex items-center gap-1">
                <span className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
                <Stars rating={review.rating} />
              </div>
            </div>
          </div>

          <div className="review-body">{review.comment}</div>
        </article>
      ))}
    </div>
  );
}
