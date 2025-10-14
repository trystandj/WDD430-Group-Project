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
    const db = client.db("marketplace");
    const usersCollection = db.collection("users");
    const sellersCollection = db.collection("sellers");

 
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }


    const lastUser = await usersCollection.find().sort({ id: -1 }).limit(1).toArray();
    const nextUserId = lastUser.length > 0 ? lastUser[0].id + 1 : 1;


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = {
      id: nextUserId,
      name,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
    };

    const userResult = await usersCollection.insertOne(newUser);


    if (role.toLowerCase() === "seller") {
      const lastSeller = await sellersCollection.find().sort({ id: -1 }).limit(1).toArray();
      const nextSellerId = lastSeller.length > 0 ? lastSeller[0].id + 1 : 1;

      const newSeller = {
        id: nextSellerId,
        userId: userResult.insertedId,
        name,
        email,
        bio: "",
        avatarUrl: "",
        location: "",
        joinedAt: new Date(),
      };

      await sellersCollection.insertOne(newSeller);
    }

    return NextResponse.json({ message: "User registered successfully. Please login" }, { status: 201 });
  } catch (err) {
    console.error("Error in signup route:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
