
export interface SellerItem {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  createdAt: Date;
}

export interface SellerProfile {
  _id?: string;
    id: number; 
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  location: string;
  joinedAt: Date;
  items: SellerItem[];
}
