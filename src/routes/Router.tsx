
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import FirstPage from '../pages/FirstPage';




const router = createRoutesFromElements(
  <Route path="/" element={<FirstPage />} 
  
  />

  
);




export const routes = createBrowserRouter(router);

