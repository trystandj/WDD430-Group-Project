import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "../../lib/mongodb";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("your-database-name"); // 👈 change this to your DB name
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      role, // "user" or "seller"
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
