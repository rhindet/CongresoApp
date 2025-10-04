import { useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function PonenteModal({ ponente, onClose }) {
    if (!ponente) return null;

    const { nombre, afiliacion, descripcion, rutaFinal } = ponente;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const modalRef = useRef(null);

    const handleOverlayClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center p-4"
            onClick={handleOverlayClick}
        >
            <div
                ref={modalRef}
                className="
                    bg-white rounded-lg shadow-xl relative 
                    w-11/12 max-w-lg 
                    max-h-[90vh] overflow-y-auto 
                    px-6 md:p-8 
                    animate-fade-in-up
                "
            >
                {/* Cuadro blanco decorativo */}
                <div className="sticky top-0 bg-white text-white text-center z-10 md:hidden select-none">blank</div>

                {/* Botón para cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-red-500 z-20"
                >
                    <XMarkIcon className="w-6" />
                </button>

                {/* Contenido del modal */}
                <div className="flex flex-col items-center">
                    <img
                        src={rutaFinal}
                        alt={`Foto de ${nombre}`}
                        className="w-32 h-32 object-cover rounded-full mb-4"
                    />
                    <h2 className="text-2xl font-bold text-center text-gray-800">{nombre}</h2>
                    <p className="text-md text-gray-400 text-center mb-4">{afiliacion}</p>

                    <p className="text-sm text-justify text-gray-700 w-full whitespace-pre-wrap">{descripcion}</p>

                </div>

                {/* Cuadro blanco decorativo */}
                <div className="sticky bottom-0 bg-white text-white text-center z-10 md:hidden select-none">blank</div>
            </div>
        </div>
    );
}
