// pages/OrderSuccessPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccessPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-xl text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Orden Completada!</h1>
        <p className="text-gray-600 mb-6">Tu orden ha sido procesada exitosamente.</p>
        <Link
          to="/products"
          className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition"
        >
          Continuar Comprando
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
