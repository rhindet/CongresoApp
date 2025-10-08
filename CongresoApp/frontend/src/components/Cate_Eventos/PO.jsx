import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderMobile from '../../modules/HeaderMobile';
import HeaderDesktop from '../../modules/HeaderDesktop';
import { ApiRequests } from '../../core/ApiRequests';
import Loader from '../../modules/Loader';

const tpColorStyles = {
  presentaciones_orales: { bg: '#85A899', text: '#0b5345' },
};

function PO() {
  const [loader, setLoader] = useState(true);
  const [platicas, setPlaticas] = useState([]);
  const [day, setDay] = useState('9'); // '9' | '10'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      window.scrollTo(0, 0);
      setLoader(true);
      try {
        const apiRequest = new ApiRequests();
        const allOralPresentation = await apiRequest.getAllOralPresentation();
        setPlaticas(allOralPresentation || []);
        console.log('allOralPresentation:', allOralPresentation);
      } catch (e) {
        console.error('Error al obtener presentaciones orales:', e);
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, []);

  return loader ? (
    <Loader />
  ) : (
    <div className="min-h-dvh w-full overflow-x-hidden">
      {/* Header móvil y desktop */}
      <HeaderMobile backLink="/events" title="Presentaciones Orales" />
      <div className="hidden md:block">
        <HeaderDesktop backLink="/events" />
      </div>

      <main className="pt-20 pb-20 min-h-screen flex flex-col items-center w-full px-4">
        {/* Botones de días */}
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

        {/* GRID de módulos */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {(!platicas || platicas.length === 0) ? (
            <p className="text-center text-gray-600 col-span-full text-lg font-medium mt-10">
              No hay elementos para mostrar.
            </p>
          ) : (
            platicas.map((modulo, idx) => {
              const badge = tpColorStyles.presentaciones_orales;

              const nombre = modulo?.nombre ?? 'Módulo';
              const hora_gnrl = modulo?.hora_gnrl ?? '';
              const salon = modulo?.salon ?? '';
              const dias = Array.isArray(modulo?.dia) ? modulo.dia : [];

              // ✅ Mostrar SOLO los departamentos del día seleccionado
              const targetKey = `fecha_${day}`; // 'fecha_9' | 'fecha_10'
              const diaObj =
                Array.isArray(dias)
                  ? (dias.find(d => d && Object.prototype.hasOwnProperty.call(d, targetKey))?.[targetKey] || null)
                  : null;

              // Si existe el objeto de ese día, sus claves son los departamentos
              const departamentosUnicos = diaObj
                ? Object.keys(diaObj).sort((a, b) => a.localeCompare(b, 'es'))
                : [];

              return (
                <div
                  key={idx}
                  className="rounded-xl px-5 py-4 w-full shadow-md bg-[#E6E6E6] flex flex-col"
                >
                  {/* Encabezado del módulo */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold text-thirdblue leading-tight">
                      {nombre}
                    </h3>
                    <span
                      className="text-white text-xs font-semibold px-2 py-1 rounded-full shrink-0"
                      style={{ backgroundColor: badge.bg, color: badge.text }}
                    >
                      Presentaciones Orales
                    </span>
                  </div>

                  {/* Horario y salón */}
                  {(hora_gnrl || salon) && (
                    <p className="text-sm text-gray-700 mt-1">
                      {hora_gnrl && <><strong>Horario:</strong> {hora_gnrl}</>}
                      {hora_gnrl && salon && ' · '}
                      {salon && <><strong>Salón:</strong> {salon}</>}
                    </p>
                  )}

                  {/* 🔲 Departamentos SOLO del día seleccionado */}
                  <div className="mt-4 bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
                    {departamentosUnicos.length === 0 ? (
                      <p className="text-sm text-gray-500">
                        Sin departamentos para el día {day}.
                      </p>
                    ) : (
                      <div className="flex flex-col gap-1 text-sm text-gray-800">
                        {departamentosUnicos.map((dep) => (
                          <span
                            key={dep}
                            className="border-b border-gray-100 py-1"
                          >
                            {dep}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Botón ver detalle */}
                  <div className="mt-4">
                    <button
                      onClick={() =>
                        navigate('/talk-details-Platicas-orales', {
                          state: {
                            from: 'presentaciones',
                            modulo,
                            platicas,
                            selectedDay: day, // 👈 se pasa para que el detalle muestre el mismo día
                          },
                        })
                      }
                      className="px-3 py-2 rounded-md bg-secondyellow text-white text-sm font-semibold hover:opacity-90"
                    >
                      Ver detalle
                    </button>
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