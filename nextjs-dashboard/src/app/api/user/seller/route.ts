import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

    const client = await clientPromise;
    const db = client.db("marketplace");

    const seller = await db.collection("sellers").findOne({
      userId: new ObjectId(decoded.userId),
    });

    if (!seller) return NextResponse.json({ message: "Seller not found" }, { status: 404 });

    return NextResponse.json(seller);
  } catch (error) {
    console.error("Error in seller GET route:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

    const body = await req.json();
    const { bio, avatarUrl, location } = body;

    const client = await clientPromise;
    const db = client.db("marketplace");

    const updateResult = await db.collection("sellers").updateOne(
      { userId: new ObjectId(decoded.userId) },
      { $set: { bio, avatarUrl, location } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ message: "Update failed" }, { status: 400 });
    }

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error in seller PUT route:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
