import React, { useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function AvisosModal({ open, onClose }) {
    const avisos = [
        { id: 1, titulo: 'Inicio día 1 de Congreso 2025', mensaje: 'Iniciamos el primer dia del Congreso 2025' },
        { id: 2, titulo: 'Cambio de horario', mensaje: 'La conferencia de Oncología se moverá a las 10:30 AM.' },
        { id: 3, titulo: 'Nuevo video disponible', mensaje: 'Ya puedes ver la repetición de la conferencia inaugural.' },
        { id: 4, titulo: 'Ubicación actualizada', mensaje: 'El simposio de Cardiología se realizará en el Salón B2.' },
        { id: 5, titulo: 'Fin día 1 de Congreso 2025', mensaje: 'Terminamos el primer dia del Congreso 2025, nos vemos mañana.' },
    ];

    const modalRef = useRef(null);

    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        if (open) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [open]);

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
                <h2 className="text-xl font-bold text-[#29568E] mb-4">Avisos</h2>

                <div className="max-h-64 overflow-y-auto pr-1">
                    <ul className="space-y-3">
                        {avisos.map((aviso) => (
                            <li key={aviso.id} className="border-l-4 border-yellow-400 pl-3">
                                <p className="font-semibold text-gray-800">{aviso.titulo}</p>
                                <p className="text-sm text-gray-600">{aviso.mensaje}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
