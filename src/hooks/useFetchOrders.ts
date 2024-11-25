import { useState, useEffect } from 'react';
import axios from '../services/axios';
import useAuth from './useAuth';
import { Order } from '../types/Order';

export const useFetchOrders = () => {
  const { isAuthenticated, isLoading, username, roles } = useAuth();
  const isAdmin = roles.includes('ADMIN');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || isLoading || !username) return;

    const fetchOrders = async () => {
      try {
        let url = '/orders/user/' + username;

        if (isAdmin) {
          url = '/orders/all';
        }

        const response = await axios.get(url);
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
  }, [isAuthenticated, isAdmin, isLoading, username, roles]);

  return { orders, loading, error, isAdmin };
};
