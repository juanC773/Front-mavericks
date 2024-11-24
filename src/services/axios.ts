// src/axios.ts
import axios from 'axios';
import AuthService from './authService';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Aquí usamos la variable de entorno que es la url del back
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    console.log('Token obtenido:', token);
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
    // Intentar obtener el token de la cookie
    const cookies = document.cookie.split(';');
    let token = null;

    // Buscar la cookie 'token'
    for (const cookie of cookies) {
      console.log('Cookie:', cookie);
      const [name, value] = cookie.trim().split('=');
      if (name === 'token') {
        token = value;
        break;
      }
    }

    // Si encontramos el token en la cookie, guardarlo en localStorage
    if (token) {
      AuthService.setToken(token);
      console.log('Token guardado en localStorage desde cookie');
    }

    // También verificar si hay token renovado en los headers
    const newToken = response.headers['authorization'];
    const isTokenRenewed = response.headers['x-token-renewed'];

    if (isTokenRenewed && newToken) {
      const tokenValue = newToken.replace('Bearer ', '');
      AuthService.setToken(tokenValue);
      console.log('Token renovado guardado en localStorage');
    }

    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      AuthService.clearToken();
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      window.location.href = '/access-denied';
    }
    return Promise.reject(error);
  }
);

export default instance;