import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const sellerId = url.searchParams.get("sellerId");

    if (!sellerId) {
      return NextResponse.json({ error: "Missing sellerId" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("marketplace");

    const stories = await db
  .collection("stories")
  .find({ sellerId: parseInt(sellerId) }) 
  .sort({ createdAt: -1 })
  .toArray();

    return NextResponse.json(stories);
  } catch (err) {
    console.error("Error fetching stories:", err);
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

    const client = await clientPromise;
    const db = client.db("marketplace");


    const seller = await db.collection("sellers").findOne({
      userId: new ObjectId(decoded.userId),
    });

    if (!seller) {
      return NextResponse.json({ message: "Seller not found" }, { status: 404 });
    }

    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json({ message: "Missing title or content" }, { status: 400 });
    }

    const result = await db.collection("stories").insertOne({
      title,
      content,
      sellerId: seller.id, 
      createdAt: new Date(),
    });

    return NextResponse.json({
  _id: result.insertedId,
  title,
  content,
  sellerId: seller.id, 
});
  } catch (err) {
    console.error("Error creating story:", err);
    return NextResponse.json({ message: "Failed to create story" }, { status: 500 });
  }
}
