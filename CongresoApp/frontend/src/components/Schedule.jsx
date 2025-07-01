import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderMobile from '../modules/HeaderMobile';
import HeaderDesktop from '../modules/HeaderDesktop';
import { useEffect } from 'react';
import { ApiRequests } from '../core/ApiRequests';



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
};


export default function Schedule() {
  const [day, setDay] = useState('9');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const navigate = useNavigate();
  const apiRequest = new ApiRequests(); 
  const [listDeSimposios, setListDeSimposios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);


  useEffect ( ()  => {
    const  getSimposios =  async () =>{
        try{
            const listDeSimposios = await apiRequest.getAllSimposios();
            setListDeSimposios(listDeSimposios); 
             // Extraer departamentos únicos
      const departamentosUnicos = [
        ...new Set(listDeSimposios.map(s => s.departamento).filter(Boolean))
      ];
      console.log(departamentosUnicos)
      setDepartamentos(departamentosUnicos);
           
        }catch(error){
        console.error('Error al obtener simposios:', error);
        }
    };
    getSimposios();

  },[]); 



  const categoryOptions = [
  { label: 'Todos', value: 'Todos' },
  ...departamentos.map(dep => ({
    label: dep,
    value: dep
  }))
];

// Función para convertir ISO string a "H:mm"
  const formatoHora = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const horas = date.getHours();    // 0-23
    const minutos = date.getMinutes(); // 0-59
     console.log("horas")
    console.log("minutos")
    console.log(horas)
    console.log(minutos)

    return `${horas}:${minutos.toString().padStart(2, '0')}`;
  };

  const filteredTalks = listDeSimposios.filter(talk => {
    const fecha = talk.hora_inicio?.split('T')[0]; // "2025-10-09"
    const dia = fecha?.split('-')[2];  
    console.log(dia)
    console.log(fecha)             // "09"
    return (
      dia === day.padStart(2, '0') && 
      (selectedCategory === 'Todos' || talk.Tipo === selectedCategory)
    );
  });



  return (
    <div className="min-h-dvh w-full bg-[#DCDCDE] overflow-x-hidden">
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
              ${day === d ? 'bg-yellow-400 text-white' : 'bg-gray-300 text-gray-600'}`}
            >
              {d} Octubre
            </button>
          ))}
        </div>

        {/* Filtro de categoría */}
        <div className="mb-3 relative w-72">
          <label className="block my-3 text-[#29568E] font-bold text-lg text-center">
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

        {/* Título categoría */}
        <h2 className="text-2xl font-bold text-blue-900 mb-1 text-center">

          {selectedCategory === 'Todos'
            ? 'Todas las categorías'
            : departamentos[selectedCategory]}
        </h2>

        {/* Lista de conferencias */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-4">

          {filteredTalks.map((talk, index) => {
            
            const tpKey = "simposios";
            const colors = tpColorStyles[tpKey] || { bg: '#CCC', text: '#333' };

            return (
              <div
                key={index}
                onClick={() =>
                  navigate('/talk-details', {
                    state: {
                      ...talk,
                      descripcion: 'Esta conferencia abordará los últimos avances...',
                      salon: 'Salón A1',
                    },
                  })
                }
                className="cursor-pointer rounded-xl px-5 py-4 w-full shadow-md flex items-center gap-4 mt-4"
                style={{ backgroundColor: '#E6E6E6' }}
              >
                {/* Hora */}
                <div className="w-16 text-right pr-1">
              <span className="text-[#29568E] font-extrabold text-2xl">
                {`${formatoHora(talk.hora_inicio)}`}
              </span>                </div>

                {/* Línea vertical */}
                <div className="w-1 h-12 bg-yellow-400 rounded-sm" />

                {/* Info */}
                <div className="flex-1 flex flex-col justify-center pl-2">
                  <span className="text-[#29568E] font-bold text-xl leading-tight">
                    {talk.nombre}
                  </span>
                  <span className="text-gray-700 text-sm font-medium">
                    {talk.jefe}
                  </span>

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
          })}
        </div>
      </main>
    </div>
  );
}
