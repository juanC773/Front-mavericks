import React from 'react';
import '../styles/ToastModalStyle.css';
import { useEffect } from 'react';

interface ConfirmationModalProps {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
  }
  
  const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    title = 'Confirmar acción',
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    onConfirm,
    onCancel
  }) => {
    // Cerrar modal con la tecla Escape
    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onCancel();
        }
      };
  
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [onCancel]);
  
    // Prevenir scroll del body
    useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, []);
  
    return (
      <div 
        className="modal-overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) onCancel();
        }}
      >
        <div className="modal" role="dialog" aria-modal="true">
          <h3 className="modal-title">{title}</h3>
          <p className="modal-message">{message}</p>
          <div className="modal-buttons">
            <button
              className="modal-button button-confirm"
              onClick={onConfirm}
              autoFocus
            >
              {confirmText}
            </button>
            <button
              className="modal-button button-cancel"
              onClick={onCancel}
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmationModal;
