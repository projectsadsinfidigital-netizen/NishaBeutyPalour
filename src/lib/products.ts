export interface SalonProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isAvailable: boolean;
  createdAt: number;
}

export interface ProductInquiry {
  id: string;
  name: string;
  phone: string;
  productId: string;
  productName: string;
  message: string;
  status: 'new' | 'resolved';
  createdAt: number;
}
