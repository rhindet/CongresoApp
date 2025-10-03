import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderMobile from '../modules/HeaderMobile';
import HeaderDesktop from '../modules/HeaderDesktop';
import { ApiRequests } from '../core/ApiRequests';
import Loader from '../modules/Loader';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';


const tpColorStyles = {
  'presentaciones orales': {
    bg: '#5F8575',
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
  const [listDeSimposios, setListDeSimposios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [loader, setLoader] = useState(true);
  const [setScrollY] = useState(0);


  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    const getSimposios = async () => {
      window.scrollTo(0, 0);
      try {
        //OBTENCION DE TODAS LAS PLATICAS
        const listDeSimposiosPaso = await apiRequest.getAllEvents();
        console.log("listDeSimposiosPaso")
        console.log(listDeSimposiosPaso)
        setListDeSimposios(listDeSimposiosPaso);
        // Extraer departamentos únicos
        const departamentosUnicos = [
          ...new Set(listDeSimposiosPaso.map(s => s.departamento).filter(Boolean))
        ].sort((a, b) => a.localeCompare(b));
        setDepartamentos(departamentosUnicos);
        setLoader(false)

      } catch (error) {
        console.error('Error al obtener simposios:', error);
      }
    };
    getSimposios();

  }, []);

  const categoryOptions = [
    { label: 'Todos', value: 'Todos' },
    ...departamentos.map(dep => ({
      label: dep,
      value: dep
    }))
  ];

  // Función para convertir ISO string a "H:mm"
  const formatoHora = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const horas = date.getHours();    // 0-23
    const minutos = date.getMinutes(); // 0-59

    return `${horas}:${minutos.toString().padStart(2, '0')}`;
  };

  //SE FILTRAN POR DIA Y CATEGORIA(DEFECTO:TODAS) y se ordenan por hora 
  const filteredTalks = listDeSimposios
  .filter(talk => {
    const dia = new Date(talk.hora_inicio).getDate().toString().padStart(2, '0');

    return (
      dia === day.padStart(2, '0') &&
      (selectedCategory === 'Todos' || talk.departamento === selectedCategory)
    );
  })
  .sort((a,b) => new Date(a.hora_inicio).getTime() - new Date(b.hora_inicio).getTime());


  const getSimposio = async (talk) => {
    console.log(talk.id)
    const simposio = await apiRequest.getSimposio(talk.id);
    return simposio;
  }

  const getEvent = async (talk) => {
    console.log(talk.id)
    const simposio = await apiRequest.getEvent(talk.id);
    return simposio;
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
          <label className="block my-3 text-secondblue font-bold text-lg text-center">
            Filtrar por departamentos
          </label>
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

        {/* Título categoría */}
        <h2 className="text-2xl font-bold text-firstblue mb-1 text-center">

          {selectedCategory === 'Todos'
            ? 'Todos las departamentos'
            : departamentos[selectedCategory]}
        </h2>

        {/* Lista de conferencias */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-4">

          {filteredTalks.length === 0 ? (
            <p className="text-center text-gray-600 col-span-full text-lg font-medium mt-10">
              Sin eventos de {selectedCategory} este dia.
            </p>
          ) : (
            filteredTalks.map((talk, index) => {
              const tpKey = "simposios";
              const colors = tpColorStyles[tpKey] || { bg: '#67647', text: '#333' };
              return (
                <div
                  key={index}
                  onClick={async () => {
                    setLoader(true);
                    const simposio = await getEvent(talk);
                    setLoader(true);
                    navigate('/talk-details', {
                      state: {
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
                      {`${formatoHora(talk.hora_inicio)}`}
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

                    {/* Etiqueta tipo de charla */}
                    <span
                      className="text-white text-xs font-semibold px-2 py-1 rounded-full mt-2 self-end"
                      style={{
                        backgroundColor: tpColorStyles[talk.tipo].bg,
                        color: tpColorStyles[talk.tipo].text,
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
