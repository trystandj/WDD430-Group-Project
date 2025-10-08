import type { Review as ReviewModel } from '@/models/reviewModel'
import clientPromise from '@/app/lib/mongodb'
import ReviewsClient from '@/app/components/[reviews]/ReviewsClient'

interface ReviewsProps {
  productId: string
  itemId?: number
  userId?: string | null
  username?: string | null
}

export default async function Reviews({ productId, itemId, userId = null, username = null }: ReviewsProps) {
  const client = await clientPromise
  const db = client.db('handcraftedHaven')

  const query: any = {}
  if (typeof itemId === 'number') {
    query.itemId = itemId
  } else {
    const maybeNumber = Number(productId)
    if (!Number.isNaN(maybeNumber)) {
      query.itemId = maybeNumber
    } else {
      query.productId = productId
    }
  }

  const reviewsFromDb = await db
    .collection('reviews')
    .find(query)
    .sort({ createdAt: -1 })
    .toArray()

  const initialReviews: Array<{
    _id: string
    productId?: string
    itemId?: number
    sellerId?: number
    userId: string
    username: string
    rating: number
    comment: string
    createdAt: string
  }> = reviewsFromDb.map((r: any) => ({
    _id: r._id.toString(),
    productId: r.productId,
    itemId: r.itemId,
    sellerId: r.sellerId,
    userId: r.userId,
    username: r.username,
    rating: r.rating,
    comment: r.comment,
    createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt),
  }))

  return <ReviewsClient productId={productId} itemId={itemId} initialReviews={initialReviews} userId={userId} username={username} />
}
