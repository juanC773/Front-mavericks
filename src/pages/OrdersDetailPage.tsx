import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/axios';
import { Order } from '../types/Order';
import OrderDetails from '../components/OrderDetails';

const OrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('No se proporcionó un ID de orden.');
      setLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/orders/${id}`);
        setOrder(response.data);
      } catch (err) {
        console.error('Error al cargar los detalles de la orden:', err);
        setError('Ocurrió un error al cargar los detalles de la orden.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  return (
    <div className="details-page-container">
      <div className="details-page-content">
        {loading && <div className="loading-state">Cargando detalles de la orden...</div>}
        {error && <div className="error-state">Error: {error}</div>}
        {!loading && !error && !order && (
          <div className="error-state">No se encontraron detalles para esta orden.</div>
        )}
        {order && <OrderDetails order={order} />}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
