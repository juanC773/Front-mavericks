import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types/Product';

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addItemToCart: (product: Product, quantity: number) => void;
  removeItemFromCart: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addItemToCart = (product: Product, quantity: number) => {
    console.log('Adding to cart:', cart);
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.idProduct === product.idProduct
      );

      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        console.log('Updated cart:', updatedCart);
        return updatedCart;
      } else {
        const newCart = [...prevCart, { id: Date.now(), product, quantity }];
        console.log('New cart:', newCart);
        return newCart;
      }
    });
  };

  const removeItemFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.idProduct !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, clearCart }}>
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
