import React from 'react';
import { Link } from 'react-router-dom';
import { Order } from '../types/Order';

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  if (orders.length === 0) {
    return <p>No hay órdenes disponibles para este usuario.</p>;
  }

  return (
    <div>
      <h2>Órdenes</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p><strong>ID:</strong> {order.id}</p>
            <p><strong>Estado:</strong> {order.state}</p>
            <p><strong>Fecha:</strong> {new Date(order.date).toLocaleString()}</p>
            <Link to={`/orders/${order.id}`}>Ver detalles</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
