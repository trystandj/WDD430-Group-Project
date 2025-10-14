import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/app/lib/mongodb";
import { Review } from "@/models/reviewModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("marketplace");

  if (req.method === "POST") {
    try {

      const { productId, itemId, sellerId, userId, username, rating, comment } = req.body;

      if ((!productId && typeof itemId !== "number") || !userId || !username || !rating || !comment) {
        return res.status(400).json({ success: false, message: "Missing required fields: productId or itemId, userId, username, rating, comment" });
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

  const result = await db.collection("reviews").insertOne(reviewToInsert);
  res.status(201).json({ success: true, data: { ...reviewToInsert, _id: result.insertedId.toString() } });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ success: false, message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
