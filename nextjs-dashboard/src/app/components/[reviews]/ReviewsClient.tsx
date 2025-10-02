"use client"
import React, { useEffect, useState } from 'react'
import ReviewSummary from '@/app/components/[reviews]/reviewSummary'
import ReviewList from '@/app/components/[reviews]/reviewList'
import ReviewForm from '@/app/components/[reviews]/reviewForm'

interface Review {
  _id: string
  productId: string
  userId: string
  username: string
  rating: number
  comment: string
  createdAt: string
}

export default function ReviewsClient({ productId, initialReviews = [], userId = null, username = null }: {
  productId: string
  initialReviews?: Review[]
  userId?: string | null
  username?: string | null
}) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!initialReviews || initialReviews.length === 0) {
      setLoading(true)
      fetch(`/api/reviews/${encodeURIComponent(productId)}`)
        .then((r) => r.json())
        .then((data) => {
          if (data?.success) setReviews(data.data)
          else setError(data?.message || 'Failed to load reviews')
        })
        .catch((e) => setError(String(e)))
        .finally(() => setLoading(false))
    }
  }, [productId, initialReviews])

  const handleReviewAdded = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev])
  }

  return (
    <div>
      {loading && <div>Loading reviews…</div>}
      {error && <div className="text-red-600">{error}</div>}

      <ReviewSummary reviews={reviews.map((r) => ({ rating: r.rating }))} />
      <ReviewList reviews={reviews} />

      <ReviewForm productId={productId} userId={userId} username={username} onReviewAdded={handleReviewAdded} />
    </div>
  )
}
