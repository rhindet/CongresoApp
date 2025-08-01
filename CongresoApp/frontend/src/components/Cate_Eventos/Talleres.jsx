import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderMobile from '../../modules/HeaderMobile';
import HeaderDesktop from '../../modules/HeaderDesktop';
import { ApiRequests } from '../../core/ApiRequests';
import Loader from '../../modules/Loader';

const tpColorStyles = {
    'taller': {
        bg: '#EE8EA9',
        text: '#D23A65',
    },
};

function Talleres() {
    const [day, setDay] = useState('9');
    const [listDeSimposios, setListDeSimposios] = useState([]);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSimposios = async () => {
            const apiRequest = new ApiRequests(); // ← definido dentro del efecto
            window.scrollTo(0, 0);
            try {
                const allSimposios = await apiRequest.getAllTalleres();
                setListDeSimposios(allSimposios);
            } catch (error) {
                console.error('Error al obtener magistrales:', error);
            } finally {
                setLoader(false);
            }
        };
        fetchSimposios();
    }, []);

    const formatoHora = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        const horas = date.getHours();
        const minutos = date.getMinutes();
        return `${horas}:${minutos.toString().padStart(2, '0')}`;
    };

    const filteredTalks = listDeSimposios.filter(talk => {
        const dia = talk.hora_inicio?.split('T')[0]?.split('-')[2];
        return dia === day.padStart(2, '0');
    });

    const getSimposio = async (talk) => {
        const apiRequest = new ApiRequests();
        return await apiRequest.getTaller(talk.id);
    };

    return (
        loader ? <Loader /> : (
            <div className="min-h-dvh w-full overflow-x-hidden">
                <HeaderMobile backLink="/events" title="Talleres" />
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
                                            ${day === d ? 'bg-yellow-400 text-white' : 'bg-[#999999]'}`}
                            >
                                {d} Octubre
                            </button>
                        ))}
                    </div>

                    {/* Lista de POs */}
                    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                        {filteredTalks.length === 0 ? (
                            <p className="text-center text-gray-600 col-span-full text-lg font-medium mt-10">
                                No hay talleres para este día.
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
                                                    from: 'talleres',
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
                                        <div className="w-1 h-12 bg-yellow-400 rounded-sm" />

                                        {/* Info */}
                                        <div className="flex-1 flex flex-col justify-center pl-2">
                                            <span className="text-[#29568E] font-bold text-xl leading-tight">
                                                {talk.nombre}
                                            </span>
                                            <span className="text-gray-700 text-sm font-medium">
                                                {talk.jefe}
                                            </span>
                                            <span
                                                className="text-white text-xs font-semibold px-2 py-1 rounded-full mt-2 self-end"
                                                style={{
                                                     backgroundColor: tpColorStyles['taller'].bg,
                                                     color: tpColorStyles['taller'].text,
                                                }}
                                            >
                                                Talleres
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

export default Talleres;
