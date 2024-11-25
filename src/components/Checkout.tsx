import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';
import axios from '../services/axios';
import useAuth from '../hooks/useAuth';
import BackButton from './BackButton';
import { PayMethod } from '../types/Order';

const Checkout: React.FC = () => {
  const { username } = useAuth();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [orderAddress, setOrderAddress] = useState('');
  const [payMethodId, setPayMethodId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PayMethod[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get<PayMethod[]>('/paymethods');
        setPaymentMethods(response.data);
      } catch (err) {
        console.log('Error fetching payment methods:', err);
        setError('Error al cargar los métodos de pago.');
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderAddress || payMethodId === null) {
      alert('Por favor complete todos los campos.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const date = new Date();
      date.setHours(date.getHours() - 5);

      const orderData = {
        username: username,
        date: date.toISOString(),
        state: 'PENDING',
        description: 'Nueva orden desde el frontend',
        orderAddress: orderAddress,
        cartItems: cartItems.map((item) => ({
          productId: item.product.idProduct,
          quantity: item.quantity,
        })),
        payMethod: {
          id: payMethodId,
        },
      };

      await axios.post('/orders/add', orderData);

      dispatch(clearCart());

      setTimeout(() => {
        navigate('/order-success');
      }, 500);
    } catch (err) {
      console.error('Error creating order:', err);
      setError('Hubo un error al procesar tu pedido. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="inline-block mt-8 ml-4">
        <BackButton to="/products" label="Volver a Productos" />
      </div>

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
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
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
    </>
  );
};

export default Checkout;
