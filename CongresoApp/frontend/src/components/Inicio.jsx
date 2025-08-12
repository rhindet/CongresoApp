import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../public/assets/logo_congreso_33.svg';
import cintillaLogos from '../../public/assets/cintilla.png';
import fondo from '../../public/assets/fondoFacultad.png';

function Inicio() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-[#DCDCDE] bg-no-repeat bg-bottom bg-cover relative overflow-hidden px-4 md:px-10 py-8"
      style={isMobile ? { backgroundImage: `url(${fondo})` } : {}}
    >
      {/* Contenedor principal - horizontal en desktop */}
      <div className="flex flex-col md:flex-row items-center md:justify-center gap-20 flex-1">

        {/* Logo Congreso */}
        <div className="flex justify-center md:justify-end w-full md:w-1/2">
          <img
            src={logo}
            alt="Logo Congreso"
            className="w-full max-w-xl sm:max-w-sm md:max-w-lg"
          />
        </div>

        {/* Contenido central */}
        <div className="flex flex-col items-center gap-18 text-center md:w-1/2">
          <p className="text-firstblue text-2xl md:text-3xl font-bold">
            9-10 de <span className="underline decoration-secondyellow decoration-4 underline-offset-7">Octubre</span> 2025
          </p>

          <Link
            to="/home"
            className="bg-secondyellow text-firstblue px-6 py-3 rounded-full font-bold w-40 text-center hover:bg-firstyellow transition-all duration-300 mt-10"
          >
            Bienvenido
          </Link>
        </div>
      </div>

      {/* Footer con cinta de logos */}
      <footer className="w-full py-2 px-3 flex justify-center">
        <img
          src={cintillaLogos}
          alt="Logos institucionales"
          className="h-10 object-contain"
        />
      </footer>
    </div>
  );
}

export default Inicio;
