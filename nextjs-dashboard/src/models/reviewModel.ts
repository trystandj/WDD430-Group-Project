// src/models/reviewModel.ts
export interface Review {
  _id?: string;
  productId: string;
  userId: string;
  username: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
}
