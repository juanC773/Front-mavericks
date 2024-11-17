// routes/Router.tsx
import { createBrowserRouter, createRoutesFromElements, Route, Outlet } from 'react-router-dom';

import FirstPage from '../pages/FirstPage';
import ProductPage from '../pages/ProductPage';
import AddProductPage from '../pages/AddProductPage';
import EditProductPage from '../pages/EditProductPage';
import Layout from '../components/Layout';
import Cart from '../components/Cart';
import OrderDetailsPage from '../pages/OrderDetailsPage';

const router = createRoutesFromElements(
    <Route element={<Layout><Outlet /></Layout>}>
        <Route path="/" element={<FirstPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/add" element={<AddProductPage />} />
        <Route path="/products/edit/:id" element={<EditProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
    </Route>
);
export const routes = createBrowserRouter(router);