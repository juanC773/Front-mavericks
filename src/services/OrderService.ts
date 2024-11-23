// src/services/OrderService.ts
import instance from './axios';
import { CartItem } from '../types/Order'; // Crear este tipo primero

// Definimos los tipos
interface CartItemDTO {
  productId: number;
  quantity: number;
  priceAtPurchase: number;
}

export interface CreateOrderDTO {
  userId: string;
  items: CartItemDTO[];
  orderAddress: string;
  payMethodId: number;
}

export interface OrderResponse {
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

// El servicio
const OrderService = {
  createOrder: async (orderData: CreateOrderDTO): Promise<OrderResponse> => {
    try {
      const response = await instance.post<OrderResponse>('/orders/add', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  getOrderById: async (id: number): Promise<OrderResponse> => {
    try {
      const response = await instance.get<OrderResponse>(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  getUserOrders: async (userId: string): Promise<OrderResponse[]> => {
    try {
      const response = await instance.get<OrderResponse[]>(`/orders/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  },
};

export default OrderService;
