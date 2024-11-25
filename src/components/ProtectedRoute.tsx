// components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'ADMIN' | 'CLIENTE';
  loginUrl?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole,
  loginUrl = 'http://localhost:8080/mavericks/auth/login'
}) => {
  const location = useLocation();
  const { isAuthenticated, hasRole, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    // Redirección al login del backend
    window.location.href = loginUrl;
    return null;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/access-denied" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;