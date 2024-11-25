// pages/AccessDeniedPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home } from 'lucide-react';

const AccessDeniedPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Acceso Denegado</h1>
        <p className="text-gray-600 mb-6">
          No tienes permisos para acceder a esta página.
        </p>
        <div className="space-x-4">
          <Link 
            to="/products"
            className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-full
                     hover:bg-orange-600 transition-colors duration-200"
          >
            <Home className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedPage;