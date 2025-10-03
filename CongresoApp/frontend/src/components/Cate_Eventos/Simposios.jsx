import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderMobile from '../../modules/HeaderMobile';
import HeaderDesktop from '../../modules/HeaderDesktop';
import { ApiRequests } from '../../core/ApiRequests';
import Loader from '../../modules/Loader';

const tpColorStyles = {
    'simposios': {
        bg: '#B6A6CA',
        text: '#5b2c6f',
    },
};

function Simposios() {
    const [day, setDay] = useState('9');
    const [listDeSimposios, setListDeSimposios] = useState([]);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSimposios = async () => {
            const apiRequest = new ApiRequests(); // ← definido dentro del efecto
            window.scrollTo(0, 0);
            try {
                const allSimposios = await apiRequest.getAllSimposios();
                setListDeSimposios(allSimposios);
            } catch (error) {
                console.error('Error al obtener simposios:', error);
            } finally {
                setLoader(false);
            }
        };
        fetchSimposios();
    }, []);

    const formatoHora = (isoString) => {
        if (!isoString) return "";

        // Si la cadena NO incluye información de zona horaria ('Z' o '+'),
        // se añade 'Z' para forzar a new Date() a tratarla como UTC.
        // Esto evita que se aplique la zona horaria local del usuario.
        const dateStringUTC = isoString.includes('Z') || isoString.includes('+') ? isoString : `${isoString}Z`;

        const date = new Date(dateStringUTC);

        // Usamos getUTCHours y getUTCMinutes para obtener la hora UTC (la hora "fija" de la base de datos).
        const horas = date.getUTCHours();
        const minutos = date.getUTCMinutes();

        return `${horas}:${minutos.toString().padStart(2, '0')}`;
    };

    const filteredTalks = listDeSimposios
    .filter(talk => {
        const dia = new Date(talk.hora_inicio).getDate().toString().padStart(2, '0');
        return dia === day.padStart(2, '0');
    })
    .sort((a,b) => new Date(a.hora_inicio).getTime() - new Date(b.hora_inicio).getTime());

    const getSimposio = async (talk) => {
        const apiRequest = new ApiRequests();
        return await apiRequest.getSimposio(talk.id);
    };

    return (
        loader ? <Loader /> : (
            <div className="min-h-dvh w-full overflow-x-hidden">
                <HeaderMobile backLink="/events" title="Simposios" />
                <div className="hidden md:block">
                    <HeaderDesktop backLink="/events" />
                </div>

                <main className="pt-20 pb-20 min-h-screen flex flex-col items-center w-full px-4">
                    {/* Selector de día */}
                    <div className="flex justify-center gap-4 mb-4">
                        {['9', '10'].map((d) => (
                            <button
                                key={d}
                                onClick={() => setDay(d)}
                                className={`px-10 py-3 rounded-full font-semibold text-white transition md:px-30
                                            ${day === d ? 'bg-secondyellow text-white' : 'bg-[#999999]'}`}
                            >
                                {d} Octubre
                            </button>
                        ))}
                    </div>

                    {/* Lista de simposios */}
                    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                        {filteredTalks.length === 0 ? (
                            <p className="text-center text-gray-600 col-span-full text-lg font-medium mt-10">
                                No hay simposios para este día.
                            </p>
                        ) : (
                            filteredTalks.map((talk, index) => {
                                const colors = tpColorStyles['simposios'];
                                return (
                                    <div
                                        key={index}
                                        onClick={async () => {
                                            setLoader(true);
                                            const simposio = await getSimposio(talk);
                                            navigate('/talk-details', {
                                                state: {
                                                    from: 'simposios',
                                                    ...simposio,
                                                    descripcion: simposio.objetivo,
                                                    salon: simposio.salon,
                                                },
                                            });
                                        }}
                                        className="cursor-pointer rounded-xl px-5 py-4 w-full shadow-md flex items-center gap-4 mt-4 bg-[#E6E6E6]"
                                    >
                                        {/* Hora */}
                                        <div className="w-16 text-right pr-1">
                                            <span className="text-[#29568E] font-extrabold text-2xl">
                                                {formatoHora(talk.hora_inicio)}
                                            </span>
                                        </div>

                                        {/* Línea vertical */}
                                        <div className="w-1 h-12 bg-secondyellow rounded-sm" />

                                        {/* Info */}
                                        <div className="flex-1 flex flex-col justify-center pl-2">
                                            <span className="text-thirdblue font-bold text-xl leading-tight">
                                                {talk.nombre}
                                            </span>
                                            <span className="text-gray-700 text-sm font-medium">
                                                {talk.jefe}
                                            </span>
                                            <span
                                                className="text-white text-xs font-semibold px-2 py-1 rounded-full mt-2 self-end"
                                                style={{
                                                    backgroundColor: colors.bg,
                                                    color: colors.text,
                                                }}
                                            >
                                                simposios
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </main>
            </div>
        )
    );
}

export default Simposios;