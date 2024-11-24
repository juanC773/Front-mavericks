import { useState, useEffect } from 'react';
import axios from '../services/axios';
import useAuth from './useAuth';
import { Order } from '../types/Order';

export const useFetchOrders = () => {
  const { isAuthenticated, isLoading, username } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || isLoading || !username) return;

    const fetchOrders = async () => {
        try {
          const response = await axios.get(`/orders/user/${username}`);
          console.log('Response Data:', response.data);
          setOrders(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
          console.error('Error al obtener órdenes:', err);
          setError('Ocurrió un error al cargar las órdenes.');
        } finally {
          setLoading(false);
        }
      };
      

    fetchOrders();
  }, [isAuthenticated, isLoading, username]);

  return { orders, loading, error };
};
