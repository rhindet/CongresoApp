import { Link } from 'react-router-dom'
import HeaderMobile from '../modules/HeaderMobile'
import HeaderDesktop from '../modules/HeaderDesktop'
import { PresentationChartBarIcon, ChatBubbleLeftRightIcon, UserGroupIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/solid'
import logo from '../../public/assets/principales/logo_congreso_33.svg';

//Lista de opciones del grid
const gridItems = [
    {
        text: 'Simposios',
        icon: <PresentationChartBarIcon className="w-16 md:w-20" />,
        to: '/simposios',
    },
    {
        text: 'Pláticas Magistrales',
        icon: <ChatBubbleLeftRightIcon className="w-16 md:w-20" />,
        to: '/magistrales',
    },
    {
        text: 'Presentaciones Orales',
        icon: <UserGroupIcon className="w-16 md:w-20" />,
        to: '/presentaciones',
    },
];

// Componente Botón Reutilizable
const GridButton = ({ item, isDesktop }) => (
    <Link
        to={item.to}
        className={`flex flex-col items-center justify-center bg-firstblue rounded-2xl md:rounded-3xl px-1 py-6 md:py-3 md:px-2 text-white font-semibold text-sm md:text-2xl hover:bg-secondyellow transition-all
      ${isDesktop
                ? 'w-[48%] sm:w-[48%] md:w-auto min-w-[200px] max-w-[350px]'
                : 'w-full'}`}
    >
        {item.icon}
        {item.text}
    </Link>
);

export default function Events() {
    return (
        <div className="min-h-dvh w-full h-full overflow-hidden">
            {/* Header Mobile*/}
            <HeaderMobile backLink="/home" title="Eventos" />
            {/* Heacer Desktop */}
            <div className="hidden md:block">
                <HeaderDesktop backLink="/home" />
            </div>

            <main className="min-h-dvh p-3 flex flex-col items-center justify-center">
                {/* Logo del congreso */}
                <div className='w-full md:w-1/2 flex flex-col items-center text-center'>
                    <img
                        src={logo}
                        alt="Logo Congreso"
                        className='w-full max-w-lg md:max-w-3xl mt-10'
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
                <div className="hidden w-full md:flex md:flex-wrap justify-center gap-4">
                    {gridItems.map((item, idx) => (
                        <GridButton key={idx} item={item} isDesktop={true} />
                    ))}
                </div>

                {/* Footer */}
                <footer className="text-xs md:text-sm text-center text-[#014480] mt-10">
                    Todos los derechos reservados <br />
                    <span className="text-firstblue font-bold">Subdirección de Investigación</span>
                    <br></br>
                    <span className="text-firstblue font-bold">Facultad de Medicina UANL</span>

                </footer>
            </main>
        </div>
    )
}
