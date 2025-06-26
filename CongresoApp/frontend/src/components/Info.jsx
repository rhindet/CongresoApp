import React from 'react'
import HeaderMobile from '../modules/HeaderMobile'
import HeaderDesktop from '../modules/HeaderDesktop'
import logo from '../assets/logo.png'
import logoCintermex from '../assets/LogoCintermex.png'

export default function Info() {
    return (
        <div className='min-h-dvh w-full h-full bg-[#DCDCDE] overflow-hidden'>
            {/* Header Mobile*/}
            <HeaderMobile backLink="/home" title="CONVOCATORIA 2025" />
            {/* Heacer Desktop */}
            <div className="hidden md:block">
                <HeaderDesktop backLink="/home" />
            </div>

            {/* CONTENIDO */}
            <main className="pt-24 pb-10 px-4 flex-grow w-full max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Bienvenido al Congreso</h2>
                    <p className="text-gray-700 leading-relaxed">
                        CONVOCA A TODA LA COMUNIDAD UNIVERSITARIA
                    </p>

                    <h3 className="text-lg font-semibold mt-4">Ubicación</h3>
                    <p className="text-gray-700">
                        Centro de Convenciones Cintermex, Monterrey, N.L.
                    </p>

                    <h3 className="text-lg font-semibold mt-4">Fecha y Horarios</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>📅 25 al 28 de Octubre 2025</li>
                        <li>🕘 Horario: 9:00 AM - 6:00 PM</li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-4">¿Qué incluye?</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Ponencias y talleres</li>
                        <li>Conferencistas nacionales e internacionales</li>
                        <li>Presentaciones Orales</li>
                        <li>Platicas Magistrales</li>
                        <li>Simposios</li>
                    </ul>
                </div>
            </main>

            {/* FOOTER */}
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
        </div>
    )
}

