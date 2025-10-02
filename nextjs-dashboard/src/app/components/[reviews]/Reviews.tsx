import type { Review as ReviewModel } from '@/models/reviewModel'
import clientPromise from '@/lib/mongodb'
import ReviewsClient from '@/app/components/[reviews]/ReviewsClient'

interface ReviewsProps {
  productId: string
  // optionally the server can pass authenticated user info here
  userId?: string | null
  username?: string | null
}

export default async function Reviews({ productId, userId = null, username = null }: ReviewsProps) {
  const client = await clientPromise
  const db = client.db('handcraftedHaven')

  const reviewsFromDb = await db
    .collection('reviews')
    .find({ productId })
    .sort({ createdAt: -1 })
    .toArray()

  // serialize to plain JS values for the client
  const initialReviews: Array<{
    _id: string
    productId: string
    userId: string
    username: string
    rating: number
    comment: string
    createdAt: string
  }> = reviewsFromDb.map((r: any) => ({
    _id: r._id.toString(),
    productId: r.productId,
    userId: r.userId,
    username: r.username,
    rating: r.rating,
    comment: r.comment,
    createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt),
  }))

  // Render a client component that will handle interactions (posting new reviews)
  return <ReviewsClient productId={productId} initialReviews={initialReviews} userId={userId} username={username} />
}
