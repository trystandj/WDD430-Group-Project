import { NextResponse, NextRequest } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { Review } from "@/models/reviewModel";

type RouteContext = { params: Promise<{ productId: string }> }

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const client = await clientPromise;
    const db = client.db("marketplace");

    const maybeParams = context?.params ?? {};
    const resolvedParams = maybeParams instanceof Promise ? await maybeParams : maybeParams;
    const { productId } = resolvedParams as { productId: string };
    const maybeNumber = Number(productId);
    const isNumeric = !Number.isNaN(maybeNumber);

  const query: Record<string, unknown> = isNumeric ? { itemId: maybeNumber } : { productId };

    const reviewsFromDb = await db
      .collection("reviews")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    type RawReview = {
      _id: { toString(): string } | string;
      productId?: string;
      itemId?: number;
      sellerId?: number;
      userId: string;
      username: string;
      rating: number;
      comment: string;
      createdAt: Date | string;
    };

    const reviews: Review[] = (reviewsFromDb as unknown as RawReview[]).map((r) => ({
      _id: typeof r._id === 'string' ? r._id : r._id.toString(),
      productId: r.productId,
      itemId: r.itemId,
      sellerId: r.sellerId,
      userId: r.userId,
      username: r.username,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt instanceof Date ? r.createdAt : new Date(String(r.createdAt)),
    }));

    return NextResponse.json({ success: true, data: reviews });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
