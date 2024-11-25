import React from 'react';

export interface OrderSummaryProps {
  totalPrice: number;
  totalItems: number;
  orderDate: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ totalPrice, totalItems, orderDate }) => {
  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <p>Order Date: {orderDate}</p>
    </div>
  );
};

export default OrderSummary;
