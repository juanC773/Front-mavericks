// src/types/Order.ts
import { Product } from './Product';

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  priceAtPurchase: number;
  product: Product;
}

export interface Order {
  id: number;
  userId: string;
  date: string;
  state: string;
  description: string;
  orderAddress: string;
  cartItems: CartItem[];
  paymentMethod: {
    id: number;
    name: string;
  };
}
