import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HeaderMobile from '../modules/HeaderMobile'
import HeaderDesktop from '../modules/HeaderDesktop'
import { CalendarDaysIcon, RectangleGroupIcon, MapIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
import logo from '../assets/logo.png'
import img1 from '../assets/img1-carrusel.jpg'
import img2 from '../assets/img2-carrusel.jpg'
import img3 from '../assets/img3-carrusel.jpg'
import img4 from '../assets/img4-carrusel.jpg'
import img5 from '../assets/img5-carrusel.jpg'
import img6 from '../assets/img6-carrusel.jpg'
import img7 from '../assets/img7-carrusel.jpg'
const images = [img1, img2, img3, img4, img5, img6, img7];

// Lista de opciones del grid
const gridItems = [
    {
        text: 'Horarios',
        icon: <CalendarDaysIcon className="w-16 md:w-20" />,
        to: '/schedule',
    },
    {
        text: 'Categorías',
        icon: <RectangleGroupIcon className="w-16 md:w-20" />,
        to: '/categories',
    },
    {
        text: 'Mapa',
        icon: <MapIcon className="w-16 md:w-20" />,
        to: '/location',
    },
    {
        text: 'Info',
        icon: <InformationCircleIcon className="w-16 md:w-20" />,
        to: '/info',
    },
];

// Componente Botón Reutilizable
const GridButton = ({ item, isDesktop }) => (
    <Link
        to={item.to}
        className={`flex flex-col items-center justify-center bg-yellow-400 
      rounded-2xl md:rounded-3xl py-5 md:py-6 text-white font-semibold 
      text-lg md:text-2xl hover:bg-[#29568E] transition-all
      ${isDesktop
                ? 'w-[48%] sm:w-[48%] md:w-auto min-w-[140px] max-w-[200px]'
                : 'w-full'}`}
    >
        {item.icon}
        {item.text}
    </Link>
);

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
            {/* Header Mobile*/}
            <HeaderMobile backLink="/" title="Home" />
            {/* Heacer Desktop */}
            <div className="hidden md:block">
                <HeaderDesktop backLink="/" />
            </div>

            <main className="min-h-dvh pt-20 p-4 flex flex-col items-center justify-center md:p-5">
                <div className='w-full flex flex-col items-center gap-6 md:flex-row md:items-start'>
                    {/* Logo del congreso */}
                    <div className='w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left'>
                        <img
                            src={logo}
                            alt="Logo Congreso"
                            className='w-full max-w-xs md:max-w-lg'
                        />
                    </div>

                    {/* Carrusel de imagenes */}
                    <div className="w-full md:w-1/2 h-40 md:h-96 overflow-hidden rounded-xl shadow-lg">
                        <img
                            src={images[current]}
                            alt="Slide"
                            className="w-full h-full object-cover transition duration-700 ease-in-out"
                        />
                    </div>
                </div>

                {/* Vista Mobile: Grid 2x2 */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm text-center mt-6 md:hidden">
                    {gridItems.map((item, idx) => (
                        <GridButton key={idx} item={item} isDesktop={false} />
                    ))}
                </div>

                {/* Vista Desktop: Fila horizontal */}
                <div className="hidden w-full md:flex md:flex-wrap justify-center gap-4 mt-6">
                    {gridItems.map((item, idx) => (
                        <GridButton key={idx} item={item} isDesktop={true} />
                    ))}

                {/* Grid */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-s md:max-w-2xl text-center mt-6">
                    <Link to="/schedule"
                        className="flex flex-col items-center justify-center bg-yellow-400 rounded-2xl md:rounded-3xl py-5 md:py-6 text-white font-semibold text-lg md:text-2xl hover:bg-[#29568E] transition-all">
                        <CalendarDaysIcon className='w-20' />
                        Horarios
                    </Link>
                    <Link
                        className="flex flex-col items-center justify-center bg-yellow-400 rounded-2xl md:rounded-3xl py-5 md:py-6 text-white font-semibold text-lg md:text-2xl hover:bg-[#29568E] transition-all">
                        <RectangleGroupIcon className='w-20' />
                        Categorías
                    </Link>
                    <Link to="/location"
                        className="flex flex-col items-center justify-center bg-yellow-400 rounded-2xl md:rounded-3xl py-5 md:py-6 text-white font-semibold text-lg md:text-2xl hover:bg-[#29568E] transition-all">
                        <MapIcon className='w-20' />
                        Mapa
                    </Link>
                    <Link to="/information"
                        className="flex flex-col items-center justify-center bg-yellow-400 rounded-2xl md:rounded-3xl py-5 md:py-6 text-white font-semibold text-lg md:text-2xl hover:bg-[#29568E] transition-all">
                        <InformationCircleIcon className='w-20' />
                        Info
                    </Link>
                </div>

                {/* Footer */}
                <footer className="text-xs md:text-sm text-center text-[#014480] mt-8">
                    Todos los derechos reservados <br />
                    <span className="text-[#29568E] font-bold">Subdirección de Investigación e Innovación</span>
                </footer>
            </main>
        </div>
    )
}
