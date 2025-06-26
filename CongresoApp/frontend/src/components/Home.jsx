<<<<<<< HEAD
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
=======
import { Link } from 'react-router-dom'
import HeaderMobile from '../modules/HeaderMobile'
import HeaderDesktop from '../modules/HeaderDesktop'
import ImageCarousel from '../modules/ImageCarousel'
import { CalendarDaysIcon, RectangleGroupIcon, MapIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
import logo from '../assets/logo.png'
>>>>>>> 78ef72d (Prueba)

// Lista de opciones del grid
const gridItems = [
    {
        text: 'Horarios',
        icon: <CalendarDaysIcon className="w-16 md:w-20" />,
        to: '/schedule',
    },
    {
<<<<<<< HEAD
        text: 'Categorías',
        icon: <RectangleGroupIcon className="w-16 md:w-20" />,
        to: '/categories',
=======
        text: 'Eventos',
        icon: <RectangleGroupIcon className="w-16 md:w-20" />,
        to: '/events',
>>>>>>> 78ef72d (Prueba)
    },
    {
        text: 'Mapa',
        icon: <MapIcon className="w-16 md:w-20" />,
        to: '/location',
    },
    {
        text: 'Info',
        icon: <InformationCircleIcon className="w-16 md:w-20" />,
        to: '/information',
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
<<<<<<< HEAD
                ? 'w-[48%] sm:w-[48%] md:w-auto min-w-[140px] max-w-[200px]'
=======
                ? 'w-[48%] sm:w-[48%] md:w-auto min-w-[170px] max-w-[200px]'
>>>>>>> 78ef72d (Prueba)
                : 'w-full'}`}
    >
        {item.icon}
        {item.text}
    </Link>
);

export default function Home() {
<<<<<<< HEAD
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
=======
    return (
        <div className="min-h-dvh w-full h-full bg-[#DCDCDE] overflow-hidden"
        >
>>>>>>> 78ef72d (Prueba)
            {/* Header Mobile*/}
            <HeaderMobile backLink="/" title="Home" />
            {/* Heacer Desktop */}
            <div className="hidden md:block">
                <HeaderDesktop backLink="/" />
            </div>

            <main className="min-h-dvh pt-20 p-4 flex flex-col items-center justify-center md:p-5">
<<<<<<< HEAD
                <div className='w-full flex flex-col items-center gap-6 md:flex-row md:items-start'>
                    {/* Logo del congreso */}
                    <div className='w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left'>
                        <img
                            src={logo}
                            alt="Logo Congreso"
                            className='w-full max-w-xs md:max-w-lg'
=======
                <div className='w-full flex flex-col items-center gap-1 md:flex-row '>
                    {/* Logo del congreso */}
                    <div className='w-full md:w-1/2 flex flex-col items-center text-center '>
                        <img
                            src={logo}
                            alt="Logo Congreso"
                            className='w-full max-w-lg md:max-w-5xl'
>>>>>>> 78ef72d (Prueba)
                        />
                    </div>

                    {/* Carrusel de imagenes */}
<<<<<<< HEAD
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
=======
                    <ImageCarousel
                        className="w-full md:w-1/2 h-32 md:h-80"
                    />
                </div>

                {/* Vista Mobile*/}
                <div
                    className={`grid gap-4 w-full max-w-sm text-center mt-6 md:hidden ${gridItems.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                        }`}
                >
                    {gridItems.map((item, idx) => {
                        const isLastOdd =
                            gridItems.length % 2 !== 0 && idx === gridItems.length - 1;

                        return (
                            <div
                                key={idx}
                                className={isLastOdd ? 'col-span-2 flex justify-center' : ''}
                            >
                                <GridButton item={item} isDesktop={false} />
                            </div>
                        );
                    })}
>>>>>>> 78ef72d (Prueba)
                </div>

                {/* Vista Desktop: Fila horizontal */}
                <div className="hidden w-full md:flex md:flex-wrap justify-center gap-4 mt-6">
                    {gridItems.map((item, idx) => (
                        <GridButton key={idx} item={item} isDesktop={true} />
                    ))}
                </div>

                {/* Footer */}
<<<<<<< HEAD
                <footer className="text-xs md:text-sm text-center text-[#014480] mt-8">
=======
                <footer className="text-xs md:text-sm text-center text-[#014480] mt-10">
>>>>>>> 78ef72d (Prueba)
                    Todos los derechos reservados <br />
                    <span className="text-[#29568E] font-bold">Subdirección de Investigación e Innovación</span>
                </footer>
            </main>
        </div>
    )
}
