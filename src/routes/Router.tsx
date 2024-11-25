// routes/Router.tsx
import { createBrowserRouter, createRoutesFromElements, Route, Outlet } from 'react-router-dom';

import FirstPage from '../pages/FirstPage';
import ProductPage from '../pages/ProductPage';
import AddProductPage from '../pages/AddProductPage';
import EditProductPage from '../pages/EditProductPage';
import OrderSuccessPage from '../pages/OrderSuccessPage';
import AuthTestPage from '../pages/AuthTestPage';
import Layout from '../components/Layout';
import Cart from '../components/Cart';
import OrdersPage from '../pages/OrdersPage';
import OrderDetailsPage from '../pages/OrdersDetailPage';
import Checkout from '../components/Checkout';

const router = createRoutesFromElements(
  <Route
    element={
      <Layout>
        <Outlet />
      </Layout>
    }
  >
    <Route path="/" element={<FirstPage />} />
    <Route path="/products" element={<ProductPage />} /> todos
    <Route path="/products/add" element={<AddProductPage />} /> admin
    <Route path="/products/edit/:id" element={<EditProductPage />} /> admin
    <Route path="/cart" element={<Cart />} /> todos
    <Route path="/checkout" element={<Checkout />} /> todos
    <Route path="/order-success" element={<OrderSuccessPage />} /> todos
    <Route path="/auth-test" element={<AuthTestPage />} />
    <Route path="/orders" element={<OrdersPage />} /> todos
    <Route path="/orders/:id" element={<OrderDetailsPage />} /> todos
  </Route>
);

export const routes = createBrowserRouter(router);
