import { Link } from 'react-router-dom'
import HeaderMobile from '../modules/HeaderMobile'
import HeaderDesktop from '../modules/HeaderDesktop'
import ImageCarousel from '../modules/ImageCarousel'
import { CalendarDaysIcon, RectangleGroupIcon, MapIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
import logo from '../assets/logo.png'

// Lista de opciones del grid
const gridItems = [
    {
        text: 'Horarios',
        icon: <CalendarDaysIcon className="w-16 md:w-20" />,
        to: '/schedule',
    },
    {
        text: 'Eventos',
        icon: <RectangleGroupIcon className="w-16 md:w-20" />,
        to: '/events',
    },
    {
        text: 'Mensaje Director',
        icon: <InformationCircleIcon className="w-16 md:w-20" />,
        to: '/info',
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
        className={`flex flex-col items-center justify-center bg-yellow-400 rounded-2xl md:rounded-3xl py-5 md:py-6 px-1 md:px-1 text-white font-semibold text-lg md:text-2xl hover:bg-[#29568E] transition-all
      ${isDesktop
                ? 'w-[48%] sm:w-[48%] md:w-auto min-w-[170px] max-w-[200px]'
                : 'w-full'}`}
    >
        {item.icon}
        {item.text}
    </Link>
);

export default function Home() {
    return (
        <div className="min-h-dvh w-full h-full bg-[#DCDCDE] overflow-hidden"
        >
            {/* Header Mobile*/}
            <HeaderMobile backLink="/" title="Home" />
            {/* Heacer Desktop */}
            <div className="hidden md:block">
                <HeaderDesktop backLink="/" />
            </div>

            <main className="min-h-dvh pt-20 p-4 flex flex-col items-center justify-center md:p-5">
                <div className='w-full flex flex-col items-center gap-1 md:flex-row '>
                    {/* Logo del congreso */}
                    <div className='w-full md:w-1/2 flex flex-col items-center text-center '>
                        <img
                            src={logo}
                            alt="Logo Congreso"
                            className='w-full max-w-lg md:max-w-5xl'
                        />
                    </div>

                    {/* Carrusel de imagenes */}
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
                </div>

                {/* Vista Desktop: Fila horizontal */}
                <div className="hidden w-full md:flex md:flex-wrap justify-center gap-4 mt-6">
                    {gridItems.map((item, idx) => (
                        <GridButton key={idx} item={item} isDesktop={true} />
                    ))}
                </div>

                {/* Footer */}
                <footer className="text-xs md:text-sm text-center text-[#014480] mt-10">
                    Todos los derechos reservados <br />
                    <span className="text-[#29568E] font-bold">Subdirección de Investigación e Innovación</span>
                </footer>
            </main>
        </div>
    )
}
