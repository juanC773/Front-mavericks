// src/components/CheckoutForm.tsx
import React, { useState } from 'react';

interface CheckoutFormProps {
  onSubmit: (address: string, payMethodId: number) => Promise<void>;
  loading: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, loading }) => {
  const [address, setAddress] = useState('');
  const [payMethodId] = useState<number>(1); // Por ahora usamos un valor fijo

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(address, payMethodId);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Dirección de entrega</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Procesando...' : 'Confirmar Orden'}
      </button>
    </form>
  );
};

export default CheckoutForm;
