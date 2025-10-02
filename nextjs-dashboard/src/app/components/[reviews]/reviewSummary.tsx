import React from 'react'
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

interface ReviewSummaryProps {
  reviews: { rating: number }[];
}

export default function ReviewSummary({ reviews }: ReviewSummaryProps) {
  if (reviews.length === 0) return null;

  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  const avg = total / reviews.length;

  const rounded = Math.round(avg * 2) / 2; // nearest 0.5

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      if (i + 1 <= rounded) {
        return <StarSolid key={i} className="h-5 w-5 text-black-400 flex-shrink-0" />;
      }
      if (i + 0.5 === rounded) {
        return (
          <div key={i} className="relative inline-block h-5 w-5">
            <StarSolid className="h-5 w-5 text-black-400 absolute left-0 top-0 w-1/2 overflow-hidden" />
            <StarOutline className="h-5 w-5 text-black-400 absolute left-0 top-0" />
          </div>
        );
      }
      return <StarOutline key={i} className="h-5 w-5 text-yellow-400 flex-shrink-0" />;
    });
  };

  return (
    <div className="p-4 border rounded-md bg-surface dark:bg-surface-dark border-muted dark:border-muted-dark max-w-3xl mx-auto">
      <p className="text-lg font-semibold text-fg dark:text-fg-dark">
        {reviews.length} Review{reviews.length > 1 ? 's' : ''}
      </p>
      <div className="flex items-center mt-1">
        {renderStars()}
        <span className="ml-2 text-fg dark:text-fg-dark">({avg.toFixed(1)} / 5)</span>
      </div>
    </div>
  );
}
