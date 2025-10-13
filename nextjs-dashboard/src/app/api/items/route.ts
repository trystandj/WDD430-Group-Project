import { NextResponse } from "next/server";
import { addItem, fetchRandomSellerItems } from "@/app/lib/data";

export async function GET() {
  try {
    const items = await fetchRandomSellerItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POSTitem(req: Request) {
  try {
    const body = await req.json();
    await addItem({
      ...body,
      createdAt: new Date(),
    });
    return NextResponse.json({ message: "Item added successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}
