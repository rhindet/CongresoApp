import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import planoMapa from '../assets/Plano_Centro_de_Convenciones_1 (ZONACONGRESO).jpg';

export default function TalkDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate('/schedule');
    }
  }, [state, navigate]);

  if (!state) return null;

  const { titulo, hora, doctor, descripcion, salon } = state;

  return (
    <div className="min-h-screen bg-[#DCDCDE]">
      {/* HEADER */}
      <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/schedule" className="text-gray-700 hover:text-indigo-600 font-bold">
            <ChevronLeftIcon className='w-8 text-black hover:text-indigo-600' />
          </Link>
          <h1 className="text-xl font-bold text-[#014480]">Detalle</h1>
          <div className="w-8" />
        </nav>
      </header>

      <main className="pt-20 px-4 pb-10 flex flex-col items-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-[#014480]">{titulo}</h2>
          <p className="text-sm text-gray-600 mt-1">{hora} - {doctor}</p>

          <h3 className="mt-4 text-lg font-semibold text-[#977b27]">Resumen</h3>
          <p className="text-sm mt-1 text-gray-700">{descripcion || 'Aún no disponible.'}</p>

          <h3 className="mt-4 text-lg font-semibold text-[#977b27]">Salón</h3>
          <p className="text-sm text-gray-700">{salon || 'Auditorio Principal'}</p>

          <div className="mt-6">
            <img src={planoMapa} alt="Mapa del auditorio" className="w-full rounded-lg border" />
          </div>
        </div>
      </main>
    </div>
  );
}
