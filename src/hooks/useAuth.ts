// hooks/useAuth.ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

interface UseAuthOptions {
  requiredRole?: 'ADMIN' | 'CLIENTE';
}

const useAuth = ({ requiredRole }: UseAuthOptions = {}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    if (requiredRole) {
      const roles = AuthService.getUserRoles();
      if (!roles.includes(requiredRole)) {
        navigate('/access-denied');
      }
    }
  }, [navigate, requiredRole]);

  return {
    isAuthenticated: AuthService.isAuthenticated(),
    isAdmin: AuthService.isAdmin(),
    roles: AuthService.getUserRoles(),
  };
};

export default useAuth;
