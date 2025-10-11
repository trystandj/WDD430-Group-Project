import { NextResponse } from "next/server";
import { fetchItemById } from "../../../lib/data";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = params;
    const item = await fetchItemById(id);

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error fetching item by id:", error);
    return NextResponse.json({ error: "Failed to fetch item" }, { status: 500 });
  }
}
