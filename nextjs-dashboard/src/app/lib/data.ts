// lib/data.ts
import clientPromise from "./mongodb";
import { SellerProfile } from "./definitions";
import { SellerItem } from "./definitions";
import { SellerStory } from "./definitions";






// Helper: get collection
async function getCollection() {
  const client = await clientPromise;
  const db = client.db("marketplace"); 
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







// Helper: get items collection
async function getItemsCollection() {
  const client = await clientPromise;
  const db = client.db("marketplace"); 
  return db.collection<SellerItem>("items");
}

// Fetch all items
export async function fetchItemsAmount(
  title: string = "",
): Promise<number> {
  try {
    console.log("Fetching seller items...");
    const collection = await getItemsCollection();

    const query = title
      ? { title: { $regex: title, $options: "i" } }
      : {};

    const items = await collection
      .find(query)
      .toArray();

    console.log(`Fetched ${items.length} items.`);
    const totalPages = Math.ceil(Number(items.length) / 9);

    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch seller items.");
  }
}

export async function fetchSellerItems(
  title: string = "",
  page: number = 1,
  limit: number = 9
): Promise<SellerItem[]> {
  try {
    console.log("Fetching seller items...");
    const collection = await getItemsCollection();

    const query = title
      ? { title: { $regex: title, $options: "i" } }
      : {};

    const skip = (page - 1) * limit;

    const items = await collection
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();

    console.log(`Fetched ${items.length} items.`);
    return items;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch seller items.");
  }
}

// Fetch items for one seller by sellerId
export async function fetchItemsBySellerId(sellerId: number): Promise<SellerItem[]> {
  try {
    const collection = await getItemsCollection();
    const items = await collection.find({ sellerId }).toArray();
    console.log(`Fetched ${items.length} items for seller ${sellerId}.`);
    return items;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch seller items by sellerId.");
  }
}











// Helper: get stories collection
async function getStoriesCollection() {
  const client = await clientPromise;
  const db = client.db("marketplace");
  return db.collection<SellerStory>("stories");
}

// Fetch all stories
export async function fetchSellerStories(): Promise<SellerStory[]> {
  try {
    console.log("Fetching seller stories...");
    const collection = await getStoriesCollection();
    const stories = await collection.find({}).toArray();
    console.log(`Fetched ${stories.length} stories.`);
    return stories;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch seller stories.");
  }
}

// Fetch stories for one seller by sellerId
export async function fetchStoriesBySellerId(
  sellerId: number
): Promise<SellerStory[]> {
  try {
    const collection = await getStoriesCollection();
    const stories = await collection.find({ sellerId }).toArray();
    console.log(`Fetched ${stories.length} stories for seller ${sellerId}.`);
    return stories;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch seller stories by sellerId.");
  }
}