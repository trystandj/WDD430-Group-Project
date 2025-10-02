import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { Review } from "@/models/reviewModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("handcraftedHaven");

  if (req.method === "POST") {
    try {
      const { productId, userId, username, rating, comment } = req.body;

      if (!productId || !userId || !username || !rating || !comment) {
        return res.status(400).json({ success: false, message: "All fields required" });
      }

      const review: Review = {
        productId,
        userId,
        username,
        rating,
        comment,
        createdAt: new Date(),
      };

      // Don't pass a type that may contain a string _id to MongoDB's insertOne
      // Mongo expects _id (if present) to be an ObjectId; ensure we insert a
      // document without the optional _id by using Omit<Review, '_id'>.
      const reviewToInsert: Omit<Review, "_id"> = {
        productId: review.productId,
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
