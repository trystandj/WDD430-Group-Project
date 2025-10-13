import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, context: Params) {
  try {
    const { id } = await context.params;
    const numericSellerId = Number(id); 
    console.log("Querying items for sellerId:", numericSellerId);

    const client = await clientPromise;
    const db = client.db("marketplace");

    const items = await db
      .collection("items")
      .find({ sellerId: numericSellerId })
      .toArray();

    console.log("Found items:", items.length);
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching items by sellerId:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}


export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json();


    const { id } = await context.params;
    const numericId = Number(id);

    console.log("Updating item:", numericId, "with data:", body);

    await updateItem(numericId, body);

    return NextResponse.json({
      message: `Item ${numericId} updated successfully`,
    });
  } catch (error) {
    console.error("Error updating item:", error);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}