/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import HeaderMobile from '../modules/HeaderMobile'
import HeaderDesktop from '../modules/HeaderDesktop'
import YTLive from '../modules/YTLive'
import Loader from '../modules/Loader';
import { CalendarIcon } from '@heroicons/react/24/solid';
import { timeFormat, formatDownloadICS } from './dateFormatt';
import S_201 from '../../public/assets/mapas/S_201.png';
import S_202 from '../../public/assets/mapas/S_202.png';
import S_203 from '../../public/assets/mapas/S_203.png';
import S_204 from '../../public/assets/mapas/S_204.png';
import S_205 from '../../public/assets/mapas/S_205.png';
import S_206 from '../../public/assets/mapas/S_206.png';
import S_306 from '../../public/assets/mapas/S_306.png';
import S_307 from '../../public/assets/mapas/S_307.png';
import S_308 from '../../public/assets/mapas/S_308.png';
import S_309 from '../../public/assets/mapas/S_309.png';
import S_Antartida from '../../public/assets/mapas/S_Antartida.png';
import S_Canada from '../../public/assets/mapas/S_Canada.png';
import S_EstadosUnidos from '../../public/assets/mapas/S_EstadosUnidos.png';
import S_Europa from '../../public/assets/mapas/S_Europa.png';
import planoMapa from '../../public/assets/mapas/Plano_Centro_de_Convenciones_1 (ZONACONGRESO).png'; // imagen por default
import Ponentes from '../modules/Ponentes';

const salonMapas = {
    '201': S_201,
    '202': S_202,
    '203': S_203,
    '204': S_204,
    '205': S_205,
    '206': S_206,
    '306': S_306,
    '307': S_307,
    '308': S_308,
    '309': S_309,
    'Antártida': S_Antartida,
    'Europa': S_Europa,
    'Canadá': S_Canada,
    'Estados Unidos': S_EstadosUnidos
};


//Función para descargar el .ICS
function downloadICS({ titulo, doctor, descripcion, fecha, hora, duracionMin = 60 }) {
    const start = new Date(`${fecha}T${hora.padStart(5, '0')}:00`);
    const end = new Date(start.getTime() + duracionMin * 60000);

    const formatDate = (date) =>
        date
            .toISOString()
            .replace(/[-:]/g, '')
            .split('.')[0] + 'Z';

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//CongresoMedico//EN',
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        `DTSTART:${formatDate(start)}`,
        `DTEND:${formatDate(end)}`,
        `SUMMARY:${titulo}`,
        `DESCRIPTION:${descripcion || ''} \r\n Ponente: ${doctor}`,
        'LOCATION:Centro de Convenciones Cintermex',
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'BEGIN:VALARM',
        'TRIGGER:-PT15M',
        'ACTION:DISPLAY',
        'DESCRIPTION:Recordatorio',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    const encoded = encodeURIComponent(icsContent);
    const dataURI = `data:text/calendar;charset=utf-8,${encoded}`;

    const link = document.createElement('a');
    link.href = dataURI;
    link.download = `${titulo.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

}



export default function TalkDetailsSimposio() {
    const scrollRef = useRef(null);
    const { state } = useLocation();
    const navigate = useNavigate();
    // const [loader, setLoader] = useState(true);

    const backLink = state?.from || '/schedule';


    useEffect(() => {
        if (!state) {
            navigate('/schedule');
        }
    }, [state, navigate]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current) {
                const container = scrollRef.current;
                const cardWidth = container.firstChild?.offsetWidth || 0;
                const visibleWidth = container.offsetWidth;
                // const maxScrollLeft = container.scrollWidth - visibleWidth;

                // Avanza una "pantalla" o fila de tarjetas
                const nextScrollLeft = container.scrollLeft + cardWidth;

                if (nextScrollLeft + visibleWidth > container.scrollWidth) {
                    // Reinicia scroll si el próximo paso lo saca del límite
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    container.scrollTo({ left: nextScrollLeft, behavior: 'smooth' });
                }
            }
        }, 4000); // cada 5 segundos

        return () => clearInterval(interval);
    }, []);

    if (!state) return null;
    console.log(state)

    const { nombre, hora_inicio, hora_fin, fecha, jefe, objetivo, salon, videoUrl, programa, departamento, coordinador } = state;
    const nombre1 = nombre || 'Sin nombre';
    const hora_inicio1 = hora_inicio || 'Sin hora';
    const hora_fin1 = hora_fin || 'Sin hora';
    const jefe1 = jefe || '';
    const objetivo1 = objetivo || 'Sin resumen';
    const salon1 = salon || 'Sin salon';
    const programa1 = programa || [];
    const departamento1 = departamento || '';
    const coordinador1 = coordinador || '';
    const fecha1 = fecha || 'Sin fecha';
    const videoUrl1 = videoUrl || '';

    //YYYY-MM-DD
    return (
        <div className="min-h-dvh w-full overflow-x-hidden">
            {/* HEADER */}
            <HeaderMobile backLink={backLink} title="Detalle" />
            {/* Heacer Desktop */}
            <div className="hidden md:block">
                <HeaderDesktop backLink={backLink} />
            </div>

            <main className="pt-20 pb-20 min-h-screen flex flex-col items-center w-full px-4">
                {/* BOTON DE AGREGAR AL CALENDARIO */}
                <div className="mt-1 mb-6 justify-center">
                    <button
                        onClick={() => {
                            const { fecha, hora, duracionMin } = formatDownloadICS(hora_inicio1, hora_fin1);
                            downloadICS({
                                titulo: nombre1,
                                doctor: jefe1,
                                descripcion: objetivo1,
                                fecha,
                                hora,
                                duracionMin
                            });
                        }}
                        className="px-4 py-2 bg-secondyellow text-white font-semibold rounded-3xl hover:bg-firstyellow flex flex-row items-center gap-2"
                    >
                        <CalendarIcon className='w-8' />
                        Agendar
                    </button>
                </div>

                <div className="bg-white p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl shadow-md w-full max-w-3xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#014480]">{nombre1}</h2>
                    <p className="text-sm md:text-base text-gray-600 mt-2">
                        {`${timeFormat(hora_inicio1)} - ${timeFormat(hora_fin1)}`}
                    </p>
                    <h3 className="mt-5 text-lg md:text-xl font-semibold text-firstyellow">Resumen</h3>
                    <p className="text-sm md:text-base mt-2 text-gray-700 text-justify">{objetivo1 || 'Aún no disponible.'}</p>
                    {jefe != '' ? (
                        <>
                            <p className="text-sm md:text-base mt-2 text-gray-700">
                                <strong>Jefe:</strong> {jefe1}
                            </p>
                        </>
                    ) : ''}

                    {coordinador1 != '' ? (
                        <>
                            <p className="text-sm md:text-base text-gray-700">
                                <strong>Coordinador:</strong> {coordinador1}
                            </p>
                        </>
                    ) : ''}




                    <h3 className="mt-5 text-lg md:text-xl font-semibold text-firstyellow">Salón</h3>
                    <p className="text-sm md:text-base text-gray-700">{salon1 || 'Auditorio Principal'}</p>



                    {/* MAPA */}
                    <div className="mt-6">
                        <img
                            src={salonMapas[salon1] || planoMapa}
                            alt={`Mapa del salón ${salon1}`}
                            className="w-full max-h-[500px] object-contain rounded-lg border"
                        />
                    </div>

                    {programa1 && programa1.length > 0 ? (
                        <>
                            <h3 className="mt-5 text-lg md:text-xl font-semibold text-firstyellow">
                                Ponentes
                            </h3>

                            <div
                                ref={scrollRef}
                                className="flex overflow-x-auto gap-4 p-4 scroll-smooth scrollbar-hide"
                            >
                                {programa1.map((elemento, index) => {
                                    if (!Array.isArray(elemento.ponentes)) return null; // ❌ evita errores

                                    return (
                                        <Ponentes
                                            key={index}
                                            programa={elemento.ponentes}
                                            index={index}
                                            departamento={departamento1}
                                            actividad1={elemento.actividad}
                                            
                                        />
                                    );
                                })}
                                <div className="min-w-[200px]" /> {/* Padding extra para mostrar el último */}
                            </div>
                        </>
                    ) : null}



                    {/* Video de YouTube embevido*/}
                    {/* <div className="mt-5 flex items-center gap-2">
                        <span
                            className={`w-3 h-3 rounded-full ${videoUrl1 ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
                                }`}
                        ></span>
                        <h3 className="text-lg md:text-xl font-semibold text-firstyellow">EN VIVO</h3>
                    </div>

                    {videoUrl ? (
                        <YTLive url={videoUrl1} />
                    ) : (
                        <div className='relative w-full pb-[56.25%] mt-1'>
                            <div className="absolute top-0 left-0 w-full h-full bg-fondosecundario flex items-center justify-center border rounded-lg">
                                <p className="text-gray-500 font-semibold text-center px-4">
                                    El video en vivo comenzará próximamente...
                                </p>
                            </div>
                        </div>
                    )} */}
                    
                </div>
            </main>
        </div>
    );
}