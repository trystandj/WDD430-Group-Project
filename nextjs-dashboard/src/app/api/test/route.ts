import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("admin");
    const result = await db.command({ ping: 1 });

    return Response.json({
      ok: true,
      message: "Connected to MongoDB!",
      result,
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
    return Response.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
