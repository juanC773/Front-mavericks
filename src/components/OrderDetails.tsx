import React from 'react';
import { Order } from '../types/Order';

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div>
      <h2>Detalles de la Orden</h2>
      <p><strong>ID:</strong> {order.id}</p>
      <p><strong>Usuario:</strong> {order.username}</p>
      <p><strong>Estado:</strong> {order.state}</p>
      <p>
        <strong>Fecha:</strong> {order.date ? new Date(order.date).toLocaleString() : 'No disponible'}
      </p>
      <p><strong>Dirección:</strong> {order.orderAddress || 'No disponible'}</p>
      <p>
        <strong>Método de Pago:</strong>{' '}
        {order.payMethod ? `${order.payMethod.name} (${order.payMethod.type})` : 'No disponible'}
      </p>
      <p>
        <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
      </p>

      <h3>Artículos en el carrito:</h3>
      <ul>
        {order.cartItems.map((item) => (
          <li key={item.id}>
            <p><strong>Producto ID:</strong> {item.productId}</p>
            <p><strong>Cantidad:</strong> {item.quantity}</p>
            <p><strong>Precio:</strong> ${item.priceAtPurchase.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
