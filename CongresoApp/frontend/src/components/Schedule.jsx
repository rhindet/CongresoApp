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
  'presentaciones orales': { bg: '#85A899', text: '#0b5345' },
  magistral: { bg: '#E0B7B1', text: '#a93226' },
  simposio: { bg: '#B6A6CA', text: '#5b2c6f' },
};

// -------- Helpers de hora/ordenación/dedupe --------
const isOral = (talk) =>
  talk?.tipo && talk.tipo.toLowerCase() === 'presentaciones orales';

const getStartHHMMFromHoraGnrl = (hora_gnrl) => {
  const m = String(hora_gnrl || '').match(/(\d{1,2}:\d{2})/);
  return m ? m[1] : null;
};

// Devuelve un timestamp para ordenar. Para orales usa el primer hh:mm de hora_gnrl.
const toSortTime = (talk, day) => {
  if (talk?.hora_inicio) {
    return new Date(`${talk.hora_inicio}Z`).getTime();
  }
  if (isOral(talk) && talk?.hora_gnrl) {
    const hhmm = getStartHHMMFromHoraGnrl(talk.hora_gnrl);
    if (hhmm) {
      // ⚠️ Ajusta la fecha base si tu evento no es 2025-10
      const iso = `2025-10-${day.padStart(2, '0')}T${hhmm}:00Z`;
      return new Date(iso).getTime();
    }
  }
  return Number.POSITIVE_INFINITY;
};

// Clave para deduplicar consistente con la hora normalizada
const uniqueKeyFor = (talk, day) => {
  const titulo = talk.ponencia || talk.nombre || '';
  return `${toSortTime(talk, day)}-${titulo}`;
};

// Formatea hora_inicio ISO a HH:mm
const formatoHora = (isoString) => {
  if (!isoString) return '';
  const dateStringUTC = isoString.includes('Z') || isoString.includes('+') ? isoString : `${isoString}Z`;
  const date = new Date(dateStringUTC);
  const horas = date.getUTCHours();
  const minutos = date.getUTCMinutes();
  return `${horas}:${minutos.toString().padStart(2, '0')}`;
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
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    const FetchAllEvents = async () => {
      window.scrollTo(0, 0);
      try {
        // OBTENCION DE TODOS LOS EVENTOS (Simposios, Magistrales, Orales)
        const listEventsPaso = await apiRequest.getAllEvents();
        setListDeEventos(listEventsPaso || []);

        console.log(listEventsPaso)

       // 🔹 Arreglo global para todos los departamentos únicos
const todosDepartamentosSet = new Set();

for (let i = 0; i < listEventsPaso.length; i++) {
  const evento = listEventsPaso[i];
  const dias = evento?.dia;

  if (!Array.isArray(dias) || dias.length === 0) {
    console.log(`🚫 Evento ${i + 1} (${evento?.nombre ?? 'sin nombre'}) sin propiedad 'dia'`);
    continue;
  }

  console.log(`\n🧩 Evento ${i + 1}: ${evento?.nombre ?? '(sin nombre)'}`);

  // 🔹 Recolector de departamentos únicos por evento
  const departamentosSet = new Set();

  // Recorremos cada día (fecha_9, fecha_10, etc.)
  dias.forEach((diaObj, idx) => {
    const [clave, contenido] = Object.entries(diaObj ?? {})[0] || [];
    if (!clave || !contenido || typeof contenido !== "object") return;

    const departamentos = Object.keys(contenido);
    console.log(`→ dia[${idx}] clave: ${clave}; departamentos: ${departamentos.join(", ")}`);

    // Agregar al set local y global
    departamentos.forEach(dep => {
      departamentosSet.add(dep);
      todosDepartamentosSet.add(dep);
    });
  });

  // 🔹 Array único por evento
  const departamentosUnicosEvento = Array.from(departamentosSet);
  console.log("✅ Departamentos únicos combinados:", departamentosUnicosEvento);
}

// 🔹 Convertimos el Set global en un array único final
const todosDepartamentosUnicos = Array.from(todosDepartamentosSet).sort((a, b) =>
  a.localeCompare(b, 'es')
);

console.log("\n🌎 TODOS LOS DEPARTAMENTOS ÚNICOS FINALES:", todosDepartamentosUnicos);


        //for (let i = 0; i < listEventsPaso.length; i++) {
        //   console.log(listEventsPaso)
        // }


        // Departamentos únicos (mantén "Pláticas Magistrales" primero si existe)
        const allDepartamentos = [...new Set((listEventsPaso || []).map(s => s.departamento).filter(Boolean))];
const departamentosCombinadosSet = new Set([
  ...allDepartamentos,
  ...todosDepartamentosSet,
]);

// 4️⃣ Convertir en array y ordenar alfabéticamente
const departamentosCombinados = Array.from(departamentosCombinadosSet).sort((a, b) =>
  a.localeCompare(b, 'es')
);

console.log("✅ Departamentos directos:", allDepartamentos);
console.log("✅ Departamentos anidados:", Array.from(todosDepartamentosSet));
console.log("🌎 Departamentos combinados finales:", departamentosCombinados);




        const otros = departamentosCombinados
          .filter(dep => dep !== 'Pláticas Magistrales')
          .sort((a, b) => a.localeCompare(b));

        const ordenados = [];
        if (departamentosCombinados.includes('Pláticas Magistrales')) {
          ordenados.push('Pláticas Magistrales');
        }
        ordenados.push(...otros);

        setDepartamentos(ordenados);
        setLoader(false);
      } catch (error) {
        console.error('Error al obtener eventos:', error);
        setLoader(false);
      }
    };

    FetchAllEvents();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Opciones del filtro de categoría
  const categoryOptions = [
    { label: 'Todos', value: 'Todos' },
    ...departamentos.map(dep => ({ label: dep, value: dep }))
  ];

  // --- SE FILTRAN POR DÍA Y CATEGORÍA (Default: Todas) Y SE ORDENAN POR HORA ---
  const filteredTalks = (() => {

    // 1) Filtrar por día seleccionado
    const talksForDay = listDeEventos.filter((talk) => {
      // Orales: usar primer hh:mm de hora_gnrl
      if (isOral(talk) && talk.hora_gnrl) {
        const hhmm = getStartHHMMFromHoraGnrl(talk.hora_gnrl);
        if (!hhmm) return false;
        const dateTemp = new Date(`2025-10-${day.padStart(2, '0')}T${hhmm}:00Z`);
        const dia = dateTemp.getUTCDate().toString().padStart(2, '0');
        return dia === day.padStart(2, '0');
      }
      // Resto: usar hora_inicio
      if (talk.hora_inicio) {
        const dia = new Date(`${talk.hora_inicio}Z`).getUTCDate().toString().padStart(2, '0');
        return dia === day.padStart(2, '0');
      }
      return false;
    });

   // 2) Dedupe para "Todos" con clave basada en la hora normalizada
let processedTalks;
if (selectedCategory === 'Todos') {
  const uniqueMap = new Map();
  talksForDay.forEach((talk) => {
    const key = uniqueKeyFor(talk, day);
    if (!uniqueMap.has(key)) uniqueMap.set(key, talk);
  });
  processedTalks = Array.from(uniqueMap.values());
} else {
  // 3) Filtra por departamento: para orales busca el dep en dia[fecha_X]
  processedTalks = talksForDay.filter((talk) => {
    // No-orales: campo plano
    if (!isOral(talk)) return talk.departamento === selectedCategory;

    // Orales: revisar si en el día seleccionado existe ese departamento
    const dias = Array.isArray(talk.dia) ? talk.dia : [];
    const targetKey = `fecha_${day}`;
    const entry = dias.find((d) => Object.prototype.hasOwnProperty.call(d, targetKey));
    if (!entry) return false;

    const departamentosObj = entry[targetKey] || {};
    const departamentosDelDia = Object.keys(departamentosObj);
    return departamentosDelDia.includes(selectedCategory);
  });
}

// 4) Ordena por hora normalizada (sirve para orales y no-orales)
return processedTalks.sort((a, b) => toSortTime(a, day) - toSortTime(b, day));
  })();





  

  const getEventDetails = async (talk) => {
    const eventDetails = await apiRequest.getEvent(talk.id);
    return eventDetails;
  };

  return (
    loader ? <Loader /> : (
      <div className="min-h-dvh w-full overflow-x-hidden">
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
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-yellow-100 text-secondblue' : 'text-gray-800'}`
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
                Sin eventos de {selectedCategory} este día.
              </p>
            ) : (
              filteredTalks.map((talk, index) => {
                const tpKey = (talk.tipo || '').toLowerCase();

                if (talk.tipo == 'presentaciones orales') {
                  console.log(talk)
                }

                const colors = tpColorStyles[tpKey] || { bg: '#67647', text: '#333' };

                return (
                  <div
                    key={index}
                    onClick={async () => {
                      setLoader(true);
                      try {
                        if (tpKey === 'simposio') {
                          const eventDetails = await getEventDetails(talk);
                          navigate('/talk-details-simposio', {
                            state: {
                              from: '/schedule',
                              ...eventDetails,
                              descripcion: eventDetails.objetivo,
                              salon: eventDetails.salon,
                            },
                          });
                        } else if (tpKey === 'magistral') {
                          const magistral = await apiRequest.getMagistral(talk.id);
                          navigate('/talk-details-magistrales', {
                            state: {
                              from: '/schedule',
                              ...magistral,
                              descripcion: magistral.semblanza,
                              salon: magistral.salon,

                            },
                          });
                        } else if (tpKey === 'presentaciones orales') {
                          //const eventDetails = await getEventDetails(talk);
                          navigate('/talk-details-Platicas-orales2', {
                            state: {
                              talk,
                              salon: "eventDetails.salon",
                              selectedDay: day
                            },
                          });
                        }
                      } finally {
                        setLoader(false);
                      }
                    }}
                    className="cursor-pointer rounded-xl px-5 py-4 w-full shadow-md flex items-center gap-4 mt-4 bg-[#E6E6E6]"
                  >
                    {/* Hora */}
                    <div className="w-16 text-right pr-1">
                      <span className="text-[#29568E] font-extrabold text-2xl">
                        {formatoHora(talk.hora_inicio) ||
                          getStartHHMMFromHoraGnrl(talk.hora_gnrl) ||
                          ''}
                      </span>
                    </div>

                    {/* Línea vertical */}
                    <div className="w-1 h-12 bg-secondyellow rounded-sm" />

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-center pl-2">
                      <span className="text-thirdblue font-bold text-xl leading-tight">
                        {talk.ponencia || talk.nombre}
                      </span>
                      <span className="text-gray-700 text-sm font-medium">
                        {talk.ponente}
                      </span>
                      <span
                        className="text-white text-xs font-semibold px-2 py-1 rounded-full mt-2 self-end"
                        style={{ backgroundColor: colors.bg, color: colors.text }}
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
    )
  );
}