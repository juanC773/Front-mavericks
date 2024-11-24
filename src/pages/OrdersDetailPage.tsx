import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/axios';
import { Order } from '../types/Order';
import useAuth from '../hooks/useAuth';
import OrderDetails from '../components/OrderDetails';

const OrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { username } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setError('No se pudo determinar el username del usuario.');
      setLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/orders/user/${username}`);
        const orders = Array.isArray(response.data) ? response.data : [];
        const selectedOrder = orders.find((order) => order.id === parseInt(id || '', 10));
        if (selectedOrder) {
          setOrder(selectedOrder);
        } else {
          setError('No se encontró la orden solicitada.');
        }
      } catch (err) {
        setError('Ocurrió un error al cargar los detalles de la orden.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, username]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!order) return <p>No se encontraron detalles para esta orden.</p>;

  return <OrderDetails order={order} />;
};

export default OrderDetailsPage;
