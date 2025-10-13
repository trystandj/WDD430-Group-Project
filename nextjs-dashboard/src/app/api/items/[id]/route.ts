import { NextResponse } from "next/server";
import { updateItem } from "@/app/lib/data";

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