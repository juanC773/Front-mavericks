
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import FirstPage from '../pages/FirstPage';
import ProductPage from '../pages/ProductPage';  // Importar ProductPage




const router = createRoutesFromElements(
  
  <>
    <Route path="/" element={<FirstPage />} />
    <Route path="/products" element={<ProductPage />} />  {/* Ruta para ProductPage */}
  </>
  

  
);




export const routes = createBrowserRouter(router);

