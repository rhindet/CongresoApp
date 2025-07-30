import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { MegaphoneIcon } from '@heroicons/react/24/solid';
import AvisosModal from '../modules/AvisosModal';


export default function HeaderMobile({ backLink, title, isAdmin = false,adminModal,isUpdateMode}) {
  const [avisosAbiertos, setAvisosAbiertos] = useState(false);

  return (
    <>
      <header className="bg-white shadow-md md:hidden fixed top-0 left-0 w-full z-50">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to={backLink} className="text-gray-700 font-bold">
            <ChevronLeftIcon className="w-8 text-secondblue hover:text-lightblue" />
          </Link>
          <h1 className="text-xl font-bold text-[#29568E]">{title}</h1>
          <button onClick={() => setAvisosAbiertos(true)} className="font-bold">
            <MegaphoneIcon className="w-8 text-secondblue hover:text-lightblue" />
          </button>
        </nav>
      </header>

      {/* Modal de avisos */}
      <AvisosModal 
            open={avisosAbiertos} 
            onClose={() => {
              setAvisosAbiertos(false)
             

            }}
            isAdmin={isAdmin} 
            abrirModal={(aviso) => {
              
              adminModal(true,aviso)
              setAvisosAbiertos(false)
              isUpdateMode(true);
            }}
          />
    </>
  );
}
