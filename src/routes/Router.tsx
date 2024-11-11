import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import FirstPage from '../pages/FirstPage';
import ProductPage from '../pages/ProductPage';
import AddProductPage from '../pages/AddProductPage';  // Importar la nueva página
import EditProductPage from '../pages/EditProductPage';

const router = createRoutesFromElements(
  <>
    <Route path="/" element={<FirstPage />} />
    <Route path="/products" element={<ProductPage />} />
    <Route path="/products/add" element={<AddProductPage />} />  {/* Ruta para agregar un producto */}
    <Route path="/products/edit/:id" element={<EditProductPage />} />
  </>
);

export const routes = createBrowserRouter(router);
