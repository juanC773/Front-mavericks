// src/axios.ts
import axios from 'axios';
import AuthService from './AuthService';

const instance = axios.create({
  baseURL: 'http://localhost:8080/mavericks',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
  },
  withCredentials: true, // Importante para las cookies
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    // Verifica si hay un nuevo token en los headers
    const newToken = response.headers['authorization'];
    const isTokenRenewed = response.headers['x-token-renewed'];

    if (isTokenRenewed && newToken) {
      // Extrae el token del formato "Bearer token"
      const token = newToken.replace('Bearer ', '');
      AuthService.setToken(token);
    }

    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      AuthService.clearToken();
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // Manejo de acceso denegado
      window.location.href = '/access-denied';
    }
    return Promise.reject(error);
  }
);

export default instance;
