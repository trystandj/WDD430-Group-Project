import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

    const client = await clientPromise;
    const db = client.db("marketplace");

    const user = await db.collection("users").findOne({ _id: new ObjectId(decoded.userId) });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }


    const seller = await db.collection("sellers").findOne({ userId: new ObjectId(decoded.userId) });

    return NextResponse.json({
      name: user.name,
      email: user.email,
      role: user.role,
      sellerId: seller?.id || null,
      bio: seller?.bio || "",
      avatarUrl: seller?.avatarUrl || "",
      location: seller?.location || "",
      joinedAt: user.createdAt,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }
}
