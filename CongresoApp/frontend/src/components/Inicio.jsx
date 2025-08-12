import { Link } from 'react-router-dom';
import logo from '../../public/assets/logo_congreso_33.svg';
import cintillaLogos from '../../public/assets/cintilla.png';
import fondo from '../../public/assets/fondoFacultad.png';

function Inicio() {
  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-[#DCDCDE] bg-no-repeat bg-bottom bg-cover relative overflow-hidden px-4 md:px-10 py-8"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      {/* Contenedor principal horizontal en desktop */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-70 md:gap-24 md:mt-16 flex-1">
        
        {/* Logo Congreso */}
        <div className="flex justify-center md:justify-end w-full md:w-auto">
          <img
            src={logo}
            alt="Logo Congreso"
            className="w-full max-w-xl sm:max-w-sm md:max-w-lg"
          />
        </div>

        {/* Contenido central */}
        <div className="flex flex-col items-center gap-18 text-center">
          <p className="text-firstblue text-2xl md:text-3xl font-bold">
            9-10 de <span className="underline decoration-secondyellow decoration-4 underline-offset-4">Octubre</span> 2025
          </p>

          <Link
            to="/home"
            className="bg-firstblue text-white px-6 py-3 rounded-full font-medium w-40 text-center hover:bg-thirdblue transition-all duration-300"
          >
            Bienvenido
          </Link>
        </div>
      </div>

      {/* Footer con cinta de logos */}
      <footer className="w-full py-4 px-3 flex justify-center ">
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
