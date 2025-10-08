import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderMobile from '../../modules/HeaderMobile';
import HeaderDesktop from '../../modules/HeaderDesktop';
import { ApiRequests } from '../../core/ApiRequests';
import Loader from '../../modules/Loader';
// import { PresentacionesModelo } from '../../models/presentacionesModelo'; // no es necesario si ya te llega normalizado

const tpColorStyles = {
  presentaciones_orales: { bg: '#85A899', text: '#0b5345' },
};

// --- helpers de hora/fecha ---
const parseStartMinutes = (hora) => {
  if (!hora) return Number.POSITIVE_INFINITY;
  const m = String(hora).match(/(\d{1,2}):(\d{2})/);
  if (!m) return Number.POSITIVE_INFINITY;
  const h = Number(m[1]); const mm = Number(m[2]);
  return h * 60 + mm;
};
const getStartHourLabel = (hora) => {
  if (!hora) return '';
  const m = String(hora).match(/(\d{1,2}:\d{2})/);
  return m ? m[1] : String(hora);
};

// --- APLANA la estructura por día: devuelve { '9': [...], '10': [...] } ---
function flattenByDay(models = []) {
  const byDay = { '9': [], '10': [] };

  for (const m of models) {
    const nombre_modulo = m?.nombre ?? m?.nombre_modulo ?? 'Módulo';
    const hora_gnrl = m?.hora_gnrl ?? m?.hora ?? '';
    const salon_gnrl = m?.salon ?? '';
    const dias = Array.isArray(m?.dia) ? m.dia : [];

    for (const dayObj of dias) {
      if (!dayObj || typeof dayObj !== 'object') continue;

      // ejemplo keys: "fecha_9", "fecha_10"
      const key = Object.keys(dayObj)[0];
      if (!key) continue;
      const dayNumMatch = key.match(/\d+/);
      if (!dayNumMatch) continue;
      const dayNum = dayNumMatch[0]; // '9' | '10'

      const porDepto = dayObj[key]; // { 'Anatomía': [...], 'Odontología': [...] }
      if (!porDepto || typeof porDepto !== 'object') continue;

      for (const depto of Object.keys(porDepto)) {
        const lista = porDepto[depto] || [];
        // Cada item puede traer sus campos (id, hora, ponente, titulo, salon, etc.)
        for (const item of lista) {
          const registro = {
            // prioridad a campos del item; fallback a los del contenedor
            id: item?.id ?? cryptoRandomId(),
            titulo: item?.titulo ?? item?.ponencia ?? 'Título no disponible',
            nombre_modulo,
            departamento: depto,
            ponente: item?.ponente ?? 'Ponente no disponible',
            hora: item?.hora ?? hora_gnrl,
            salon: item?.salon ?? salon_gnrl,
            dia: `Jueves ${dayNum} de octubre de 2025`, // etiqueta legible
            _day: dayNum,                 // para filtrar rápido
            _startMinutes: parseStartMinutes(item?.hora ?? hora_gnrl),
            // puedes anexar lo que más tengas en el item:
            ...item,
          };
          byDay[dayNum] = byDay[dayNum] ? [...byDay[dayNum], registro] : [registro];
        }
      }
    }
  }

  // asegúrate de que existan aunque estén vacíos
  return { '9': byDay['9'] || [], '10': byDay['10'] || [] };
}

function cryptoRandomId() {
  // id simple por si algún item no trae id
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function PO() {
  const [day, setDay] = useState('9'); // '9' | '10'
  const [byDay, setByDay] = useState({ '9': [], '10': [] });
  const [loader, setLoader] = useState(true);
    const [platicas, setPlaticas] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSimposios = async () => {
      window.scrollTo(0, 0);
      setLoader(true);
      try {
        const apiRequest = new ApiRequests();
        const allOralPresentation = await apiRequest.getAllOralPresentation();

        // allOralPresentation es un array con objetos que tienen .dia = [{fecha_9:{...}}, {fecha_10:{...}}]
        const grouped = flattenByDay(allOralPresentation || []);
        
        setByDay(grouped);
        setPlaticas(allOralPresentation)
      } catch (error) {
        console.error('Error al obtener presentaciones orales:', error);
      } finally {
        setLoader(false);
      }
    };
    fetchSimposios();
  }, []);

  // lista filtrada y ordenada por hora
  const filteredTalks = useMemo(() => {
    const list = byDay[day] || [];
    return [...list].sort((a, b) => (a._startMinutes || 1e9) - (b._startMinutes || 1e9));
  }, [byDay, day]);

  const getSimposio = async (talk) => {
    const apiRequest = new ApiRequests();
    return await apiRequest.getOralPresentation(talk.id);
  };

  return loader ? (
    <Loader />
  ) : (
    <div className="min-h-dvh w-full overflow-x-hidden">
      <HeaderMobile backLink="/events" title="Presentaciones Orales" />
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
              className={`px-10 py-3 rounded-full font-semibold text-white transition md:px-30 ${
                day === d ? 'bg-secondyellow text-white' : 'bg-[#999999]'
              }`}
            >
              {d} Octubre
            </button>
          ))}
        </div>

        {/* Lista */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {filteredTalks.length === 0 ? (
            <p className="text-center text-gray-600 col-span-full text-lg font-medium mt-10">
              No hay presentaciones orales para este día.
            </p>
          ) : (
            filteredTalks.map((talk, index) => {
              const badge = tpColorStyles.presentaciones_orales;
              return (
                <div
                  key={talk.id || index}
                  onClick={async () => {
                    setLoader(true);
                    try {
                      const simposio = await getSimposio(talk);
                      console.log(talk)
                      console.log(platicas)


                      navigate('/talk-details-Platicas-orales', {
                        state: {
                          from: 'presentaciones',
                          ...talk,        // manda lo que ya aplanamos (titulo, ponente, hora, salon, dia, etc.)
                          platicas,    // y si tu detalle necesita más
                          descripcion: simposio?.objetivo ?? talk?.descripcion,
                          salon: talk?.salon ?? simposio?.salon,
                        },
                      });
                    } finally {
                      setLoader(false);
                    }
                  }}
                  className="cursor-pointer rounded-xl px-5 py-4 w-full shadow-md flex items-center gap-4 mt-4 bg-[#E6E6E6]"
                >
                  {/* Hora */}
                  <div className="w-16 text-right pr-1">
                    <span className="text-[#29568E] font-extrabold text-2xl">
                      {getStartHourLabel(talk.hora)}
                    </span>
                  </div>

                  {/* Línea vertical */}
                  <div className="w-1 h-12 bg-secondyellow rounded-sm" />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-center pl-2">
                    <span className="text-thirdblue font-bold text-xl leading-tight">
                      {talk.nombre_modulo || talk.departamento || 'Presentación'}
                    </span>
                    <span className="text-gray-700 text-sm font-medium">
                      {talk.ponente}
                    </span>
                    <span
                      className="text-white text-xs font-semibold px-2 py-1 rounded-full mt-2 self-end"
                      style={{ backgroundColor: badge.bg, color: badge.text }}
                    >
                      Presentaciones Orales
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

export default PO;
