export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  priceAtPurchase: number;
}

export interface PayMethod {
  id: number;
  type: string;
  name: string;
  description: string;
}

export interface Order {
  id: number;
  username: string;
  date: string;
  state: string;
  description: string;
  orderAddress: string;
  cartItems: CartItem[];
  payMethod: PayMethod;
  totalAmount: number;
}
