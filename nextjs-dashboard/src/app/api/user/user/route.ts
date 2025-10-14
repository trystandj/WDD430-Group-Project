import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) 
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

    const client = await clientPromise;
    const db = client.db("marketplace");

    const user = await db.collection("users").findOne({ _id: new ObjectId(decoded.userId) });

    if (!user) 
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const { password, ...safeUser } = user;
    return NextResponse.json(safeUser);

  } catch (error) {
    console.error("Error in user GET route:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) 
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

    const body = await req.json();
    const { name, email } = body; // fields that users can update

    const client = await clientPromise;
    const db = client.db("marketplace");

    const updateResult = await db.collection("users").updateOne(
      { _id: new ObjectId(decoded.userId) },
      { $set: { name, email } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ message: "Update failed" }, { status: 400 });
    }

    // Return the updated user info
    const updatedUser = await db.collection("users").findOne({ _id: new ObjectId(decoded.userId) });
    const { password, ...safeUser } = updatedUser!;
    return NextResponse.json(safeUser);

  } catch (error) {
    console.error("Error in user PUT route:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
