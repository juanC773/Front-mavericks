import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addItem, removeItem, clearCart } from '../store/cartSlice';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return <p className="text-center text-gray-500 text-lg">El carrito está vacío.</p>;
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Carrito de Compras</h2>

      <ul className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <li key={item.product.idProduct} className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <img
                src={
                  item.product.image ||
                  'https://ih1.redbubble.net/image.4252685049.9677/pp,504x498-pad,600x600,f8f8f8.jpg'
                }
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-md shadow-sm"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                <p className="text-gray-600">
                  ${item.product.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => dispatch(addItem({ product: item.product, quantity: 1 }))}
                className="px-2 py-1 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600 transition"
              >
                +
              </button>
              <button
                onClick={() =>
                  item.product.idProduct ? 
                  item.quantity > 1
                  ? dispatch(addItem({ product: item.product, quantity: -1 }))
                  : dispatch(removeItem(item.product.idProduct))
                  :
                  console.log('Item no existe')
                }
                className="px-2 py-1 bg-yellow-500 text-white font-semibold rounded shadow hover:bg-yellow-600 transition"
              >
                -
              </button>
              <button
                onClick={() => 
                  item.product.idProduct ? dispatch(removeItem(item.product.idProduct)) :
                  console.log('Item no existe')
                }
                className="px-2 py-1 bg-red-500 text-white font-semibold rounded shadow hover:bg-red-600 transition"
              >
                Quitar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total:</span>
          <span className="text-gray-800">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => dispatch(clearCart())}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 transition"
        >
          Vaciar Carrito
        </button>
      </div>
    </div>
  );
};

export default Cart;
