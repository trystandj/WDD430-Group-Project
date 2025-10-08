import React from 'react'

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
      <span className="review-stars ml-1 text-[#eedb61]" style={{ color: '#eedb61', fontSize: '0.85rem', lineHeight: 1 }} aria-hidden>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className="inline-block mr-0.5 align-middle">{i < n ? '★' : '☆'}</span>
        ))}
      </span>
    );
  };
  if (!reviews || reviews.length === 0) {
    // Render a styled Jane Doe sample review for visual testing when there are no reviews
    const jane: Review = {
      _id: 'jane-doe-sample',
      username: 'Jane Doe',
      rating: 5,
      comment: 'Absolutely beautiful work — I bought this as a gift and everyone loved it. The attention to detail is incredible and the quality exceeded my expectations.',
      createdAt: new Date().toISOString(),
    };

    return (
      <div className="mt-4 max-w-3xl mx-auto px-2">
  <article className="review-box">
          <div className="review-header">
            <img src="/images/spoons.webp" alt="avatar" className="review-avatar" />
            <div>
              <p className="review-author">{jane.username}</p>
              <div className="review-meta inline-flex items-center gap-1">
                <span className="review-date">{new Date(jane.createdAt).toLocaleDateString()}</span>
                <Stars rating={jane.rating} />
              </div>
            </div>
          </div>
          <div className="review-body">{jane.comment}</div>
  </article>

        <div className="border rounded-md shadow-sm p-6 bg-surface dark:bg-surface-dark border-muted dark:border-muted-dark h-40"
             style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <p className="text-gray-600 dark:text-gray-300 text-2xl md:text-3xl font-semibold">No reviews yet. Be the first to review!</p>
        </div>
      </div>
    );
  }

  return (
    // center the review column and constrain width so it doesn't span the whole page
    <div className="mt-4 space-y-4 max-w-3xl mx-auto px-2">
      {reviews.map((review) => (
        <article key={review._id} className="review-box">
          <div className="review-header">
            <img src="/images/spoons.webp" alt="avatar" className="review-avatar" />
            <div>
              <p className="review-author">{review.username}</p>
              <div className="review-meta inline-flex items-center gap-1">
                <span className="review-date">{new Date(review.createdAt).toLocaleDateString()}</span>
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
