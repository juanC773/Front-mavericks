import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer_container box-border grid grid-cols-3 grid-rows-2 gap-40 mt-32">
        <div className="contact-info">
          <h3 className="ml-10">Contacto</h3>
          <p>Teléfono: +57 315 ****</p>
          <p>Email: contacto@panaderia.com</p>
        </div>
        <div className="contact-info mb-4 w-96">
          <h3 className="place_title">Nuestra sede</h3>
          <p>Centro Comercial Jardín Plaza / Local LN 06</p>
        </div>
        <div className="atention">
          <h3 className="atention_title">Horario de atención</h3>
          <p className="text-center">Lunes a viernes de 7 am - 7pm</p>
          <p className="text-center">Sábados y domingos no laborables</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
