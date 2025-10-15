// lib/data.ts
import clientPromise from "./mongodb";
import { SellerProfile } from "./definitions";
import { SellerItem } from "./definitions";
import { SellerStory } from "./definitions";



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
    query: string, 
    currentPage: number,
    minPrice?: number,
    maxPrice?: number,
    sellerId?: number
) {
    const ITEMS_PER_PAGE = 9;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    
    interface MongoFilter {
        $or?: Array<{ title?: { $regex: string; $options: string }; description?: { $regex: string; $options: string } }>;
        price?: {
            $gte?: number;
            $lte?: number;
        };
        sellerId?: number;
    }
    
    const filter: MongoFilter = {};

    if (query) {
        filter.$or = [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
        ];
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
        filter.price = {};
        if (minPrice !== undefined) filter.price.$gte = minPrice;
        if (maxPrice !== undefined) filter.price.$lte = maxPrice;
    }
    
    if (sellerId !== undefined) {
        filter.sellerId = sellerId;
    }
    
    const collection = await getItemsCollection();
    const items = await collection
        .find(filter)
        .skip(offset)
        .limit(ITEMS_PER_PAGE)
        .toArray();
    
    return items;
}


// Fetch 6 random items
export async function fetchRandomSellerItems(): Promise<SellerItem[]> {
  try {
    console.log("Fetching 6 random seller items...");
    const collection = await getItemsCollection();

    const items = await collection.aggregate([{ $sample: { size: 6 } }]).toArray();

    console.log(`Fetched ${items.length} random items.`);
    return items as SellerItem[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch random seller items.");
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

// Fetch a single item by its numeric id
export async function fetchItemById(id: number): Promise<SellerItem | null> {
  try {
    const client = await clientPromise;
    const db = client.db("marketplace");
    const collection = db.collection<SellerItem>("items");
    const item = await collection.findOne({ id });
    return item;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch item.");
  }
}

// Create new Item
export async function addItem(newItem: SellerItem): Promise<number> {
  try {
    const collection = await getItemsCollection();

    // Ensure required fields are present
    if (!newItem.id || !newItem.sellerId) {
      throw new Error("Missing required fields: id or sellerId");
    }

    // Add timestamp if not provided
    if (!newItem.createdAt) {
      newItem.createdAt = new Date();
    }

    await collection.insertOne(newItem);
    console.log(`Added new item with id ${newItem.id} for seller ${newItem.sellerId}.`);
    return newItem.id;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add new item.");
  }
}

// Update item by id
export async function updateItem(id: number, updatedFields: Partial<SellerItem>): Promise<number> {
  try {
    const collection = await getItemsCollection();

    const result = await collection.updateOne(
      { id },
      { $set: { ...updatedFields, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      throw new Error(`No item found with id ${id}.`);
    }

    console.log(`Updated item with id ${id}.`);
    return id;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update item.");
  }
}

export async function fetchLastItemId(): Promise<number | null> {
  try {
    console.log("Fetching last item ID...");
    const collection = await getItemsCollection();

    // Sort by `id` descending (-1) and get the first document
    const lastItem = await collection
      .find({})
      .sort({ id: -1 })
      .limit(1)
      .toArray();

    if (lastItem.length === 0) {
      console.log("No items found in collection.");
      return null;
    }

    console.log(`Last item ID: ${lastItem[0].id}`);
    return lastItem[0].id;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch last item ID.");
  }
}