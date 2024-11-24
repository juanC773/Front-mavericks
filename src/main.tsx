import './index.css'; //No borrar, es el root de tailwind
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import './axios.css';

// Importa el CartProvider
import { CartProvider } from './context/CartContext';

// Router
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/Router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CartProvider>
        <RouterProvider router={routes} />
      </CartProvider>
    </PersistGate>
  </Provider>
);
