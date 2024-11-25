import { useState, useEffect } from 'react';
import axios from '../services/axios';
import useAuth from './useAuth'; // Suponiendo que tienes el hook de autenticación
import { Order } from '../types/Order';

export const useFetchOrders = () => {
  const { isAuthenticated, isLoading, username, roles } = useAuth(); // Obtenemos roles de useAuth
  const isAdmin = roles.includes('ADMIN'); // Verificar si es admin
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || isLoading || !username) return;

    const fetchOrders = async () => {
      try {
        let url = '/orders/user/' + username;

        // Si el usuario es admin, obtiene todas las órdenes
        if (isAdmin) {
          url = '/orders/all'; // El admin obtiene todas las órdenes
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
  }, [isAuthenticated, isLoading, username, roles]); // Dependiendo de roles también

  return { orders, loading, error, isAdmin }; // Devolvemos isAdmin aquí
};
