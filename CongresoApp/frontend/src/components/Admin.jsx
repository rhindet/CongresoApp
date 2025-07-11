import { useState, useEffect } from 'react';
import HeaderMobile from '../modules/HeaderMobile';
import HeaderDesktop from '../modules/HeaderDesktop';
import { ApiRequests } from '../core/ApiRequests';
import Loader from '../modules/Loader';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import { ArrowUpOnSquareStackIcon } from '@heroicons/react/24/outline';


const tpColorStyles = {
  'presentaciones orales': {
    bg: '#5F8575',
    text: '#0b5345',
  },
  'platicas magistrales': {
    bg: '#E0B7B1',
    text: '#a93226',
  },
  'simposios': {
    bg: '#B6A6CA',
    text: '#5b2c6f',
  },
  'taller': {
    bg: '#EE8EA9',
    text: '#D23A65',
  },
};


export default function Admin() {
  const [day, setDay] = useState('9');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const apiRequest = new ApiRequests();
  const [listDeSimposios, setListDeSimposios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [loader, setLoader] = useState(true);
  const [setScrollY] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [aviso, setAviso] = useState({
    titulo: '', 
    descripcion: '',
    hora: '',
  });


  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    const getSimposios = async () => {
      window.scrollTo(0, 0);
      try {
        //OBTENCION DE TODAS LAS PLATICAS
        const listDeSimposios = await apiRequest.getAllSimposios();
        console.log(listDeSimposios)
        setListDeSimposios(listDeSimposios);
        // Extraer departamentos únicos
        const departamentosUnicos = [
          ...new Set(listDeSimposios.map(s => s.departamento).filter(Boolean))
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

  //SE FILTRAN LOS SIMPOSIOS POR DIA Y CATEGORIA(DEFECTO:TODAS)
  const filteredTalks = listDeSimposios.filter(talk => {
    const fecha = talk.hora_inicio?.split('T')[0]; // "2025-10-09"
    const dia = fecha?.split('-')[2];

    return (
      dia === day.padStart(2, '0') &&
      (selectedCategory === 'Todos' || talk.departamento === selectedCategory)
    );

  });

  return (
    loader ? <Loader /> : <div className="min-h-dvh w-full bg-[#9fd8e9] overflow-x-hidden">
      <HeaderMobile backLink="/home" title="**** ADMIN ****" />

      <div className="hidden md:block">
        <HeaderDesktop backLink="/home" />
      </div>

      {/* Botón de subir Avisos */}
      <div className="fixed top-3.5 md:top-8 right-20 z-70">
        <button
          onClick={() => setMostrarModal(true)}
          className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#f2f2f2] transition"
        >
          <ArrowUpOnSquareStackIcon className='w-8 text-[#29568E] hover:text-[#876EE4]' />
        </button>
      </div>

      <main className="pt-20 pb-20 min-h-screen flex flex-col items-center w-full px-4">
        {/* Selector de día */}
        <div className="flex justify-center gap-4 mb-4">
          {['9', '10'].map((d) => (
            <button
              key={d}
              onClick={() => setDay(d)}
              className={`px-10 py-3 rounded-full font-semibold text-white transition md:px-30
              ${day === d ? 'bg-yellow-400 text-white' : 'bg-gray-300 text-gray-600'}`}
            >
              {d} Octubre
            </button>
          ))}
        </div>

        {/* Filtro de categoría */}
        <div className="mb-3 relative w-72">
          <label className="block my-3 text-[#29568E] font-bold text-lg text-center">
            Filtrar por departamentos
          </label>
          <Listbox value={selectedCategory} onChange={setSelectedCategory}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-pointer rounded-xl bg-white py-3 pl-4 pr-10 text-left border border-[#B1B1B4] shadow-md 
          focus:outline-none focus:ring-2 focus:ring-yellow-400 text-[#29568E] font-semibold text-base">
                <span className="block truncate">{selectedCategory}</span>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <ChevronUpDownIcon className="h-5 w-5 text-[#29568E]" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
                {categoryOptions.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-yellow-100 text-[#29568E]' : 'text-gray-800'
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
                          <span className="absolute left-3 inset-y-0 flex items-center text-yellow-500">
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
        <h2 className="text-2xl font-bold text-blue-900 mb-1 text-center">

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
              const colors = tpColorStyles[tpKey] || { bg: '#CCC', text: '#333' };
              return (
                <div
                  key={index}

                  className="cursor-pointer rounded-xl px-5 py-4 w-full shadow-md flex items-center gap-4 mt-4"
                  style={{ backgroundColor: '#E6E6E6' }}
                >
                  <div className="flex-1 flex flex-col justify-center pl-2">
                    <span className="text-[#29568E] font-bold text-xl leading-tight">
                      {talk.nombre}
                    </span>
                    <span className="text-gray-700 text-sm font-medium">
                      {talk.jefe}
                    </span>

                    {/* Campo para ingresar link de YouTube */}
                    <input
                      type="text"
                      placeholder="Link de YouTube"
                      value={talk.videoUrl || ''}
                      onChange={(e) => {
                        const newList = listDeSimposios.map((simposio) =>
                          simposio._id === talk._id
                            ? { ...simposio, videoUrl: e.target.value }
                            : simposio
                        );
                        setListDeSimposios(newList);
                      }}
                      className="mt-2 p-1 text-sm border border-gray-300 rounded-md"
                    />

                    {/* Botón para guardar */}
                    <button
                      onClick={async () => {
                        const simposioActual = listDeSimposios.find(s => s._id === talk._id);
                        try {
                          await apiRequest.updateSimposio(talk._id, {
                            videoUrl: simposioActual.videoUrl,
                          });
                          alert('Link guardado correctamente');
                        } catch (error) {
                          alert('Error al guardar el link');
                          console.error(error);
                        }
                      }}
                      className="mt-2 px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded-md w-30"
                    >
                      Guardar link
                    </button>

                    {/* Etiqueta tipo de charla */}
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

      {/* MODAL DE AVISOS PARA SUBIR */}
      {mostrarModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">

            <h2 className="text-xl font-bold text-[#29568E] mb-4">Nuevo aviso</h2>

            <label className="block text-sm text-gray-700 mb-1">Título</label>
            <input
              type="text"
              value={aviso.titulo}
              onChange={(e) => setAviso({ ...aviso, titulo: e.target.value })}
              className="w-full p-2 border rounded-md mb-3"
            />

            <label className="block text-sm text-gray-700 mb-1">Descripción</label>
            <textarea
              value={aviso.descripcion}
              onChange={(e) => setAviso({ ...aviso, descripcion: e.target.value })}
              className="w-full p-2 border rounded-md mb-3"
            />

            <label className="block text-sm text-gray-700 mb-1">Hora</label>
            <input
              type="time"
              value={aviso.hora}
              onChange={(e) => setAviso({ ...aviso, hora: e.target.value })}
              className="w-full p-2 border rounded-md mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setMostrarModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={async () => {
                  // Aquí puedes hacer la llamada a la API si ya la tienes lista
                  console.log('Aviso enviado:', aviso);
                  setMostrarModal(false);
                  setAviso({ titulo: '', descripcion: '', hora: '' });
                }}
                className="px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
              >
                Publicar
              </button>
            </div>

            {/* Botón de cerrar arriba a la derecha */}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setMostrarModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
