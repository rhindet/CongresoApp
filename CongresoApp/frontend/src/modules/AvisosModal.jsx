import { XMarkIcon } from '@heroicons/react/24/solid';

import React from 'react'

export default function AvisosModal({ open, onClose }) {
    if (!open) return null;

    const avisos = [
        { id: 1, titulo: 'Cambio de horario', mensaje: 'La conferencia de Oncología se moverá a las 10:30 AM.' },
        { id: 2, titulo: 'Nuevo video disponible', mensaje: 'Ya puedes ver la repetición de la conferencia inaugural.' },
        { id: 3, titulo: 'Ubicación actualizada', mensaje: 'El simposio de Cardiología se realizará en el Salón B2.' },
    ];

    return (
        <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center">
            <div className="bg-white w-11/12 max-w-md rounded-xl shadow-lg relative p-6">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-red-500">
                    <XMarkIcon className="w-6" />
                </button>
                <h2 className="text-xl font-bold text-[#29568E] mb-4">Avisos</h2>
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
    )
}
