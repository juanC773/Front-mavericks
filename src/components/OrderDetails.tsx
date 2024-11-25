import React from 'react';
import { Order } from '../types/Order';
import ProductDetails from './ProductDetails';
import '../styles/OrderDetailsStyle.css';

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
    const getStateClassName = (state: string): string => {
      const baseClass = 'order-state-badge';
      switch (state.toLowerCase()) {
        case 'pending': return `${baseClass} order-state-pending`;
        case 'processing': return `${baseClass} order-state-processing`;
        case 'completed': return `${baseClass} order-state-completed`;
        case 'cancelled': return `${baseClass} order-state-cancelled`;
        default: return baseClass;
      }
    };
  
    return (
      <div className="order-details-container">
        <h2 className="order-details-header">Detalles de la Orden</h2>
        
        <div className="order-info-grid">
          <div className="info-item">
            <strong>ID</strong>
            <span>#{order.id}</span>
          </div>
          <div className="info-item">
            <strong>Estado</strong>
            <span className={getStateClassName(order.state)}>{order.state}</span>
          </div>
          <div className="info-item">
            <strong>Fecha</strong>
            <span>
              {order.date 
                ? new Date(order.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : 'No disponible'}
            </span>
          </div>
          <div className="info-item">
            <strong>Dirección</strong>
            <span>{order.orderAddress}</span>
          </div>
          <div className="info-item">
            <strong>Método de Pago</strong>
            <span>
              {order.payMethod 
                ? `${order.payMethod.name} (${order.payMethod.type})`
                : 'No disponible'}
            </span>
          </div>
          <div className="info-item">
            <strong>Total</strong>
            <span className="product-price">${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
  
        <div className="cart-items-section">
          <h3 className="cart-items-title">Artículos en el carrito</h3>
          <ul className="cart-items-list">
            {order.cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <span className="cart-item-quantity">
                  Cantidad: {item.quantity}
                </span>
                <ProductDetails productId={item.productId} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

export default OrderDetails;
