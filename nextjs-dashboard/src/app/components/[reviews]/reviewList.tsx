import React from 'react'
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

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
  if (!reviews || reviews.length === 0) {
    return <p className="mt-4 text-center text-gray-600 dark:text-gray-300">No reviews yet. Be the first to review!</p>;
  }

  return (
    // center the review column and constrain width so it doesn't span the whole page
    <div className="mt-4 space-y-4 max-w-3xl mx-auto px-2">
      {reviews.map((review) => (
        <article
          key={review._id}
          // outlined box per review, dark-friendly background
          className="border rounded-md shadow-sm p-4 bg-surface dark:bg-surface-dark border-muted dark:border-muted-dark"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-fg dark:text-fg-dark">{review.username}</p>
              <small className="text-muted dark:text-muted-dark">{new Date(review.createdAt).toLocaleDateString()}</small>
            </div>
            <div className="flex items-center text-star space-x-1">
              {Array.from({ length: 5 }, (_, i) =>
                i < review.rating ? (
                  <StarSolid key={i} className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <StarOutline key={i} className="h-5 w-5 flex-shrink-0" />
                )
              )}
            </div>
          </div>

          <p className="mt-3 text-fg dark:text-fg-dark">{review.comment}</p>
        </article>
      ))}
    </div>
  );
}
