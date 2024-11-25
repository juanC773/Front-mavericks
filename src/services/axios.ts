import axios from 'axios';
import AuthService from './authService';
import { toast } from 'react-toastify';

const BACKEND_LOGIN_URL = 'http://localhost:8080/mavericks/auth/login';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
instance.interceptors.request.use(
  async (config) => {
    const token = AuthService.getToken();
    console.log('Token obtenido:', token);

    if (token && AuthService.isTokenExpiringSoon()) {
      try {
        const response = await axios.post('/auth/refresh', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const newToken = response.data.token;
        AuthService.setToken(newToken);
        console.log('Token renovado:', newToken);
        toast.info('Tu sesión ha sido renovada correctamente.');
      } catch (error) {
        console.error('Error renovando token:', error);
        AuthService.clearToken();
        window.location.href = BACKEND_LOGIN_URL;
        return Promise.reject(error);
      }
    }

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
    // Verificar cookies
    const cookies = document.cookie.split(';');
    let token = null;

    for (const cookie of cookies) {
      console.log('Cookie:', cookie);
      const [name, value] = cookie.trim().split('=');
      if (name === 'token') {
        token = value;
        break;
      }
    }

    if (token) {
      AuthService.setToken(token);
      console.log('Token guardado desde cookie:', token);
    }

    // Verificar token renovado
    const newToken = response.headers['authorization'];
    const isTokenRenewed = response.headers['x-token-renewed'];

    if (isTokenRenewed && newToken) {
      const tokenValue = newToken.replace('Bearer ', '');
      AuthService.setToken(tokenValue);
      console.log('Token renovado guardado:', tokenValue);
      toast.info('Tu sesión ha sido renovada');
    }

    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      console.log('Error 401: Token inválido o expirado');
      AuthService.clearToken();
      toast.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
      window.location.href = BACKEND_LOGIN_URL;
    } else if (error.response?.status === 403) {
      console.log('Error 403: Acceso denegado');
      toast.error('No tienes permisos para realizar esta acción');
      window.location.href = '/access-denied';
    }
    return Promise.reject(error);
  }
);

export default instance;
