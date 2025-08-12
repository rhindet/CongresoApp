import React, { useEffect, useRef, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ApiRequests } from '../core/ApiRequests';


export default function AvisosModal({ open, onClose, isAdmin, abrirModal }) {

    const [setAvisos,SetAvisos] = useState();

      const apiRequest = new ApiRequests();
    


    const modalRef = useRef(null);

    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        const getAvisos = async () =>  {
           const avisos =  await apiRequest.getAllAvisos()
           SetAvisos(avisos)
        }
        
        getAvisos()
        if (open) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [open]);

    const handleAvisoClick = async (aviso) => {
        if(isAdmin == true){
              abrirModal(aviso);

        }

    }

    //Click fuera del modal
    const handleOverlayClick = (e) => {
     
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    if (!open) return null;


    return (
        <div
            className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center"
            onClick={handleOverlayClick}
        >
            <div
                ref={modalRef}
                className="bg-white w-11/12 max-w-md rounded-xl shadow-lg relative p-6 max-h-[90vh] overflow-hidden"
            >
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-red-500">
                    <XMarkIcon className="w-6" />
                </button>
                <h2 className="text-xl font-bold text-secondblue mb-4">Avisos</h2>

                <div className="max-h-64 overflow-y-auto pr-1">
                    <ul className="space-y-3">
                       {setAvisos.map((aviso) => (
                                <li
                                    key={aviso.id}
                                    className="border-l-4 border-secondyellow pl-3 cursor-pointer hover:bg-yellow-50"
                                    onClick={() => handleAvisoClick(aviso)}
                                >
                                    <p className="font-semibold text-gray-800">{aviso.titulo}</p>
                                    <p className="text-sm text-gray-600">{aviso.descripcion}</p>
                                </li>
                                ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
