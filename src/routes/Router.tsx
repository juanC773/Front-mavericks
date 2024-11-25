// routes/Router.tsx
import { createBrowserRouter, createRoutesFromElements, Route, Outlet } from 'react-router-dom';

import FirstPage from '../pages/FirstPage';
import ProductPage from '../pages/ProductPage';
import AddProductPage from '../pages/AddProductPage';
import EditProductPage from '../pages/EditProductPage';
import OrderSuccessPage from '../pages/OrderSuccessPage';
import AuthTestPage from '../pages/AuthTestPage';
import AccessDeniedPage from '../pages/AccessDeniedPage';
import Layout from '../components/Layout';
import Cart from '../components/Cart';
import OrdersPage from '../pages/OrdersPage';
import OrderDetailsPage from '../pages/OrdersDetailPage';
import Checkout from '../components/Checkout';
import ProtectedRoute from '../components/ProtectedRoute';

const BACKEND_LOGIN_URL = 'http://localhost:8080/mavericks/auth/login';

const router = createRoutesFromElements(
  <Route
    element={
      <Layout>
        <Outlet />
      </Layout>
    }
  >
    <Route path="/" element={<FirstPage />} />
    <Route path="/products" element={<ProductPage />} />
    
    {/* Rutas protegidas para admin */}
    <Route
      path="/products/add"
      element={
        <ProtectedRoute requiredRole="ADMIN" loginUrl={BACKEND_LOGIN_URL}>
          <AddProductPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/products/edit/:id"
      element={
        <ProtectedRoute requiredRole="ADMIN" loginUrl={BACKEND_LOGIN_URL}>
          <EditProductPage />
        </ProtectedRoute>
      }
    />
    
    {/* Rutas protegidas para usuarios autenticados */}
    <Route
      path="/cart"
      element={
        <ProtectedRoute loginUrl={BACKEND_LOGIN_URL}>
          <Cart />
        </ProtectedRoute>
      }
    />
    <Route
      path="/checkout"
      element={
        <ProtectedRoute loginUrl={BACKEND_LOGIN_URL}>
          <Checkout />
        </ProtectedRoute>
      }
    />
    <Route path="/order-success" element={<OrderSuccessPage />} />
    <Route path="/auth-test" element={<AuthTestPage />} />
    <Route
      path="/orders"
      element={
        <ProtectedRoute loginUrl={BACKEND_LOGIN_URL}>
          <OrdersPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/orders/:id"
      element={
        <ProtectedRoute loginUrl={BACKEND_LOGIN_URL}>
          <OrderDetailsPage />
        </ProtectedRoute>
      }
    />
    
    {/* Ruta para acceso denegado */}
    <Route path="/access-denied" element={<AccessDeniedPage />} />
  </Route>
);

export const routes = createBrowserRouter(router);