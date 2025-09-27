// lib/data.ts
import clientPromise from "./mongodb";
import { SellerProfile } from "./definitions";

// Helper: get collection
async function getCollection() {
  const client = await clientPromise;
  const db = client.db("sellers"); 
  return db.collection<SellerProfile>("sellers");
}

// Fetch all seller profiles
export async function fetchSellerProfiles(): Promise<SellerProfile[]> {
  try {
    console.log("Fetching seller profiles...");
    const collection = await getCollection();
    const sellers = await collection.find({}).toArray();
    console.log(`Fetched ${sellers.length} sellers.`);
    return sellers;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch seller profiles.");
  }
}

// Fetch one seller by ID
export async function fetchSellerById(id: string): Promise<SellerProfile | null> {
  try {
    const collection = await getCollection();
    return collection.findOne({ id: Number(id) });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch seller profile.");
  }
}


// Insert a new seller profile
export async function createSellerProfile(seller: SellerProfile) {
  try {
    const collection = await getCollection();
    const result = await collection.insertOne(seller);
    return result.insertedId;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create seller profile.");
  }
}

// Update a seller profile
export async function updateSellerProfile(id: string, update: Partial<SellerProfile>) {
  try {
    const collection = await getCollection();
    const result = await collection.updateOne({ _id: id }, { $set: update });
    return result.modifiedCount > 0;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update seller profile.");
  }
}

// Delete a seller profile
export async function deleteSellerProfile(id: string) {
  try {
    const collection = await getCollection();
    const result = await collection.deleteOne({ _id: id });
    return result.deletedCount > 0;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete seller profile.");
  }
}
