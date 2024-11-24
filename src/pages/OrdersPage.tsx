import React from 'react';
import { useFetchOrders } from '../hooks/useFetchOrders';
import OrderList from '../components/OrderList';

const OrdersPage = () => {
  const { orders, loading, error } = useFetchOrders();

  if (loading) return <p>Cargando órdenes...</p>;
  if (error) return <p>Error al cargar órdenes: {error}</p>;

  return (
    <div>
      <h1>Mis Órdenes</h1>
      <OrderList orders={orders} />
    </div>
  );
};

export default OrdersPage;
