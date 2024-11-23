import React from 'react';
import pan1 from '../img/pan_1_fondo.png';
import pan2 from '../img/pan_2_fondo.png';

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#FAF9F6] min-h-[650px] flex items-center justify-center">
      {/* Background images */}
      <div
        className="absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: `url(${pan1}), url(${pan2})`,
          backgroundPosition: 'left bottom, right bottom',
          backgroundSize: '450px 300px, 450px 300px',
        }}
      />

      {/* Content container */}
      <div className="relative w-full max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mx-16">
          {/* Contact Info */}
          <div className="text-gray-800">
            <h3 className="text-4xl text-[#4A221A] mb-6">Contacto</h3>
            <p className="mb-2">Teléfono: +57 315 ****</p>
            <p>Email: contacto@panaderia.com</p>
          </div>

          {/* Location */}
          <div className="text-gray-800">
            <h3 className="text-4xl text-[#4A221A] mb-6">Nuestra sede</h3>
            <p>Centro Comercial Jardín Plaza / Local LN 06</p>
          </div>

          {/* Business Hours */}
          <div className="text-gray-800">
            <h3 className="text-4xl text-[#4A221A] mb-6">Horario de atención</h3>
            <p className="mb-2">Lunes a viernes de 7 am - 7pm</p>
            <p>Sábados y domingos no laborables</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
