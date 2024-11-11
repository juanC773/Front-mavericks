import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import FirstPage from '../pages/FirstPage';
import ProductPage from '../pages/ProductPage';
import EditProductPage from '../pages/EditProductPage';  // Importar EditProductPage

const router = createRoutesFromElements(
  <>
    <Route path="/" element={<FirstPage />} />
    <Route path="/products" element={<ProductPage />} />  {/* Ruta para ProductPage */}
    <Route path="/products/edit/:id" element={<EditProductPage />} />  {/* Ruta para EditProductPage */}
  </>
);

export const routes = createBrowserRouter(router);
