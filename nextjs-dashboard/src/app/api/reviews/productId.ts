import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/app/lib/mongodb";
import { Review } from "@/models/reviewModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("marketplace");
  const { productId } = req.query;
  const productIdStr = Array.isArray(productId) ? productId[0] : productId;

  if (req.method === "GET") {
    try {
      // If the path param is numeric (e.g. /api/reviews/4), treat it as itemId.
      const maybeNumber = Number(productIdStr);
      const isNumeric = !Number.isNaN(maybeNumber);

      const query: Record<string, unknown> = isNumeric ? { itemId: maybeNumber } : { productId: productIdStr };

      const reviewsFromDb = await db
        .collection("reviews")
        .find(query)
        .sort({ createdAt: -1 })
        .toArray();

      // Convert MongoDB ObjectId to string for _id and preserve itemId/sellerId
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

      res.status(200).json({ success: true, data: reviews });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ success: false, message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
