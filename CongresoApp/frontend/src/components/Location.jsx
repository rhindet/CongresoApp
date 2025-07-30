import { useEffect, useState } from 'react';
import HeaderDesktop from '../modules/HeaderDesktop';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import planoMapa from '../../public/assets/Plano_Centro_de_Convenciones_1 (ZONACONGRESO).png';
import logoPrincipal from '../../public/assets/logo_congreso_33.svg';
import logoCintermex from '../../public/assets/LogoCintermex.png';

function Location() {
  const [isPortrait, setIsPortrait] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  //DETECTAR ORIENTACION Y SI ES MOVIL
  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);

    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  // Ocultar navbar al hacer scroll hacia abajo
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY <= lastScrollY);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {isPortrait && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col justify-center items-center text-white text-center px-6">
          <HeaderDesktop backLink="/home" />
          <p className="text-xl mb-4 font-semibold mt-16">
            Para ver mejor el mapa, gira tu celular
          </p>
          <div className="animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-firstyellow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582a2 2 0 011.414.586l1.79 1.79a2 2 0 002.828 0l2.828-2.828a2 2 0 012.828 0l2.828 2.828a2 2 0 002.828 0l1.79-1.79A2 2 0 0120.418 9H21V4H4z"
              />
            </svg>
          </div>
        </div>
      )}

      {/* NAVBAR con animación */}
      <div
        className={`fixed top-0 left-0 right-0 z-10 bg-fondo transition-transform duration-300 ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-6 max-w-7xl mx-auto w-full">
          <HeaderDesktop backLink="/home" />
          <h1 className="text-3xl font-bold text-secondblue text-center flex-1 mr-8">
            Mapa del Congreso
          </h1>
        </div>
      </div>
      

      {/* CONTENIDO */}
      <main className="pt-24 pb-10 px-4 flex-grow flex flex-col items-center w-full">
        <div className="bg-white p-4 rounded-xl shadow-xl max-w-6xl w-full">
          <TransformWrapper initialScale={1} minScale={0.5} maxScale={4} wheel={{ step: 0.1 }}>
            <TransformComponent>
              <img
                src={planoMapa}
                alt="Mapa del Congreso"
                className="w-full h-auto object-contain"
              />
            </TransformComponent>
          </TransformWrapper>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-4 px-6 flex justify-between items-center w-full border-t border-gray-300">
        <img
          src={logoPrincipal}
          alt="Logo Principal"
          className="h-12 object-contain"

        />
        <img
          src={logoCintermex}
          alt="Logo Cintermex"
          className="h-12 object-contain"
        />
      </footer>
    </div>
  );
}

export default Location;