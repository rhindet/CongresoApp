import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { MegaphoneIcon } from '@heroicons/react/24/solid';
import AvisosModal from '../modules/AvisosModal';

export default function HeaderMobile({ backLink }) {
  const [avisosAbiertos, setAvisosAbiertos] = useState(false);

  return (
    <>
      {/* Botón de regreso (esquina izquierda) */}
      <div className="fixed top-8 left-8 z-50">
        <Link
          to={backLink}
          className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#f2f2f2] transition"
        >
          <ArrowUturnLeftIcon className="w-6 h-6 text-[#29568E] hover:text-[#876EE4]" />
        </Link>
      </div>

      {/* Botón de avisos (esquina derecha) */}
      <div className="fixed top-8 right-8 z-50">
        <button
          onClick={() => setAvisosAbiertos(true)}
          className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#f2f2f2] transition"
        >
          <MegaphoneIcon className="w-5 h-5 text-[#29568E] hover:text-[#78aff3]" />
        </button>
      </div>

      {/* Modal de avisos */}
      <AvisosModal open={avisosAbiertos} onClose={() => setAvisosAbiertos(false)} />
    </>
  );
}
