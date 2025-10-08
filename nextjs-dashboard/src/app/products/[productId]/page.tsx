import Reviews from '@/app/components/[reviews]/Reviews'
import ReviewsClient from '@/app/components/[reviews]/ReviewsClient'

export default async function ProductPage(props: { params: { productId: string }, searchParams?: { demo?: string } }) {
  // `params` and `searchParams` can be async proxies in some runtimes — await them directly
  const params = await (props as any).params
  const searchParams = props.searchParams ? await (props as any).searchParams : undefined
  const { productId } = params as { productId: string }

  // NOTE: In a real app you would fetch product details and user session here.
  // For now we pass null for userId/username — the ReviewForm will prevent unauthenticated POSTs.
  const userId = null
  const username = null

  const isDemo = Boolean(searchParams && searchParams.demo === 'true')

  // Sample reviews for demo mode (no DB needed)
  const sampleReviews = [
    {
      _id: 'demo-1',
      productId,
      userId: 'demo-user-1',
      username: 'Alice',
      rating: 5,
      comment: 'Lovely product — highly recommend!',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'demo-2',
      productId,
      userId: 'demo-user-2',
      username: 'Bob',
      rating: 4,
      comment: 'Very good quality. Shipping was fast.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
  ]

  const maybeNumber = Number(productId)
  const itemId = !Number.isNaN(maybeNumber) ? maybeNumber : undefined

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product {productId}</h1>
      <p className="mb-6">Product details would go here.</p>

      {/* If demo query param is set, render the client reviews component with sample data so
          you can preview the UI locally without a MongoDB connection. Otherwise render the
          server Reviews component which fetches from the DB. */}
      {isDemo ? (
        // render client-only widget with demo data
        <ReviewsClient productId={productId} itemId={itemId} initialReviews={sampleReviews} userId={userId} username={username} />
      ) : (
        // server widget (fetches real reviews from MongoDB)
        <Reviews productId={productId} itemId={itemId} userId={userId} username={username} />
      )}
    </div>
  )
}
