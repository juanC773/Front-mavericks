import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Order } from '../types/Order';
import ConfirmationModal from './ConfirmationModal';
import '../styles/OrderListStyle.css';
import axios from '../services/axios';
import Toast from './Toast';

interface OrderListProps {
  orders: Order[];
  isAdmin: boolean;
}

const getStateClassName = (state: string): string => {
  const baseClass = 'order-state';
  switch (state.toLowerCase()) {
    case 'pending':
      return `${baseClass} order-state-pending`;
    case 'traveling':
      return `${baseClass} order-state-traveling`;
    case 'delivered':
      return `${baseClass} order-state-delivered`;
    default:
      return baseClass;
  }
};

const OrderList: React.FC<OrderListProps> = ({ orders, isAdmin }) => {
  const [showModal, setShowModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;

    try {
      const response = await axios.delete(`/orders/delete/${orderToDelete}`);

      if (response.status === 200) {
        setToastMessage('Pedido eliminado con éxito.');
        setShowModal(false);
      } else {
        setToastMessage('Hubo un error al eliminar el pedido.');
      }
    } catch (error) {
      setToastMessage('Error al eliminar el pedido.');
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setOrderToDelete(null);
  };

  const handleUpdateOrderState = async (orderId: number, newState: string) => {
    try {
      const response = await axios.put(`/orders/update/state/${orderId}`, {
        state: newState, // Estructura compatible con el backend
      });
  
      if (response.status === 200) {
        setToastMessage('Estado de la orden actualizado con éxito.');
        // Opcional: Actualizar el estado localmente o recargar la lista
      } else {
        setToastMessage('Error al actualizar el estado de la orden.');
      }
    } catch (error) {
      console.error(error);
      setToastMessage('Error al actualizar el estado de la orden.');
    }
  };
  

  if (orders.length === 0) {
    return (
      <div className="orders-list-container">
        <p className="orders-list-empty">No hay órdenes disponibles para este usuario.</p>
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
              <span className={getStateClassName(order.state)}>{order.state}</span>
            </p>
            <p>
              <strong>Fecha:</strong>{' '}
              {new Date(order.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            
            <>
              {isAdmin && (
              <>
                <p>
                  <strong>Usuario:</strong> {order.username}
                </p>
              </>
              )}
              <div className="order-actions">
                <Link to={`/orders/${order.id}`} className="order-item-link">
                  Ver detalles
                </Link>
                {isAdmin && (
                <>
                  <select
                    className="order-state-dropdown"
                    value={order.state}
                    onChange={(e) => handleUpdateOrderState(order.id, e.target.value)}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="TRAVELING">TRAVELING</option>
                    <option value="DELIVERED">DELIVERED</option>
                  </select>
                </>
                )}
              </div>
            </>
            {isAdmin && (
            <>
              <button
                className="order-delete-button"
                onClick={() => {
                setOrderToDelete(order.id);
                setShowModal(true);
                }}>
                Eliminar
              </button>
            </>
            )}
          </li>
        ))}
      </ul>

      {showModal && (
        <ConfirmationModal
          message="¿Estás seguro de que deseas eliminar este pedido?"
          onConfirm={handleDeleteOrder}
          onCancel={handleCancelDelete}
        />
      )}

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  );
};

export default OrderList;
