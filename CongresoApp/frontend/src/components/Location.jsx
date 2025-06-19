// import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { BellIcon } from '@heroicons/react/24/solid'
import planoMapa from '../assets/Plano_Centro_de_Convenciones_1 (ZONACONGRESO).jpg'
import logo from '../assets/logo.png'
import logoCintermex from '../assets/LogoCintermex.png'

export default function Location() {
  return (
    <div className="min-h-dvh overflow-hidden bg-[#DCDCDE]">
      {/* Header */}
      <header className="bg-white shadow-md md:hidden fixed top-0 left-0 w-full z-50">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/home" className="text-gray-700 hover:text-indigo-600 font-bold">
            <ChevronLeftIcon className='w-8 text-black hover:text-indigo-600'></ChevronLeftIcon>
          </Link>
          <h1 className="text-xl font-bold text-[#014480]">Mapa</h1>
          <Link to="#" className="text-black hover:text-indigo-600 font-bold">
            <BellIcon className='w-8 text-black hover:text-indigo-600'></BellIcon>
          </Link>
        </nav>
      </header>

      <main className='min-h-dvh pt-20 p-4 flex flex-col items-center justify-center md:p-5'>
        <div className="bg-white p-4 rounded-xl shadow-xl max-w-6xl w-full">
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={4}
            wheel={{ step: 0.1 }}
          >
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
          </TransformWrapper>
        </div>

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
      </main>
    </div>
  )
}
