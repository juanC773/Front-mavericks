import { OrderItem } from "./OrderItem";

export interface Order {
    id: string;
    items: OrderItem[];
    totalPrice: number;
    totalItems: number;
    orderDate: string;
}