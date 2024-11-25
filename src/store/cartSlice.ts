// src/store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.product.idProduct === product.idProduct);

      if (existingItem) {
        const totalQuantity = existingItem.quantity + quantity;
        if (totalQuantity > product.stock) {
          console.warn('Cannot add more items than available in stock');
          return;
        }
        existingItem.quantity = totalQuantity;
      } else {
        if (quantity > product.stock) {
          console.warn('Cannot add more items than available in stock');
          return;
        }
        state.items.push({ product, quantity });
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.product.idProduct !== productId);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
