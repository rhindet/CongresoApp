/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HeaderMobile from '../modules/HeaderMobile';
import HeaderDesktop from '../modules/HeaderDesktop';
import Loader from '../modules/Loader';
import { CalendarIcon } from '@heroicons/react/24/solid';
import S_Canada from '../../public/assets/mapas/S_Canada.png';
import planoMapa from '../../public/assets/mapas/Plano_Centro_de_Convenciones_1 (ZONACONGRESO).png';
import DefaultImg from '../../public/assets/ponentes/default.png';

// ---------- MAPEO DE SALONES A PLANOS ----------
const salonMapas = {
  'Canadá': S_Canada,
};

// Helpers mínimos que ya tenías
function parseHoraRango(horaStr) {
  if (!horaStr) return { start: null, end: null };
  const m = String(horaStr).match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
  if (!m) {
    const one = String(horaStr).match(/(\d{1,2}:\d{2})/);
    return { start: one ? one[1] : null, end: null };
  }
  return { start: m[1], end: m[2] };
}

export default function TalkDetailOrales() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const backLink = '/presentaciones';

  useEffect(() => {
    if (!state) navigate('/presentaciones');
  }, [state, navigate]);

  if (!state) return null;

  const {
    selectedDay,   // 👈 viene del Schedule ('9' o '10')
    hora,
    imagen,
  } = state;

  // Paleta de colores para alternar por sección (departamento)
  const sepColors = ['#F59E0B', '#10B981', '#3B82F6', '#EF4444', '#8B5CF6', '#14B8A6'];

  // ---------- Render helper de un día (SIN mostrar el label del día) ----------
  const renderDia = (_label, objDia) => {
    if (!objDia || typeof objDia !== 'object' || Object.keys(objDia).length === 0) {
      return (
        <section className="rounded-2xl bg-white p-4 md:p-6">
          <p className="text-gray-500 text-sm">Sin presentaciones para este día.</p>
        </section>
      );
    }

    return (
      // Contenedor visual de las secciones (sin borde para evitar doble marco)
      <section className="rounded-2xl bg-white p-4 md:p-6">
        <div className="grid grid-cols-1 gap-5">
          {Object.entries(objDia).map(([departamento, presentaciones], i) => {
            const lista = Array.isArray(presentaciones) ? presentaciones : [];
            const color = sepColors[i % sepColors.length];

            return (
              // Tarjeta de departamento con separador superior y chip del mismo color
              <article
                key={departamento}
                className="rounded-xl bg-gradient-to-b from-white to-gray-50 p-4 md:p-5 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                {/* Línea separadora de color distinta por sección */}
                <div
                  className="h-1 w-full rounded-full mb-4"
                  style={{ backgroundColor: color }}
                />

                {/* Encabezado del departamento */}
                <header className="flex items-center justify-between gap-3">
                  <h5 className="text-base md:text-lg font-bold text-[#014480]">
                    {departamento}
                  </h5>
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
                    <div
                      key={p.id ?? `${departamento}-${p.hora}-${p.titulo}`}
                      className="group rounded-xl bg-white/80 hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <div className="flex gap-3 p-3 md:p-4">
                        {/* Acento lateral con el mismo color del separador */}
                        <div
                          className="w-1 rounded-lg"
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
                            <h6 className="font-semibold text-gray-900 leading-tight break-words">
                              {p.titulo}
                            </h6>
                          </div>
                          {p.ponente && (
                            <p className="mt-1 text-sm text-gray-600">
                              <em>{p.ponente}</em>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
  };

  // ---------- Elegir SOLO el día pedido en selectedDay ----------
  const day = String(selectedDay || '').trim(); // '9' | '10'
  const targetKey = day === '10' ? 'fecha_10' : 'fecha_9'; // default al 9 si no viene

  // Buscar objeto del día dentro de state.modulo.dia (array de {fecha_9:{...}} / {fecha_10:{...}})
  const objDia =
    Array.isArray(state?.modulo?.dia)
      ? (state.modulo.dia.find((d) => d && Object.prototype.hasOwnProperty.call(d, targetKey))?.[targetKey] || null)
      : null;

  // (Se mantiene, aunque no se muestra en UI)
  const labelPorDia = day === '10' ? 'Viernes 10 de octubre' : 'Jueves 9 de octubre';

  return (
    <div className="min-h-dvh w-full overflow-x-hidden">
      {/* HEADER */}
      <HeaderMobile backLink={backLink} title="Detalle" />
      <div className="hidden md:block">
        <HeaderDesktop backLink={backLink} />
      </div>

      <main className="pt-20 pb-20 min-h-screen flex flex-col items-center w-full px-4">
        {/* Contenedor principal único con sombra (sin borde visible) */}
        <div className="bg-white p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl shadow-md w-full max-w-3xl">
          {/* TÍTULO */}
          <h2 className="text-2xl md:text-3xl font-bold text-[#014480]">
            {state.modulo?.nombre}
          </h2>

          {/* HORARIO GENERAL */}
          <p className="text-sm md:text-base text-gray-600 mt-2">
            {state.modulo?.hora_gnrl}
          </p>

          {/* CONTENIDO */}
          <h3 className="mt-5 text-lg md:text-xl font-semibold text-firstyellow">Contenido</h3>

          <div className="mt-4 space-y-8">
            {/* 👇 Renderiza SOLO el día seleccionado (sin mostrar el título del día) */}
            {renderDia(labelPorDia, objDia)}
          </div>

          {/* SALÓN */}
          <h3 className="mt-5 text-lg md:text-xl font-semibold text-firstyellow">Salón</h3>
          <p className="text-sm md:text-base text-gray-700">{state.modulo?.salon}</p>

          {/* MAPA */}
          <div className="mt-6">
            <img
              src={salonMapas['Canadá'] || planoMapa}
              alt={`Mapa del salón ${'Canadá'}`}
              className="w-full max-h-[500px] object-contain rounded-lg border"
            />
          </div>
        </div>
      </main>
    </div>
  );
}