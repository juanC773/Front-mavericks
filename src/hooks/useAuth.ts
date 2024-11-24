// hooks/useAuth.ts
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';

interface UseAuthOptions {
  requiredRole?: 'ADMIN' | 'CLIENTE';
  redirectTo?: string;
  requiredAuth?: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  roles: string[];
  username: string | null;
  isLoading: boolean;
  hasPermission: boolean;
}

const useAuth = ({ requiredRole, redirectTo = '/login' }: UseAuthOptions = {}) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false,
    roles: [],
    username: null,
    isLoading: true,
    hasPermission: false,
  });

  // Verificar autenticación y permisos
  const checkAuth = useCallback(() => {
    const isAuthenticated = AuthService.isAuthenticated();
    const roles = AuthService.getUserRoles();
    const isAdmin = AuthService.isAdmin();
    const username = AuthService.getUsername();
    let hasPermission = true;

    if (!isAuthenticated) {
      console.log('Usuario no autenticado, redirigiendo a:', redirectTo);
      navigate(redirectTo);
      hasPermission = false;
    } else if (requiredRole && !roles.includes(requiredRole)) {
      console.log(`Usuario no tiene el rol requerido: ${requiredRole}`);
      navigate('/access-denied');
      hasPermission = false;
    }

    setAuthState({
      isAuthenticated,
      isAdmin,
      roles,
      username,
      isLoading: false,
      hasPermission,
    });
  }, [navigate, redirectTo, requiredRole]);

  // Verificar al montar y cuando cambien las dependencias
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Verificar token cercano a expirar
  useEffect(() => {
    const checkTokenExpiration = () => {
      if (AuthService.isTokenExpiringSoon()) {
        console.log('Token cercano a expirar');
        // Aquí podría implementar la lógica para renovar el token
        // o mostrar una advertencia al usuario
      }
    };

    const interval = setInterval(checkTokenExpiration, 60000); // Verificar cada minuto
    return () => clearInterval(interval);
  }, []);

  // Métodos de utilidad para verificar permisos
  const hasRole = useCallback(
    (role: string) => {
      return authState.roles.includes(role);
    },
    [authState.roles]
  );

  const canAccess = useCallback(
    (requiredRoles: string[]) => {
      return requiredRoles.some((role) => authState.roles.includes(role));
    },
    [authState.roles]
  );

  const shouldRender = useCallback(
    (requiredRole?: string) => {
      if (!authState.isAuthenticated) return false;
      if (!requiredRole) return true;
      return authState.roles.includes(requiredRole);
    },
    [authState.isAuthenticated, authState.roles]
  );

  return {
    ...authState,
    checkAuth,
    hasRole,
    canAccess,
    shouldRender,
  };
};

export default useAuth;
