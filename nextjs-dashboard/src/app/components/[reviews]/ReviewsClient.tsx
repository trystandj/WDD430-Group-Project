/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useState, useCallback } from 'react'
import ReviewSummary from '@/app/components/[reviews]/reviewSummary'
import ReviewList from '@/app/components/[reviews]/reviewList'

interface Review {
  _id: string
  productId?: string
  itemId?: number
  sellerId?: number
  userId: string
  username: string
  rating: number
  comment: string
  createdAt: string
}

export default function ReviewsClient({ productId, itemId, initialReviews = [] }: {
  productId: string
  itemId?: number
  initialReviews?: Review[]
}) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchReviews = useCallback(async () => {
    if (!productId && itemId == null) return

    setLoading(true)
    setError(null)

    try {
      const pathParam = typeof itemId === 'number' ? String(itemId) : productId
      const res = await fetch(`/api/reviews/${encodeURIComponent(pathParam)}`)
      if (!res.ok) {
        if (res.status === 404) setReviews([])
        else throw new Error(`Failed to load reviews: ${res.status}`)
        return
      }

      const data = await res.json()
      if (data?.success) setReviews(data.data || [])
      else setReviews([])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }, [productId, itemId])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent<Review>
      const newReview = ev.detail
      if (newReview && newReview._id) {
        setReviews((prev) => [newReview, ...prev])
      }
    }

    window.addEventListener('review:added', handler as EventListener)
    return () => window.removeEventListener('review:added', handler as EventListener)
  }, [])

  return (
    <div className="my-6">
      <div className="max-w-3xl mx-auto px-2">
        <h2 className="items-section-title">Reviews</h2>
      </div>

      {loading && <div className="max-w-3xl mx-auto px-2 mt-4">Loading reviews…</div>}
      {error && <div className="max-w-3xl mx-auto px-2 mt-4 text-red-600">{error}</div>}

      <div className="mt-4">
        <ReviewSummary reviews={reviews.map((r) => ({ rating: r.rating }))} />
        <ReviewList reviews={reviews} />
      </div>
    </div>
  )
}