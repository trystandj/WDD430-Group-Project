import { NextResponse } from "next/server";
import { fetchRandomSellerItems } from "../../lib/data";

export async function GET() {
  try {
    const items = await fetchRandomSellerItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}
