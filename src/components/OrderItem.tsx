// src/components/OrderItem.tsx
import React from 'react';
import { OrderItem as OrderItemType } from '../types/OrderItem';

const OrderItem: React.FC<{ item: OrderItemType }> = ({ item }) => {
    return (
        <div className="order-item">
            <h3>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
        </div>
    );
};

export default OrderItem;