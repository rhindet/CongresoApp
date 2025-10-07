import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderMobile from '../../modules/HeaderMobile';
import HeaderDesktop from '../../modules/HeaderDesktop';
import { ApiRequests } from '../../core/ApiRequests';
import Loader from '../../modules/Loader';
import { PresentacionesModelo } from '../../models/presentacionesModelo';

const tpColorStyles = {
  presentaciones_orales: {
    bg: '#85A899',
    text: '#0b5345',
  },
};

function PO() {
  const [day, setDay] = useState('9'); // '9' | '10'
  const [listDeSimposios, setListDeSimposios] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSimposios = async () => {
      window.scrollTo(0, 0);
      setLoader(true);
      try {
        const apiRequest = new ApiRequests();
        const allOralPresentation = await apiRequest.getAllOralPresentation();

        // Normaliza a tu modelo (opcional pero recomendable)
        const normalizados = (allOralPresentation || []).map(
          (item) => new PresentacionesModelo(item)
        );

        setListDeSimposios(normalizados);
      } catch (error) {
        console.error('Error al obtener presentaciones orales:', error);
      } finally {
        setLoader(false);
      }
    };
    fetchSimposios();
  }, []);

  // ---- Helpers robustos ----
  const extractDayNumber = (value) => {
    if (typeof value === 'number') return value;
    const s = String(value || '');
    // Busca el primer número de 1-2 dígitos; funciona con "Jueves 9 de octubre de 2025"
    const m = s.match(/\b(\d{1,2})\b/);
    return m ? Number(m[1]) : NaN;
  };

  const parseStartMinutes = (hora) => {
    if (!hora) return NaN;
    // hora como "08:20 - 08:40" o "08:20"
    const m = String(hora).match(/(\d{1,2}):(\d{2})/);
    if (!m) return NaN;
    const h = Number(m[1]);
    const mm = Number(m[2]);
    if (Number.isNaN(h) || Number.isNaN(mm)) return NaN;
    return h * 60 + mm;
  };

  const getStartHourLabel = (hora) => {
    if (!hora) return '';
    const m = String(hora).match(/(\d{1,2}:\d{2})/);
    return m ? m[1] : String(hora);
  };

  // Filtro + ordenamiento memorizado (reacciona a cambios de 'day' y de la lista)
  const filteredTalks = useMemo(() => {
    const target = extractDayNumber(day);
    if (!Number.isFinite(target)) return [];

    return (listDeSimposios || [])
      .map((r) => ({
        _orig: r,
        _startMinutes: parseStartMinutes(r.hora),
        _dayNum: extractDayNumber(r.dia),
      }))
      .filter((x) => Number.isFinite(x._dayNum) && x._dayNum === target)
      .sort((a, b) => {
        const A = Number.isFinite(a._startMinutes) ? a._startMinutes : Number.POSITIVE_INFINITY;
        const B = Number.isFinite(b._startMinutes) ? b._startMinutes : Number.POSITIVE_INFINITY;
        return A - B;
      })
      .map((x) => x._orig);
  }, [listDeSimposios, day]);

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

        {/* Lista de POs */}
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
                      navigate('/talk-details-Platicas-orales', {
                        state: {
                          from: 'po',
                          ...simposio,
                          descripcion: simposio.objetivo,
                          salon: simposio.salon,
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
                      {talk.nombre_modulo}
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
