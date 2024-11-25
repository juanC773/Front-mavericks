import React from 'react';
import { Link } from 'react-router-dom';

interface BackButtonProps {
  to: string; // Ruta de destino
  label?: string; // Texto del botón (opcional)
}

const BackButton: React.FC<BackButtonProps> = ({ to, label = "Volver" }) => {
  return (
    <Link to={to} className="inline-block mb-8">
      <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-full shadow-lg hover:from-orange-500 hover:to-orange-700 transition-all duration-200 hover:scale-105">
        {label}
      </button>
    </Link>
  );
};

export default BackButton;
