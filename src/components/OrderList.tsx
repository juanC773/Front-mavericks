import React from 'react';
import { Link } from 'react-router-dom';
import { Order } from '../types/Order';
import '../styles/OrderListStyle.css';

interface OrderListProps {
  orders: Order[];
}

const getStateClassName = (state: string): string => {
  const baseClass = 'order-state';
  switch (state.toLowerCase()) {
    case 'pending':
      return `${baseClass} order-state-pending`;
    case 'processing':
      return `${baseClass} order-state-processing`;
    case 'completed':
      return `${baseClass} order-state-completed`;
    case 'cancelled':
      return `${baseClass} order-state-cancelled`;
    default:
      return baseClass;
  }
};

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <div className="orders-list-container">
        <p className="orders-list-empty">
          No hay órdenes disponibles para este usuario.
        </p>
      </div>
    );
  }

  return (
    <div className="orders-list-container">
      <h2 className="orders-list-title">Órdenes</h2>
      <ul className="orders-list">
        {orders.map((order) => (
          <li key={order.id} className="order-item">
            <p>
              <strong>ID:</strong> #{order.id}
            </p>
            <p>
              <strong>Estado:</strong>{' '}
              <span className={getStateClassName(order.state)}>
                {order.state}
              </span>
            </p>
            <p>
              <strong>Fecha:</strong>{' '}
              {new Date(order.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <Link to={`/orders/${order.id}`} className="order-item-link">
              Ver detalles
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;