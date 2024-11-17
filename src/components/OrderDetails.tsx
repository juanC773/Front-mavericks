// src/components/OrderDetails.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderItem from './OrderItem';
import OrderSummary from './OrderSummary';
import { Order } from '../types/Order';

const OrderDetails: React.FC<{ orderId: string }> = ({ orderId }) => {
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`/api/orders/${orderId}`);
                setOrder(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!order) {
        return <div>No order found.</div>;
    }

    return (
        <div>
            <h2>Order Details</h2>
            <div>
                {order.items.map(item => (
                    <OrderItem key={item.id} item={item} />
                ))}
            </div>
            <OrderSummary 
                totalPrice={order.totalPrice} 
                totalItems={order.totalItems} 
                orderDate={order.orderDate} 
            />
        </div>
    );
};

export default OrderDetails;