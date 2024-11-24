import React from 'react';
import { useFetchOrders } from '../hooks/useFetchOrders';
import OrderList from '../components/OrderList';
import '../styles/OrdersPageStyle.css';

const OrdersPage = () => {
  const { orders, loading, error } = useFetchOrders();

  if (loading) {
    return (
      <div className="orders-page-container">
        <div className="orders-loading">
          <p>Cargando órdenes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page-container">
        <div className="orders-error">
          <p>Error al cargar órdenes: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page-container">
      <div className="orders-content">
        <div className="orders-card">
          <h1 className="orders-title">Mis Órdenes</h1>
          <div className="orders-list">
            <OrderList orders={orders} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;