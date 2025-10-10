import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };

    const client = await clientPromise;
    const db = client.db("your-database-name"); // change to your DB
    const user = await db.collection("users").findOne({ email: decoded.email, role: "user" });

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const { password, ...profile } = user; // never send password
    return NextResponse.json(profile);
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
