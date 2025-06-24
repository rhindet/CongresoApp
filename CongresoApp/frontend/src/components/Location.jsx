import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import HeaderDesktop from '../modules/HeaderDesktop'
import planoMapa from '../assets/Plano_Centro_de_Convenciones_1 (ZONACONGRESO).jpg'
import logo from '../assets/logo.png'
import logoCintermex from '../assets/LogoCintermex.png'

export default function Location() {
  const [isPortrait, setIsPortrait] = useState(false);

  // DETECTAR ORIENTACION Y SI ES MOVIL
  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  return (
    <div className="min-h-dvh w-full bg-[#DCDCDE] overflow-x-hidden">

      {/* Aviso de Giro de Pantalla */}
      {isPortrait && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col justify-center items-center text-white text-center px-6">
          {/* Botón de regreso */}
          <HeaderDesktop backLink="/home" />
          <p className="text-xl mb-4 font-semibold mt-16">
            Para ver mejor el mapa, gira tu celular
          </p>
          <div className="animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-yellow-400"
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

      <main className='min-h-dvh pt-20 p-4 flex flex-col items-center justify-center md:p-5'>
        {/* Heacer Desktop */}
        <div className="hidden md:block">
          <HeaderDesktop backLink="/home" />
        </div>

        {/* Mapa */}
        <div className="bg-white p-4 rounded-xl shadow-xl max-w-6xl w-full">
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={4}
            wheel={{ step: 0.1 }}
          >
            <>
              <div className="overflow-auto border-2 border-gray-400 rounded-lg max-h-[80vh]">
                <TransformComponent>
                  <img
                    src={planoMapa}
                    alt="Mapa"
                    className="w-full max-w-none"
                  />
                </TransformComponent>
              </div>
            </>
          </TransformWrapper>
        </div>

        {/* Footer */}
        <footer className="py-4 px-6 flex justify-between items-center w-full border-t border-gray-300">
          <img
            src={logo}
            alt="Logo Principal"
            className="w-35 object-contain"
          />
          <img
            src={logoCintermex}
            alt="Logo Cintermex"
            className="w-15 object-contain"
          />
        </footer>
      </main>
    </div>
  )
}