// src/pages/OrderDetailsPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import OrderDetails from '../components/OrderDetails';

const OrderDetailsPage: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();

    return (
        <div>
            <h1>Order Details</h1>
            <OrderDetails orderId={orderId || ''} />
        </div>
    );
};

export default OrderDetailsPage;