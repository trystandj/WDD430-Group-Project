export interface SellerProfile {
  _id?: string;
  id: number; 
  userId: number;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  location: string;
  joinedAt: Date;
}

export interface SellerItem {
  id: number;
  sellerId: number; 
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  createdAt: Date;
}

export interface SellerStory {
  sellerId: number;
  title: string;
  content: string; 
  imageUrl?: string; 
  createdAt: Date;
}
