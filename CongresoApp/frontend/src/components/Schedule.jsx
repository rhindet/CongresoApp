import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderMobile from '../modules/HeaderMobile';
import HeaderDesktop from '../modules/HeaderDesktop'

{/* ---------- Datos ---------- */ }
const scheduleData = [
  {
    titulo: 'Conferencia de Apertura',
    hora: '06:00',
    doctor: 'Dr. Daniela Cantú Barajas',
    fecha: '9',
  },
  {
    titulo: 'Conferencia de Apertura',
    hora: '06:00',
    doctor: 'Dr. Daniela Cantú Barajas',
    fecha: '10',
  },
  {
    titulo: 'Avances de Cardiología',
    hora: '6:30',
    doctor: 'Dr. Martell Hinojosa',
    fecha: '9',
  },
  {
    titulo: 'Investigación de Cáncer',
    hora: '7:00',
    doctor: 'Dr. Chester Bennington',
    fecha: '9',
  },
  {
    titulo: 'Enfermedades Autoinmunes',
    hora: '7:00',
    doctor: 'Dr. Edgar Francisco Sandoval',
    fecha: '9',
  },
  {
    titulo: 'Conferencia Final',
    hora: '9:00',
    doctor: 'Dr. Chespín',
    fecha: '9',
  },
  {
    titulo: 'Investigación de Cáncer',
    hora: '10:00',
    doctor: 'Dr. Chester Bennington',
    fecha: '9',
  },
  {
    titulo: 'Enfermedades Autoinmunes',
    hora: '10:15',
    doctor: 'Dr. Edgar Francisco Sandoval',
    fecha: '9',
  },
  {
    titulo: 'Conferencia Final',
    hora: '11:00',
    doctor: 'Dr. Daniela Barajas',
    fecha: '9',
  },
  {
    titulo: 'Nuevos Horizontes en Oncología',
    hora: '12:00',
    doctor: 'Dra. Grey',
    fecha: '10',
  },
];

export default function Schedule() {
  //Estado para la pestaña (9 o 10 octubre)
  const [day, setDay] = useState('9');
  const navigate = useNavigate();

  //Filtra las platicas del día seleccionado
  const talksToday = scheduleData.filter((t) => t.fecha === day);

  //Para pasar al detalle de la platica
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh overflow-hidden bg-[#DCDCDE]">
      {/* Header */}
      <HeaderMobile backLink="/home" title="Horarios" />
      {/* Heacer Desktop */}
      <div className="hidden md:block">
        <HeaderDesktop backLink="/home" />
      </div>

      {/* CONTENIDO */}
      <main className="pt-20 pb-20 min-h-screen flex flex-col items-center w-full px-4">

        <div className="flex justify-center gap-4 mt-1">
          {['9', '10'].map((d) => (
            <button
              key={d}
              onClick={() => setDay(d)}
              className={`px-10 py-3 rounded-full font-semibold text-white transition md:px-30
              ${day === d ? 'bg-yellow-400 text-white' : 'bg-gray-300 text-gray-600'}
            `}
            >
              {d} Octubre
            </button>
          ))}
        </div>

        {talksToday.map((talk, index) => (
          <div key={index}
            onClick={() =>
              navigate('/talk-detail', {
                state: {
                  ...talk,
                  descripcion: 'Esta conferencia abordará los últimos avances en cardiología moderna...',
                  salon: 'Salón A1',
                }
              })
            }
            className="cursor-pointer bg-[#B1B1B4] rounded-xl px-5 py-4 w-full max-w-full shadow-md flex items-center gap-4 mt-4">
            {/* Hora */}
            <div className="w-16 text-right pr-1">

              <span className="text-[#29568E] font-extrabold text-2xl">{talk.hora}</span>
            </div>

            {/* Separador vertical */}
            <div className="w-1 h-12 bg-yellow-400 rounded-sm" />

            <div className="flex-1 flex flex-col justify-center pl-2">
              <span className="text-white font-bold text-xl leading-tight">
                {talk.titulo}
              </span>

              <span className="text-gray-600 text-sm font-medium">
                {talk.doctor}
              </span>

            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
