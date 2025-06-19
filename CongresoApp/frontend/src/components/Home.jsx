import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { BellIcon, CalendarDaysIcon, RectangleGroupIcon, MapIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
import logo from '../assets/logo.png'
import img1 from '../assets/img1-carrusel.jpg'
import img2 from '../assets/img2-carrusel.jpg'
import img3 from '../assets/img3-carrusel.jpg'
import img4 from '../assets/img4-carrusel.jpg'
import img5 from '../assets/img5-carrusel.jpg'
import img6 from '../assets/img6-carrusel.jpg'
import img7 from '../assets/img7-carrusel.jpg'
const images = [img1, img2, img3, img4, img5, img6, img7];

export default function Home() {
    const [current, setCurrent] = useState(0);

    //Cambia la imagen cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-dvh overflow-hidden bg-[#DCDCDE]">
            {/* Header */}
            <header className="bg-white shadow-md md:hidden fixed top-0 left-0 w-full z-50">
                <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-gray-700 hover:text-indigo-600 font-bold">
                        <ChevronLeftIcon className='w-8 text-black hover:text-indigo-600'></ChevronLeftIcon>
                    </Link>
                    <h1 className="text-xl font-bold text-[#014480]">Home</h1>
                    <Link to="#" className="text-black hover:text-indigo-600 font-bold">
                        <BellIcon className='w-8 text-black hover:text-indigo-600'></BellIcon>
                    </Link>
                </nav>
            </header>

            <main className="min-h-dvh pt-20 p-4 flex flex-col items-center justify-center md:p-5">
                <div className='w-full flex flex-col items-center gap-1 md:flex-row'>
                    {/* Logo del congreso */}
                    <div className='w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-4'>
                        <img
                            src={logo}
                            alt="Logo Congreso"
                            className='w-full max-w-xs md:max-w-lg md:w-auto'
                        />
                    </div>

                    {/* Carrusel de imagenes */}
                    <div className="w-full max-w-md md:max-w-5xl h-40 md:h-96 overflow-hidden rounded-xl shadow-lg">
                        <img
                            src={images[current]}
                            alt="Slide"
                            className="w-full h-full object-cover transition duration-700 ease-in-out"
                        />
                    </div>
                </div>


                {/* Grid */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-s md:max-w-2xl text-center mt-6">
                    <Link to="/schedule"
                        className="flex flex-col items-center justify-center bg-yellow-400 rounded-2xl md:rounded-3xl py-5 md:py-6 text-white font-semibold text-lg md:text-2xl hover:bg-[#014480] transition-all">
                        <CalendarDaysIcon className='w-20' />
                        Horarios
                    </Link>
                    <Link className="flex flex-col items-center justify-center bg-yellow-400 rounded-2xl md:rounded-3xl py-5 md:py-6 text-white font-semibold text-lg md:text-2xl hover:bg-[#014480] transition-all">
                        <RectangleGroupIcon className='w-20' />
                        Categorías
                    </Link>
                    <Link to="/location"
                    className="flex flex-col items-center justify-center bg-yellow-400 rounded-2xl md:rounded-3xl py-5 md:py-6 text-white font-semibold text-lg md:text-2xl hover:bg-[#014480] transition-all">
                        <MapIcon className='w-20' />
                        Mapa
                    </Link>
                    <Link className="flex flex-col items-center justify-center bg-yellow-400 rounded-2xl md:rounded-3xl py-5 md:py-6 text-white font-semibold text-lg md:text-2xl hover:bg-[#014480] transition-all">
                        <InformationCircleIcon className='w-20' />
                        Info
                    </Link>
                </div>

                {/* Footer */}
                <footer className="text-xs md:text-sm text-center text-[#014480] mt-8">
                    Todos los derechos reservados <br />
                    <span className="text-[#014480] font-semibold">Subdirección de Investigación e Innovación</span>
                </footer>

            </main>
        </div>
    )
}
