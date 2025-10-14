/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const db = client.db('marketplace')

  const query: Record<string, unknown> = {}
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

  type InitialReview = {
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

  type RawReview = { _id: { toString(): string } | string; createdAt?: Date | string; productId?: string; itemId?: number; sellerId?: number; userId?: string; username?: string; rating?: number; comment?: string }

  const initialReviews: InitialReview[] = (reviewsFromDb as unknown as RawReview[]).map((r) => {
    const raw = r
    return {
      _id: typeof raw._id === 'string' ? raw._id : raw._id.toString(),
      productId: raw.productId,
      itemId: raw.itemId,
      sellerId: raw.sellerId,
      userId: raw.userId ?? '',
      username: raw.username ?? '',
      rating: typeof raw.rating === 'number' ? raw.rating : 0,
      comment: raw.comment ?? '',
      createdAt: raw.createdAt instanceof Date ? raw.createdAt.toISOString() : String(raw.createdAt ?? ''),
    } as InitialReview
  })

  return <ReviewsClient productId={productId} itemId={itemId} initialReviews={initialReviews} />
}
