import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderMobile from '../../modules/HeaderMobile';
import HeaderDesktop from '../../modules/HeaderDesktop';
import { ApiRequests } from '../../core/ApiRequests';
import Loader from '../../modules/Loader';
// 💡 IMPORTACIONES AÑADIDAS PARA EL FILTRO DE CATEGORÍA
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';

const tpColorStyles = {
    'simposios': {
        bg: '#B6A6CA',
        text: '#5b2c6f',
    },
};

function Simposios() {
    const [day, setDay] = useState('9');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    
    const [listDeSimposios, setListDeSimposios] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSimposios = async () => {
            const apiRequest = new ApiRequests();
            window.scrollTo(0, 0);
            try {
                const allSimposios = await apiRequest.getAllSimposios();
                setListDeSimposios(allSimposios);

                // 💡 LÓGICA: Extraer departamentos únicos de los simposios
                const departamentosUnicos = [
                    ...new Set(allSimposios.map(s => s.departamento).filter(Boolean))
                ].sort((a, b) => a.localeCompare(b));

                setDepartamentos(departamentosUnicos);
            } catch (error) {
                console.error('Error al obtener simposios:', error);
            } finally {
                setLoader(false);
            }
        };
        fetchSimposios();
    }, []);

    // Cálculo de categorias
    const categoryOptions = [
        { label: 'Todos', value: 'Todos' },
        ...departamentos.map(dep => ({
            label: dep,
            value: dep
        }))
    ];

    const formatoHora = (isoString) => {
        if (!isoString) return "";
        const dateStringUTC = isoString.includes('Z') || isoString.includes('+') ? isoString : `${isoString}Z`;
        const date = new Date(dateStringUTC);
        const horas = date.getUTCHours();
        const minutos = date.getUTCMinutes();
        return `${horas}:${minutos.toString().padStart(2, '0')}`;
    };

    // FILTROS
    const filteredTalks = Array.from( 
        listDeSimposios
            // 1. Filtro por día
            .filter(talk => {
                const dia = new Date(`${talk.hora_inicio}Z`).getUTCDate().toString();
                return dia === day;
            })
            // 2. Nuevo: Filtro por categoría/departamento
            .filter(talk => {
                return selectedCategory === 'Todos' || talk.departamento === selectedCategory;
            })
            // 3. Crear un mapa con simposios únicos (misma lógica que antes)
            .reduce((map, talk) => {
                const uniqueKey = `${talk.hora_inicio}-${talk.ponencia || talk.nombre}`;
                if (!map.has(uniqueKey)) {
                    map.set(uniqueKey, talk);
                }
                return map;
            }, new Map())
            // 4. Obtenemos solo los valores (simposios unicos) del mapa
            .values() 
    )
    // 5. Ordenar el array de simposios únicos por hora
    .sort((a, b) => new Date(a.hora_inicio).getTime() - new Date(b.hora_inicio).getTime());

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

                    {/* FILTRO CATEGORIAS */}
                    <div className="mb-3 relative w-72">
                        <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-pointer rounded-xl bg-white py-3 pl-4 pr-10 text-left border border-[#B1B1B4] shadow-md 
                                focus:outline-none focus:ring-2 focus:ring-secondyellow text-thirdblue font-semibold text-base">
                                    <span className="block truncate">{selectedCategory}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                        <ChevronUpDownIcon className="h-5 w-5 text-firstblue" aria-hidden="true" />
                                    </span>
                                </Listbox.Button>

                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
                                    {categoryOptions.map((option) => (
                                        <Listbox.Option
                                            key={option.value}
                                            className={({ active }) =>
                                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-yellow-100 text-secondblue' : 'text-gray-800'
                                                }`
                                            }
                                            value={option.value}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                        {option.label}
                                                    </span>
                                                    {selected && (
                                                        <span className="absolute left-3 inset-y-0 flex items-center text-secondyellow">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </div>
                        </Listbox>
                    </div>

                    {/* Lista de simposios */}
                    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                        {filteredTalks.length === 0 ? (
                            <p className="text-center text-gray-600 col-span-full text-lg font-medium mt-10">
                                No hay simposios de {selectedCategory} para este día.
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
                                            navigate('/talk-details-simposio', {
                                                state: {
                                                    from: '/simposios',
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
                                            {/* El nombre del jefe está comentado, lo mantengo así */}
                                            {/* <span className="text-gray-700 text-sm font-medium">
                                                {talk.jefe}
                                            </span> */}
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