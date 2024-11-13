import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/navbar.css';

function NavBar() {
  const { cart } = useCart();

  // Calcular la cantidad total de artículos en el carrito usando `cart.items`
  const totalItems = cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <nav className="nav_i py-5 box-border">
      <div className="container box-border mx-auto flex items-center justify-between">
        {/* Menú izquierdo */}
        <div className="flex space-x-10">
          <a className="init text-lg" href="#Iniciar sesión">Inicio</a>
          <a className="order text-lg" href="#Hacer pedido">Hacer pedido</a>
          <a className="contact text-lg" href="#contacto">Contacto</a>
        </div>

        {/* Logo */}
        <div>
          <img className="w-48" src="/img/logo_2.png" alt="Logo" />
        </div>

        {/* Menú derecho */}
        <div className="flex items-center space-x-10">
          {/* Icono de Carrito con contador */}
          <Link to="/cart" className="text-lg flex items-center relative">
            <img src="/img/carrito_compras.png" alt="Carrito" className="w-8 h-8" />
            {totalItems > 0 && (
              <span className="cart-count">{totalItems}</span>
            )}
          </Link>
          <a className="init text-lg" href="#Iniciar_sesion">Iniciar sesión</a>
          <a className="register text-lg" href="#Registrarse">Registrarse</a>

          {/* Menú de usuario */}
          <div className="relative">
            <img id="user-menu-toggle" className="w-20 rounded-full cursor-pointer" src="https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png" alt="perfil" />
            <div id="user-menu" className="dropdown-menu absolute left-0 mt-2 bg-white shadow-lg rounded-lg text-gray-700 hidden">
              <a href="#info" className="block px-4 py-2 hover:bg-gray-200">Información</a>
              <a href="#logout" className="block px-4 py-2 hover:bg-gray-200">Cerrar sesión</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
