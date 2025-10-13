export interface SellerItem {
  id: number;
  sellerId: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  createdAt: Date;
  updatedAt?: Date;
}
