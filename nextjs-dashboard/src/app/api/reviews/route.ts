import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { Review } from "@/models/reviewModel";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const productId = body.productId as string | undefined;
    const itemId = typeof body.itemId === 'number' ? (body.itemId as number) : undefined;
    const sellerId = typeof body.sellerId === 'number' ? (body.sellerId as number) : undefined;
    const userId = body.userId as string | undefined;
    const username = body.username as string | undefined;
    const rating = typeof body.rating === 'number' ? (body.rating as number) : undefined;
    const comment = body.comment as string | undefined;

    if ((!productId && typeof itemId !== "number") || !userId || !username || !rating || !comment) {
      return NextResponse.json({ success: false, message: "Missing required fields: productId or itemId, userId, username, rating, comment" }, { status: 400 });
    }

    
    const review: Review = {
      productId: productId ?? undefined,
      itemId: typeof itemId === "number" ? itemId : undefined,
      sellerId: typeof sellerId === "number" ? sellerId : undefined,
      userId,
      username,
      rating,
      comment,
      createdAt: new Date(),
    };

    const reviewToInsert: Omit<Review, "_id"> = {
      productId: review.productId,
      itemId: review.itemId,
      sellerId: review.sellerId,
      userId: review.userId,
      username: review.username,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
    };

    const client = await clientPromise;
    const db = client.db("marketplace");
  const result = await db.collection("reviews").insertOne(reviewToInsert as unknown as Record<string, unknown>);

    return NextResponse.json({ success: true, data: { ...reviewToInsert, _id: result.insertedId.toString() } }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
