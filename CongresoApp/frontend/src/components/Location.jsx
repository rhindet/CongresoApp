// import { useState } from 'react'
import { Link } from 'react-router-dom'
import HeaderMobile from '../modules/HeaderMobile';
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
      <HeaderMobile backLink="/home" title="Mapa" />

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
