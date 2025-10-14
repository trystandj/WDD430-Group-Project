import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: Params) {
  try {
    const { id } = await context.params; 
    const sellerId = Number(id);

    if (isNaN(sellerId)) throw new Error("Invalid sellerId");

    const client = await clientPromise;
    const db = client.db("marketplace");

    const items = await db.collection("items").find({ sellerId }).toArray();

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch items" },
      { status: 500 }
    );
  }
}
