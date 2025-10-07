/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderMobile from '../modules/HeaderMobile';
import HeaderDesktop from '../modules/HeaderDesktop';
import { ApiRequests } from '../core/ApiRequests';
import Loader from '../modules/Loader';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';


const tpColorStyles = {
  'presentacion oral': {
    bg: '#85A899',
    text: '#0b5345',
  },
  'magistral': {
    bg: '#E0B7B1',
    text: '#a93226',
  },
  'simposio': {
    bg: '#B6A6CA',
    text: '#5b2c6f',
  },
};


export default function Schedule() {
  const [day, setDay] = useState('9');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const navigate = useNavigate();
  const apiRequest = new ApiRequests();

  const [listDeEventos, setListDeEventos] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [loader, setLoader] = useState(true);
  const [scrollY, setScrollY] = useState(0);


  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    const FetchAllEvents = async () => {
      window.scrollTo(0, 0);
      try {
        //OBTENCION DE TODOS LOS EVENTOS (Simposios, Magsitrales, Orales)
        const listEventsPaso = await apiRequest.getAllEvents();
        console.log("listEventsPaso", listEventsPaso);
        setListDeEventos(listEventsPaso);

        // Extraer todos los departamentos únicos
        const allDepartamentos = [...new Set(listEventsPaso.map(s => s.departamento).filter(Boolean))];

        // Filtrar los otros departamentos y ordenarlos alfabéticamente
        const otrosDepartamentos = allDepartamentos
          .filter(dep => dep !== 'Pláticas Magistrales')
          .sort((a, b) => a.localeCompare(b));

        // Crear la lista final en el orden deseado: Platicas Magistrales primero, luego el resto.
        const departamentosOrdenados = [];
        if (allDepartamentos.includes('Pláticas Magistrales')) {
          departamentosOrdenados.push('Pláticas Magistrales');
        }
        departamentosOrdenados.push(...otrosDepartamentos);

        setDepartamentos(departamentosOrdenados);
        setLoader(false);

      } catch (error) {
        console.error('Error al obtener simposios:', error);
      }
    };

    FetchAllEvents();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cálculo de categorias
  const categoryOptions = [
    { label: 'Todos', value: 'Todos' },
    ...departamentos.map(dep => ({
      label: dep,
      value: dep
    }))
  ];

  //FORMATEO DE HORA
  const formatoHora = (isoString) => {
    if (!isoString) return "";

    const dateStringUTC = isoString.includes('Z') || isoString.includes('+') ? isoString : `${isoString}Z`;
    const date = new Date(dateStringUTC);

    // Usamos getUTCHours y getUTCMinutes para obtener la hora sin desfase local
    const horas = date.getUTCHours();
    const minutos = date.getUTCMinutes();

    return `${horas}:${minutos.toString().padStart(2, '0')}`;
  };

  //SE FILTRAN POR DIA Y CATEGORIA (Default: Todas) Y SE ORDENAN POR HORA 
  const filteredTalks = (() => {
    // 1. Filtra los eventos por el día seleccionado.
    const talksForDay = listDeEventos.filter(talk => {
      const dia = new Date(`${talk.hora_inicio}Z`).getUTCDate().toString().padStart(2, '0');
      return dia === day.padStart(2, '0');
    });

    let processedTalks;

    // 2. Si la categoría es "Todos", elimina los duplicados.
    if (selectedCategory === 'Todos') {
      const uniqueTalks = new Map();
      talksForDay.forEach(talk => {
        // Se crea una clave única para cada evento basada en la hora y el título.
        const uniqueKey = `${talk.hora_inicio}-${talk.ponencia || talk.nombre}`;

        if (!uniqueTalks.has(uniqueKey)) {
          uniqueTalks.set(uniqueKey, talk);
        }
      });
      processedTalks = Array.from(uniqueTalks.values());

    } else {
      // 3. Si se selecciona un departamento, filtra por ese departamento.
      processedTalks = talksForDay.filter(talk => talk.departamento === selectedCategory);
    }

    // 4. Ordena la lista resultante por hora de inicio.
    return processedTalks.sort((a, b) => new Date(a.hora_inicio).getTime() - new Date(b.hora_inicio).getTime());
  })();

  const getEventDetails = async (talk) => {
    console.log(talk.id)
    const eventDetails = await apiRequest.getEvent(talk.id);
    return eventDetails;
  }




  return (
    loader ? <Loader /> : <div className="min-h-dvh w-full overflow-x-hidden">
      <HeaderMobile backLink="/home" title="Horarios" />

      <div className="hidden md:block">
        <HeaderDesktop backLink="/home" />
      </div>

      <main className="pt-20 pb-20 min-h-screen flex flex-col items-center w-full px-4">
        {/* Selector de día */}
        <div className="flex justify-center gap-4 mb-4">
          {['9', '10'].map((d) => (
            <button
              key={d}
              onClick={() => setDay(d)}
              className={`px-10 py-3 rounded-full font-semibold text-white transition md:px-30
              ${day === d ? 'bg-secondyellow text-white' : 'bg-normal-gray'}`}
            >
              {d} Octubre
            </button>
          ))}
        </div>

        {/* Filtro de categoría */}
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

        {/* Lista de conferencias */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-4">

          {filteredTalks.length === 0 ? (
            <p className="text-center text-gray-600 col-span-full text-lg font-medium mt-10">
              Sin eventos de {selectedCategory} este dia.
            </p>

          ) : (

            filteredTalks.map((talk, index) => {
              //Obtiene la clave de color del tipo de evento
              const tpKey = talk.tipo?.toLowerCase();
              const colors = tpColorStyles[tpKey] || { bg: '#67647', text: '#333' };

              return (
                <div
                  key={index}
                  onClick={async () => {
                    setLoader(true);
                    const eventDetails = await getEventDetails(talk);
                    setLoader(true);

                    //Ajusta los campos para la navegación
                    if (tpKey == 'simposio') {
                      navigate('/talk-details-simposio', {
                        state: {
                          from: '/schedule',
                          ...eventDetails,
                          descripcion: eventDetails.objetivo,
                          salon: eventDetails.salon,
                        },
                      });
                    }

                    if (tpKey === 'magistral') {
                      const magistral = await apiRequest.getMagistral(talk.id);
                      navigate('/talk-details-magistrales', {
                        state: {
                          from: '/schedule',
                          ...magistral,
                          descripcion: magistral.semblanza,
                          salon: magistral.salon,
                        },
                      });
                    }

                    if (tpKey == 'presentacion oral') {
                      navigate('/talk-details-presentaciones', {
                        state: {
                          ...eventDetails,
                          descripcion: eventDetails.objetivo,
                          salon: eventDetails.salon,
                        },
                      });
                    }


                  }}
                  className="cursor-pointer rounded-xl px-5 py-4 w-full shadow-md flex items-center gap-4 mt-4 bg-[#E6E6E6]"
                >

                  {/* Hora */}
                  <div className="w-16 text-right pr-1">
                    <span className="text-[#29568E] font-extrabold text-2xl">
                      {`${formatoHora(talk.hora_inicio)}`}
                    </span>
                  </div>

                  {/* Línea vertical */}
                  <div className="w-1 h-12 bg-secondyellow rounded-sm" />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-center pl-2">
                    {/* 💡 Títulos: 
                      'nombre' para Simposio
                      'ponencia' para Magistrales,
                    */}
                    <span className="text-thirdblue font-bold text-xl leading-tight">
                      {talk.ponencia || talk.nombre}
                    </span>

                    {/* 💡 Ponente: 
                      'jefe' para Simposio
                      'ponente' para Magistrales
                      'nombre_ponencia' para Orales
                    */}
                    <span className="text-gray-700 text-sm font-medium">
                      {talk.ponente}
                    </span>

                    {/* Etiqueta tipo de charla */}
                    <span
                      className="text-white text-xs font-semibold px-2 py-1 rounded-full mt-2 self-end"
                      style={{
                        backgroundColor: colors.bg,
                        color: colors.text,
                      }}
                    >
                      {talk.tipo}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
