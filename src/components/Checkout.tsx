import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';
import axios from '../services/axios';

const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [orderAddress, setOrderAddress] = useState('');
  const [payMethodId, setPayMethodId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validar que el carrito no esté vacío
  if (cartItems.length === 0) {
    navigate('/cart'); // Redirigir a carrito si está vacío
    return null;
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderAddress || payMethodId === null) {
      alert('Por favor complete todos los campos.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData = {
        username: 'cliente', 
        date: new Date().toISOString(),
        state: 'PENDING',
        description: 'Nueva orden desde el frontend',
        orderAddress: orderAddress,
        cartItems: cartItems.map(item => ({
          productId: item.product.idProduct,
          quantity: item.quantity,
        })),
        payMethod: {
          id: payMethodId,
        },
      };

      await axios.post('/orders/add', orderData);

      // Vaciar carrito después de crear la orden
      dispatch(clearCart());

      // Redirigir a la página de éxito
      setTimeout(() => {
        navigate('/order-success');
      }, 500); // Puede agregar un pequeño retraso para que la navegación ocurra después del renderizado
    } catch (err) {
      setError('Hubo un error al procesar tu pedido. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h2>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Dirección:</label>
          <input
            type="text"
            value={orderAddress}
            onChange={(e) => setOrderAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Método de Pago:</label>
          <select
            value={payMethodId || ''}
            onChange={(e) => setPayMethodId(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="">Seleccione un método de pago</option>
            {/* Aquí puedes mapear los métodos de pago si los tienes disponibles */}
            <option value={1}>Tarjeta de Crédito</option>
            <option value={2}>Paypal</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Confirmar Pedido'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
