import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderMobile from '../modules/HeaderMobile';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { FaArrowLeft, FaSearchPlus, FaSearchMinus, FaUndo } from 'react-icons/fa';
import planoMapa from '../assets/Plano_Centro_de_Convenciones_1 (ZONACONGRESO).jpg';
import logoPrincipal from '../assets/logo.png';
import logoCintermex from '../assets/LogoCintermex.png';

function Location() {
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
    <div className="min-h-screen bg-gray-300 w-full flex flex-col relative overflow-hidden">
      {isPortrait && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col justify-center items-center text-white text-center px-6">
          <p className="text-xl mb-4 font-semibold">
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

      {/* NAVBAR */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-gray-300">
        <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto w-full">
          <Link
            to="/"
            className="text-gray-700 text-2xl hover:text-indigo-600 transition"
          >
            <FaArrowLeft />
          </Link>
          <h1 className="text-3xl font-bold text-blue-900 text-center flex-1 mr-8">
            Mapa del Congreso
          </h1>
        </div>
      </div>

      {/* CONTENIDO */}
      <main className="pt-24 pb-10 px-4 flex-grow flex flex-col items-center w-full">
        <div className="bg-white p-4 rounded-xl shadow-xl max-w-6xl w-full">
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={4}
            wheel={{ step: 0.1 }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>

                <div className="overflow-auto border-2 border-gray-400 rounded-lg max-h-[80vh]">
                  <TransformComponent>
                    <img
                      src={planoMapa}
                      alt="Mapa del Congreso"
                      className="w-full max-w-none"
                    />
                  </TransformComponent>
                </div>
              </>
            )}
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
