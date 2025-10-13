import { NextResponse } from "next/server";
import { fetchItemById } from "../../../lib/data";
import { updateItem } from "@/app/lib/data";

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


export async function PUTitem(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const id = Number(params.id);
        await updateItem(id, body);
        return NextResponse.json({ message: `Item ${id} updated successfully` });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
    }
}
