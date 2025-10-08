"use client"
import React, { useEffect, useState, useRef } from 'react'
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

declare global {
  interface Window { __reviewsFetched?: Set<string> }
}

export default function ReviewsClient({ productId, itemId, initialReviews = [] }: {
  productId: string
  itemId?: number
  initialReviews?: Review[]
}) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchedRef = useRef(false)
  // use a typed window-scoped cache to avoid repeated fetches across components
  if (typeof window !== 'undefined' && !window.__reviewsFetched) {
    window.__reviewsFetched = new Set<string>()
  }
  const globalFetched = typeof window !== 'undefined' ? window.__reviewsFetched! : new Set<string>()

  useEffect(() => {
    const fetchKey = typeof itemId === 'number' ? `item:${itemId}` : `product:${productId}`

    if (fetchedRef.current) return

    try {
      if (typeof window !== 'undefined') {
        const lsKey = `reviews:fetched:${fetchKey}`
        const lsVal = localStorage.getItem(lsKey)
        if (lsVal === '1') {
          fetchedRef.current = true
          globalFetched.add(fetchKey)
          return
        }
      }
    } catch (e) {
    }

    if (globalFetched.has(fetchKey)) {
      fetchedRef.current = true
      return
    }

    if (initialReviews && initialReviews.length > 0) {
      setReviews(initialReviews)
      fetchedRef.current = true
      globalFetched.add(fetchKey)
      return
    }

  setLoading(true);
  (async () => {
      const pathParam = typeof itemId === 'number' ? String(itemId) : productId
      try {
        const res = await fetch(`/api/reviews/${encodeURIComponent(String(pathParam))}`)
        if (!res.ok) {
          if (res.status === 400 || res.status === 404) {
            setReviews([])
            return
          }
          const text = await res.text().catch(() => '')
          setError(text ? `Failed to load reviews: ${res.status} ${res.statusText}` : `Failed to load reviews: ${res.status}`)
          return
        }

        const contentType = res.headers.get('content-type') || ''
        if (!contentType.includes('application/json')) {
          setReviews([])
          return
        }

        const data = await res.json()
        if (data?.success) setReviews(data.data || [])
        else {
          const msg = (data?.message || '').toLowerCase()
          if (msg.includes('no') || msg.includes('not found') || msg.includes('none')) {
            setReviews([])
          } else {
            setError(data?.message || 'Failed to load reviews')
          }
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
        fetchedRef.current = true
        try {
          globalFetched.add(fetchKey)
          if (typeof window !== 'undefined') {
            localStorage.setItem(`reviews:fetched:${fetchKey}`, '1')
          }
        } catch (e) {
        }
      }
    })()
  }, [productId, itemId])

  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent<Review>
      const newReview = ev.detail
      if (newReview && newReview._id) {
        setReviews((prev) => [newReview, ...prev])
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('review:added', handler as EventListener)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('review:added', handler as EventListener)
      }
    }
  }, [])

  const handleReviewAdded = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev])
  }

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
