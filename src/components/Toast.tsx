import React, { useEffect, useState } from 'react';
import '../styles/ToastModalStyle.css';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  duration = 3000,
  onClose
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 300); // Duración de la animación de salida
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`toast-container toast-${type}`}
      style={isExiting ? { animation: 'fadeOut 0.3s ease-out forwards' } : {}}
      role="alert"
    >
      <p className="toast-message">{message}</p>
    </div>
  );
};

export default Toast;
