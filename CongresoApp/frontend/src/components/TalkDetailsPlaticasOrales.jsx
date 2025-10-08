/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HeaderMobile from '../modules/HeaderMobile';
import HeaderDesktop from '../modules/HeaderDesktop';
import Loader from '../modules/Loader';
import { CalendarIcon } from '@heroicons/react/24/solid';

import S_201 from '../../public/assets/mapas/S_201.png';
import S_202 from '../../public/assets/mapas/S_202.png';
import S_203 from '../../public/assets/mapas/S_203.png';
import S_204 from '../../public/assets/mapas/S_204.png';
import S_205 from '../../public/assets/mapas/S_205.png';
import S_206 from '../../public/assets/mapas/S_206.png';
import S_306 from '../../public/assets/mapas/S_306.png';
import S_307 from '../../public/assets/mapas/S_307.png';
import S_308 from '../../public/assets/mapas/S_308.png';
import S_309 from '../../public/assets/mapas/S_309.png';
import S_Antartida from '../../public/assets/mapas/S_Antartida.png';
import S_Canada from '../../public/assets/mapas/S_Canada.png';
import S_EstadosUnidos from '../../public/assets/mapas/S_EstadosUnidos.png';
import S_Europa from '../../public/assets/mapas/S_Europa.png';
import planoMapa from '../../public/assets/mapas/Plano_Centro_de_Convenciones_1 (ZONACONGRESO).png';
import DefaultImg from '../../public/assets/ponentes/default.png';

// ---------- MAPEO DE SALONES A PLANOS ----------
const salonMapas = {
  '201': S_201,
  '202': S_202,
  '203': S_203,
  '204': S_204,
  '205': S_205,
  '206': S_206,
  '306': S_306,
  '307': S_307,
  '308': S_308,
  '309': S_309,
  'Antártida': S_Antartida,
  'Europa': S_Europa,
  'Canadá': S_Canada,
  'Estados Unidos': S_EstadosUnidos,
};

// ---------- HELPERS FECHA/HORA ----------
const mesesES = {
  enero: '01',
  febrero: '02',
  marzo: '03',
  abril: '04',
  mayo: '05',
  junio: '06',
  julio: '07',
  agosto: '08',
  septiembre: '09',
  setiembre: '09',
  oct: '10',
  octubre: '10',
  nov: '11',
  noviembre: '11',
  dic: '12',
  diciembre: '12',
};

/**
 * Convierte un string tipo "Jueves 9 de octubre de 2025" a "2025-10-09"
 */
function getISODateFromDia(diaStr) {
  if (!diaStr) return null;
  const s = String(diaStr).toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
  // Busca "9 de octubre de 2025"
  const m = s.match(/(\d{1,2})\s+de\s+([a-z]+)\s+de\s+(\d{4})/);
  if (!m) return null;
  const [_, d, mesTxt, y] = m;
  const mes = mesesES[mesTxt] || null;
  if (!mes) return null;
  const dd = String(d).padStart(2, '0');
  return `${y}-${mes}-${dd}`; // YYYY-MM-DD
}

/**
 * De "08:20 - 08:40" obtiene { start:"08:20", end:"08:40", duracionMin }
 */
function parseHoraRango(horaStr) {
  if (!horaStr) return { start: null, end: null, duracionMin: null };
  const m = String(horaStr).match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
  if (!m) {
    // Si solo viene una hora, la usamos y ponemos 20 min por default
    const one = String(horaStr).match(/(\d{1,2}:\d{2})/);
    const start = one ? one[1] : null;
    return { start, end: null, duracionMin: start ? 20 : null };
  }
  const start = m[1];
  const end = m[2];

  const toMin = (hhmm) => {
    const [h, mm] = hhmm.split(':').map(Number);
    return h * 60 + mm;
  };
  const diff = toMin(end) - toMin(start);
  const duracionMin = Number.isFinite(diff) && diff > 0 ? diff : 20;

  return { start, end, duracionMin };
}

/**
 * Descarga un .ICS aceptando fecha YYYY-MM-DD, hora "HH:MM" y duración en minutos.
 */
function downloadICS({ titulo, doctor, descripcion, fechaISO, hora, duracionMin = 60, ubicacion = 'Centro de Convenciones Cintermex' }) {
  if (!fechaISO || !hora) return;

  const start = new Date(`${fechaISO}T${hora.padStart(5, '0')}:00`);
  const end = new Date(start.getTime() + duracionMin * 60000);

  const formatDate = (date) =>
    date
      .toISOString()
      .replace(/[-:]/g, '')
      .split('.')[0] + 'Z';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CongresoMedico//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `DTSTART:${formatDate(start)}`,
    `DTEND:${formatDate(end)}`,
    `SUMMARY:${titulo || 'Presentación Oral'}`,
    `DESCRIPTION:${descripcion || ''}\\nPonente: ${doctor || ''}`,
    `LOCATION:${ubicacion}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Recordatorio',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const encoded = encodeURIComponent(icsContent);
  const dataURI = `data:text/calendar;charset=utf-8,${encoded}`;

  const link = document.createElement('a');
  link.href = dataURI;
  link.download = `${(titulo || 'presentacion_oral').replace(/\s+/g, '_')}.ics`;
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
    nombre_modulo,
    ponente,
    salon,              // p.ej. "Canada-1" -> podría no mapear exacto; cae a plano general
    titulo,             // Título de la ponencia
    // Opcionales:
    descripcion,        // si la mandaste desde el navigate (e.g., objetivo)
    imagen,   
    platicas          // si en el futuro agregas foto
  } = state;
  
  console.log("platicas[0].dia[0]")

  console.log(platicas[0].dia[0].fecha_9[0])

  const fechaISO = getISODateFromDia(dia); // "2025-10-09"
  const { start, end, duracionMin } = parseHoraRango(hora);
  const nombre1 = ponente || 'Ponente no disponible';
  const titulo1 = titulo || nombre_modulo || 'Presentación Oral';
  const modulo1 = nombre_modulo || departamento || '';
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
        <div className="mt-1 mb-6 justify-center">
          <button
            onClick={() =>
              downloadICS({
                titulo: titulo1,
                doctor: nombre1,
                descripcion,
                fechaISO,
                hora: start, // HH:MM
                duracionMin: duracionMin || 20,
                ubicacion: `Cintermex - Salón ${salon1}`,
              })
            }
            className="px-4 py-2 bg-secondyellow text-white font-semibold rounded-3xl hover:bg-firstyellow flex flex-row items-center gap-2"
            disabled={!fechaISO || !start}
            title={!fechaISO || !start ? 'Falta información de fecha/hora' : 'Agregar al calendario'}
          >
            <CalendarIcon className="w-8" />
            Agendar
          </button>
        </div>

        <div className="bg-white p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl shadow-md w-full max-w-3xl">
          {/* TÍTULO */}
          <h2 className="text-2xl md:text-3xl font-bold text-[#014480]">{titulo1}</h2>

          {/* MÓDULO / ÁREA */}
          {modulo1 && (
            <p className="text-sm md:text-base text-gray-700 mt-1">
              <strong>Módulo:</strong> {nombre_modulo}
            </p>
          )}

          {/* FECHA Y HORARIO */}
          <p className="text-sm md:text-base text-gray-600 mt-2">
            {dia || ''} {hora ? `· ${timeLabel(start)}${end ? ` – ${timeLabel(end)}` : ''}` : ''}
          </p>

          {/* ETIQUETA */}
          <h3 className="mt-5 text-lg md:text-xl font-semibold text-firstyellow">Presentación Oral</h3>

          {/* PONENTE */}
          {nombre1 && (
            <p className="text-sm md:text-base mt-2 text-gray-700">
              <strong>Ponente:</strong> {nombre1}
            </p>
          )}

          {/* IMAGEN + DESCRIPCIÓN/OBJETIVO (si existe) */}
          <div className="mt-5 flex flex-col md:flex-row md:items-center md:gap-5">
            {/* Imagen */}
            <div className="w-full md:w-48 flex-shrink-0">
            </div>

            {/* Descripción / objetivo si llegó en state como "descripcion" */}
           {platicas && (
  <div className="mt-4 md:mt-0">
    {(() => {
      // 1) Determina el día objetivo
      const selectedDay =
        state?.selectedDay ||
        (String(dia).match(/\b(\d{1,2})\b/)?.[1] ?? '9'); // fallback por si no viene

      const targetKey = `fecha_${selectedDay}`;

      // 2) Busca solo esa fecha dentro del arreglo "dia"
      const entry = platicas?.[0]?.dia?.find(d => Object.prototype.hasOwnProperty.call(d, targetKey));
      const departamentos = entry?.[targetKey];

      if (!departamentos || typeof departamentos !== 'object') {
        return (
          <p className="text-gray-500">
            Sin presentaciones para {targetKey}.
          </p>
        );
      }

      // 3) Renderiza únicamente esa fecha
      return (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-red-700 mb-3">
            {`Fecha ${selectedDay}`}
          </h3>

          {Object.entries(departamentos).map(([departamento, presentaciones]) => (
            <div key={departamento} className="mb-4">
              <h4 className="font-semibold">{departamento}</h4>
              <ul className="list-disc list-inside pl-0 ml-0">
                {(Array.isArray(presentaciones) ? presentaciones : []).map((p) => (
                  <li key={p.id ?? `${departamento}-${p.hora}-${p.titulo}`} className="mt-1">
                    <span className="font-medium">{p.hora}</span>{' '}
                    — {p.titulo}{' '}
                    <em className="text-gray-600">({p.ponente})</em>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    })()}
  </div>
)}
          </div>

          {/* SALÓN */}
          <h3 className="mt-5 text-lg md:text-xl font-semibold text-firstyellow">Salón</h3>
          <p className="text-sm md:text-base text-gray-700">{salon1}</p>

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
