//Tailwind
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './components/navbar';
import ProductPage from './pages/ProductPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

  <NavBar />  
  <ProductPage />


  </React.StrictMode>
);

