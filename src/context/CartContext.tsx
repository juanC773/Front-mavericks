import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from '../services/axios';
import { Product } from '../types/Product';

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

interface Cart {
  id: number;
  items: CartItem[];
}

interface CartContextProps {
  cart: Cart | null;
  fetchCart: (cartId: number) => Promise<void>;
  addItemToCart: (cartId: number, product: Product, quantity: number) => Promise<void>;
  removeItemFromCart: (cartId: number, productId: number) => Promise<void>;
  clearCart: (cartId: number) => Promise<void>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);

  const fetchCart = async (cartId: number) => {
    try {
      const response = await axios.get(`/api/carts/${cartId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error al obtener el carrito', error);
    }
  };

  const createCart = async () => {
    try {
      const response = await axios.post(`/api/carts`);
      setCart(response.data);
    } catch (error) {
      console.error('Error al crear el carrito', error);
    }
  };

  const addItemToCart = async (cartId: number, product: Product, quantity: number) => {
    try {
      await axios.post(`/api/carts/${cartId}/add`, product, { params: { quantity } });
      await fetchCart(cartId); // Refresca el carrito después de agregar el producto
    } catch (error) {
      console.error('Error al agregar el producto al carrito', error);
    }
  };

  const removeItemFromCart = async (cartId: number, productId: number) => {
    try {
      await axios.delete(`/api/carts/${cartId}/remove/${productId}`);
      await fetchCart(cartId);
    } catch (error) {
      console.error('Error al eliminar el producto del carrito', error);
    }
  };

  const clearCart = async (cartId: number) => {
    try {
      await axios.delete(`/api/carts/${cartId}`);
      setCart(null);
    } catch (error) {
      console.error('Error al vaciar el carrito', error);
    }
  };

  useEffect(() => {
    if (!cart) {
      createCart();
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, fetchCart, addItemToCart, removeItemFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
