import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart, CartItem } from '../store/cartSlice';
import OrderService from '../services/OrderService';

export const useCheckout = (cartItems: CartItem[], userId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckout = async (orderAddress: string, payMethodId: number) => {
    try {
      setLoading(true);
      const orderData = {
        userId,
        items: cartItems.map((item) => ({
          productId: item.product.idProduct!,
          quantity: item.quantity,
          priceAtPurchase: item.product.price,
        })),
        orderAddress,
        payMethodId,
      };

      await OrderService.createOrder(orderData);
      dispatch(clearCart());
      navigate('/order-success');
    } catch (err) {
      setError('Error al procesar la orden');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { handleCheckout, loading, error };
};
