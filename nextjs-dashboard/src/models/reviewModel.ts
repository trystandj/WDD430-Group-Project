// src/models/reviewModel.ts
export interface Review {
  _id?: string;
  // productId is kept for backward compatibility (e.g. slug strings).
  productId?: string;
  // itemId is the numeric id for the item being reviewed (preferred).
  itemId?: number;
  // optional seller linkage if available
  sellerId?: number;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
