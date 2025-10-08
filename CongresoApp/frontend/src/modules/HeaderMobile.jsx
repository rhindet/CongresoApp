import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { MegaphoneIcon } from '@heroicons/react/24/solid';
import AvisosModal from '../modules/AvisosModal';

export default function HeaderMobile({
  backLink,
  title,
  isAdmin = false,
  adminModal,
  isUpdateMode
}) {
  const [avisosAbiertos, setAvisosAbiertos] = useState(false);

  return (
    <>
      <header className="bg-white shadow-md md:hidden fixed top-0 left-0 w-full z-50">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* 🔙 Botón de volver */}
          <Link to={backLink} className="text-gray-700 font-bold">
            <ChevronLeftIcon className="w-8 text-secondblue hover:text-lightblue" />
          </Link>

          {/* 🧾 Título */}
          <h1 className="text-xl font-bold text-secondblue">{title}</h1>

          {/* 📣 Botón del megáfono con círculo rojo permanente */}
          <div className="relative">
            <button
              onClick={() => setAvisosAbiertos(true)}
              className="font-bold relative"
            >
              <MegaphoneIcon className="w-8 text-secondblue hover:text-lightblue" />
              {/* 🔴 Indicador rojo siempre visible */}
              <span className="absolute -top-1 -right-1 bg-red-600 w-4 h-4 rounded-full border-2 border-white shadow-md" />
            </button>
          </div>
        </nav>
      </header>

      {/* Modal de avisos */}
      <AvisosModal
        open={avisosAbiertos}
        onClose={() => setAvisosAbiertos(false)}
        isAdmin={isAdmin}
        abrirModal={(aviso) => {
          adminModal(true, aviso);
          setAvisosAbiertos(false);
          isUpdateMode(true);
        }}
      />
    </>
  );
}