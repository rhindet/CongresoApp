/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HeaderMobile from '../modules/HeaderMobile';
import HeaderDesktop from '../modules/HeaderDesktop';
import Loader from '../modules/Loader';
import { timeFormat, formatDownloadICS } from './dateFormatt';
import { CalendarIcon } from '@heroicons/react/24/solid';
import S_Canada from '../../public/assets/mapas/S_Canada.png';
import planoMapa from '../../public/assets/mapas/Plano_Centro_de_Convenciones_1 (ZONACONGRESO).png';
import DefaultImg from '../../public/assets/ponentes/default.png';

// ---------- MAPEO DE SALONES A PLANOS ----------
const salonMapas = {
  'Canadá': S_Canada,
};

/**
 * Convierte un string tipo "Jueves 9 de octubre de 2025" a "2025-10-09"
 */
function getISODateFromDia(diaStr) {
  if (!diaStr) return null;
  const monthMap = {
    enero: '01', febrero: '02', marzo: '03', abril: '04', mayo: '05', junio: '06',
    julio: '07', agosto: '08', septiembre: '09', octubre: '10', noviembre: '11', diciembre: '12'
  };
  const s = String(diaStr).toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
  const m = s.match(/(\d{1,2})\s+de\s+([a-z]+)\s+de\s+(\d{4})/);
  if (!m) return null;
  const [_, d, mesTxt, y] = m;
  const mes = monthMap[mesTxt];
  if (!mes) return null;
  const dd = String(d).padStart(2, '0');
  return `${y}-${mes}-${dd}`;
}

/**
 * De "08:20 - 08:40" obtiene { start:"08:20", end:"08:40", duracionMin }
 */
function parseHoraRango(horaStr) {
  if (!horaStr) return { start: null, end: null };
  const m = String(horaStr).match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
  if (!m) {
    const one = String(horaStr).match(/(\d{1,2}:\d{2})/);
    return { start: one ? one[1] : null, end: null };
  }
  return { start: m[1], end: m[2] };
}

/**
 * Descarga un .ICS aceptando fecha YYYY-MM-DD, hora "HH:MM" y duración en minutos.
 */
function downloadICS({ nombre, salon, fechaISO, startTime, endTime }) {
  if (!startTime || !endTime) {
    console.error("Faltan datos (fecha/hora) para generar el evento del calendario.");
    return;
  }

  // ✅ Forzar la fecha fija
  fechaISO = "2025-10-09";

  // Convierte "YYYY-MM-DD" + "HH:MM" a Date (hora local)
  const toDateTime = (fecha, hora) => {
    const [h, m] = hora.split(':').map(Number);
    const d = new Date(fecha);
    d.setHours(h, m, 0, 0);
    return d;
  };

  const startDate = toDateTime(fechaISO, startTime);
  const endDate = toDateTime(fechaISO, endTime);

  // Formato local sin UTC (evita desfase por zona horaria)
  const formatDateLocal = (date) => {
    const pad = (n) => String(n).padStart(2, '0');
    const yyyy = date.getFullYear();
    const mm = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const mi = pad(date.getMinutes());
    const ss = pad(date.getSeconds());
    return `${yyyy}${mm}${dd}T${hh}${mi}${ss}`;
  };

  // Crear contenido del .ICS
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CongresoMedicina//EN',
    'BEGIN:VEVENT',
    `DTSTART:${formatDateLocal(startDate)}`,
    `DTEND:${formatDateLocal(endDate)}`,
    `SUMMARY:${nombre || 'Evento del Congreso'}`,
    `LOCATION:Cintermex ${salon || ''}`,
    'DESCRIPTION',
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  // Descargar archivo
  const encoded = encodeURIComponent(icsContent);
  const dataURI = `data:text/calendar;charset=utf-8,${encoded}`;
  const link = document.createElement('a');
  link.href = dataURI;
  link.download = `${nombre?.replace(/\s+/g, '_') || 'evento'}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Formatea a "HH:MM" (sin AM/PM) para mostrar.
 */
function timeLabel(hhmm) {
  return hhmm || '';
}

export default function TalkDetailOrales() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const backLink = '/presentaciones';


  useEffect(() => {
    if (!state) navigate('/presentaciones');
    if (!state) navigate('/presentaciones');

  }, [state, navigate]);


  if (!state) return null;

  console.log("state")
  console.log(state)


  // ----- Campos esperados en Presentaciones Orales -----
  const {
    id,
    departamento,
    dia,                // "Jueves 9 de octubre de 2025"
    hora,               // "08:20 - 08:40"
    nombre,
    ponente,
    salon,              // p.ej. "Canada-1" -> podría no mapear exacto; cae a plano general
    titulo,             // Título de la ponencia
    // Opcionales:
    descripcion,        // si la mandaste desde el navigate (e.g., objetivo)
    imagen,
    platicas        // si en el futuro agregas foto
  } = state;

  console.log("platicas[0].dia[0]")
  console.log(platicas ?? state.talk)

  console.log(state.modulo.dia)

  const fechaISO = getISODateFromDia(state.modulo.dia); // "2025-10-09"
  const { start, end, duracionMin } = parseHoraRango(hora);
  const modulo1 = nombre || '';
  const salon1 = salon || 'Auditorio';
  const rutaFinal = imagen && imagen !== 'default.png'
    ? `/assets/ponentes/Orales/${imagen}`
    : DefaultImg;

  return (
    <div className="min-h-dvh w-full overflow-x-hidden">
      {/* HEADER */}
      <HeaderMobile backLink={backLink} title="Detalle" />
      <div className="hidden md:block">
        <HeaderDesktop backLink={backLink} />
      </div>

      <main className="pt-20 pb-20 min-h-screen flex flex-col items-center w-full px-4">
        {/* BOTÓN AGENDAR */}
        {/* <div className="mt-1 mb-6 justify-center">
          <button
            onClick={() => {
              // 1. Extraer los datos GENERALES del módulo
              const nombreDelEvento = state.modulo.nombre;
              const salonDelEvento = state.modulo.salon;
              const horaGeneral = state.modulo?.hora_gnrl || hora; // Ej: "08:00 - 10:00"
              const fechaDelEvento = getISODateFromDia(state.modulo.dia);

              console.log(horaGeneral)
              console.log(nombreDelEvento)
              console.log(salonDelEvento)
              console.log(state.modulo.dia.fecha_9)

              // 2. Procesar la hora para obtener inicio y fin
              const { start: startTime, end: endTime } = parseHoraRango(horaGeneral);

              // 3. Llamar a la función con los datos correctos
              downloadICS({
                nombre: nombreDelEvento,
                // fechaISO: fechaDelEvento,
                fechaISO,
                startTime,
                endTime,
                salon: salonDelEvento,
              });
            }}
            className="px-4 py-2 bg-secondyellow text-white font-semibold rounded-3xl hover:bg-firstyellow flex flex-row items-center gap-2"
          >
            <CalendarIcon className="w-8" />
            Agendar
          </button>
        </div> */}

        <div className="bg-white p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl shadow-md w-full max-w-3xl">
          {/* TÍTULO */}
          <h2 className="text-2xl md:text-3xl font-bold text-[#014480]">{state.modulo.nombre}</h2>

          {/* HORARIO */}
          <p className="text-sm md:text-base text-gray-600 mt-2">
            {state.modulo.hora_gnrl}
          </p>

          {/* ETIQUETA */}
          <h3 className="mt-5 text-lg md:text-xl font-semibold text-firstyellow">Contenido</h3>


          {/* IMAGEN + DESCRIPCIÓN/OBJETIVO (si existe) */}
          <div className=" flex flex-col md:flex-row md:items-center md:gap-5">
            {/* Imagen */}

            {/* Descripción / objetivo si llegó en state como "descripcion" */}
            {platicas && (
              <div className="mt-4 md:mt-0">
                {(() => {
                  // Colores para las separaciones (rotan)
                  const sepColors = ['#F59E0B', '#10B981', '#3B82F6', '#EF4444', '#8B5CF6', '#14B8A6'];

                  // 1) Día seleccionado
                  const selectedDay =
                    state?.selectedDay ||
                    (String(dia).match(/\b(\d{1,2})\b/)?.[1] ?? '9');

                  const targetKey = `fecha_${selectedDay}`;

                  // 2) Busca solo esa fecha dentro del arreglo "dia"
                  const entry = platicas?.[0]?.dia?.find(d =>
                    Object.prototype.hasOwnProperty.call(d, targetKey)
                  );
                  const departamentos = entry?.[targetKey];

                  if (!departamentos || typeof departamentos !== 'object') {
                    return (
                      <p className="text-gray-500">
                        Sin presentaciones para {targetKey}.
                      </p>
                    );
                  }

                  // 3) Render bonito: tarjetas por departamento con separador colorido
                  return (
                    <div className="grid grid-cols-1 gap-5">
                      {Object.entries(departamentos).map(([departamento, presentaciones], i) => {
                        const lista = Array.isArray(presentaciones) ? presentaciones : [];
                        const color = sepColors[i % sepColors.length];

                        return (
                          <section
                            key={departamento}
                            className="rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-4 md:p-6 shadow-sm"
                          >
                            {/* Línea separadora de color distinta por sección */}
                            <div
                              className="h-1 w-full rounded-full mb-4"
                              style={{ backgroundColor: color }}
                            />

                            {/* Header del departamento */}
                            <header className="flex items-center justify-between gap-3">
                              <h4 className="text-lg md:text-xl font-extrabold tracking-tight text-[#014480]">
                                {departamento}
                              </h4>
                              <span
                                className="inline-flex items-center justify-center rounded-full text-xs font-semibold px-2.5 py-1"
                                style={{ backgroundColor: `${color}1A`, color }}
                              >
                                {lista.length} {lista.length === 1 ? 'ponencia' : 'ponencias'}
                              </span>
                            </header>

                            {/* Lista de ponencias */}
                            <div className="mt-4 space-y-3">
                              {lista.map((p) => (
                                <article
                                  key={p.id ?? `${departamento}-${p.hora}-${p.titulo}`}
                                  className="group rounded-xl border border-gray-200 bg-white/80 hover:bg-white hover:shadow-md transition-all duration-200"
                                >
                                  <div className="flex gap-3 p-3 md:p-4">
                                    {/* Barra/acento izquierda (mismo color del separador) */}
                                    <div
                                      className="w-1 rounded-lg transition-colors"
                                      style={{ backgroundColor: color }}
                                    />

                                    {/* Contenido */}
                                    <div className="flex-1 min-w-0">
                                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                        <span
                                          className="inline-flex items-center rounded-full text-[11px] md:text-xs font-bold px-2.5 py-1"
                                          style={{ backgroundColor: '#29568E1A', color: '#29568E' }}
                                        >
                                          {p.hora}
                                        </span>
                                        <h5 className="font-semibold text-gray-900 leading-tight break-words">
                                          {p.titulo}
                                        </h5>
                                      </div>

                                      {p.ponente && (
                                        <p className="mt-1 text-sm text-gray-600">
                                          <em>{p.ponente}</em>
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </article>
                              ))}
                            </div>
                          </section>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* SALÓN */}
          <h3 className="mt-5 text-lg md:text-xl font-semibold text-firstyellow">Salón</h3>
          <p className="text-sm md:text-base text-gray-700">{state.modulo.salon
          }</p>

          {/* MAPA */}
          <div className="mt-6">
            <img
              src={salonMapas["Canadá"] || planoMapa}
              alt={`Mapa del salón ${"Canadá"}`}
              className="w-full max-h-[500px] object-contain rounded-lg border"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
