import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderMobile from '../modules/HeaderMobile';

const scheduleData = [
  { titulo: 'Conferencia de Apertura', hora: '06:00', doctor: 'Dr. Daniela Cantú Barajas', fecha: '9', Tipo: 'His', tp: 'Presentaciones orales' },
  { titulo: 'Conferencia de Apertura', hora: '06:00', doctor: 'Dr. Daniela Cantú Barajas', fecha: '10', Tipo: 'Car', tp: 'Simposios' },
  { titulo: 'Avances de Cardiología', hora: '6:30', doctor: 'Dr. Martell Hinojosa', fecha: '9', Tipo: 'His', tp: 'Platicas magistrales' },
  { titulo: 'Investigación de Cáncer', hora: '7:00', doctor: 'Dr. Chester Bennington', fecha: '9', Tipo: 'His', tp: 'Presentaciones orales' },
  { titulo: 'Enfermedades Autoinmunes', hora: '7:00', doctor: 'Dr. Edgar Francisco Sandoval', fecha: '9', Tipo: 'Car', tp: 'Simposios' },
  { titulo: 'Conferencia Final', hora: '9:00', doctor: 'Dr. Chespín', fecha: '9', Tipo: 'His', tp: 'Platicas magistrales' },
  { titulo: 'Investigación de Cáncer', hora: '10:00', doctor: 'Dr. Chester Bennington', fecha: '9', Tipo: 'His', tp: 'Presentaciones orales' },
  { titulo: 'Enfermedades Autoinmunes', hora: '10:15', doctor: 'Dr. Edgar Francisco Sandoval', fecha: '9', Tipo: 'Car', tp: 'Platicas magistrales' },
  { titulo: 'Conferencia Final', hora: '11:00', doctor: 'Dr. Chespín', fecha: '9', Tipo: 'His', tp: 'Simposios' },
  { titulo: 'Nuevos Horizontes en Oncología', hora: '12:00', doctor: 'Dra. Grey', fecha: '10', Tipo: 'His', tp: 'Platicas magistrales' },
  { titulo: 'Cuidado de la piel', hora: '13:00', doctor: 'Dr. Enrique Segobiano', fecha: '10', Tipo: 'Car', tp: 'Presentaciones orales' },
];

const tipoLabels = {
  Car: 'Cardiología',
  His: 'Histología',
};

// 🎨 Colores personalizados para los tags "tp"
const tpColorStyles = {
  'presentaciones orales': {
    bg: '#5F8575', // Verde
    text: '#0b5345',
  },
  'platicas magistrales': {
    bg: '#E0B7B1', // Rosa
    text: '#a93226',
  },
  'simposios': {
    bg: '#B6A6CA', // Morado
    text: '#5b2c6f',
  },
};

function renderTalkCard(talk, index) {
  const tpKey = talk.tp.toLowerCase();
  const colors = tpColorStyles[tpKey] || {
    bg: '#CCCCCC',
    text: '#333333',
  };

  return (
    <Link
      to=""
      key={index}
      className="rounded-xl px-4 py-3 w-full shadow-md items-center flex gap-6 mt-4"
      style={{ backgroundColor: '#E6E6E6' }} // Fondo gris uniforme
    >
      <div className="w-15 text-right pr-1">
        <span className="font-extrabold text-2xl text-[#29568E]">{talk.hora}</span>
      </div>
      <div className="w-1 h-12 bg-yellow-400 rounded-sm" />
      <div className="flex-1 flex flex-col">
        <span className="font-bold text-xl text-[#29568E]">{talk.titulo}</span>
        <span className="text-gray-700 text-sm font-medium">{talk.doctor}</span>
        {/* Etiqueta tp con fondo según tipo */}
        <span
          className="text-white text-xs font-semibold px-2 py-1 rounded-full mt-1 self-end"
          style={{ backgroundColor: colors.bg }}
        >
          {talk.tp}
        </span>
      </div>
    </Link>
  )
}

export default function Schedule() {
  const [day, setDay] = useState('9');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categoryOptions = [
    { label: 'Todos', value: 'Todos' },
    { label: 'Cardiología', value: 'Car' },
    { label: 'Histología', value: 'His' },
  ];

  const groupedTalks = scheduleData
    .filter((talk) => talk.fecha === day)
    .reduce((groups, talk) => {
      if (!groups[talk.Tipo]) {
        groups[talk.Tipo] = [];
      }
      groups[talk.Tipo].push(talk);
      return groups;
    }, {});

  const filteredTalks =
    selectedCategory === 'Todos'
      ? Object.values(groupedTalks).flat()
      : scheduleData.filter(
        (talk) => talk.fecha === day && talk.Tipo === selectedCategory
      );

  return (
    <div className="min-h-dvh overflow-hidden bg-[#DCDCDE]">
      <HeaderMobile backLink="/home" title="Horarios" />

      <main className="pt-20 pb-20 min-h-screen flex flex-col items-center w-full px-4">
        {/* Botones de día */}
        <div className="flex justify-center gap-4 mb-4">
          {['9', '10'].map((d) => (
            <button
              key={d}
              onClick={() => setDay(d)}
              className={`px-10 py-3 rounded-full font-semibold text-white transition ${day === d ? 'bg-yellow-400 text-white' : 'bg-gray-300 text-gray-600'
                }`}
            >
              {d} Octubre
            </button>
          ))}
        </div>

        {/* Select de categoría */}
        <div className="mb-5 relative w-72">
          <label className="block mb-2 text-[#29568E] font-bold text-lg text-center">
            Filtrar por categoría
          </label>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none w-full bg-white border border-[#B1B1B4] text-[#29568E] py-3 px-4 pr-10 rounded-xl shadow-md 
                 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 font-medium text-base"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <svg
              className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Título de categoría seleccionada */}
        <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">
          {selectedCategory === 'Todos'
            ? 'Todas las categorías'
            : tipoLabels[selectedCategory]}
        </h2>

        {/* Renderizar conferencias */}
        <div className="w-full max-w-md">
          {filteredTalks.map((talk, index) => renderTalkCard(talk, index))}
        </div>
      </main>
    </div>
  );
}
