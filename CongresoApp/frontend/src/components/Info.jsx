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

