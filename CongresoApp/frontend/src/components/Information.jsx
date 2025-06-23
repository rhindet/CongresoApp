import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import logoPrincipal from '../assets/logo.png';
import logoCintermex from '../assets/LogoCintermex.png';

function Info() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-300 text-blue-900">
      {/* NAVBAR */}
      <div className="bg-gray-300 fixed top-0 left-0 right-0 z-10 shadow-md">
        <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto w-full">
          <Link
            to="/home"
            className="text-gray-700 text-2xl hover:text-indigo-600 transition"
          >
            <FaArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold text-blue-900 text-center flex-1 mr-8">
            CONVOCATORIA 2025
          </h1>
        </div>
      </div>

      {/* CONTENIDO */}
      <main className="pt-24 pb-10 px-4 flex-grow w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">Bienvenido al Congreso</h2>
          <p className="text-gray-700 leading-relaxed">
            CONVOCA A TODA LA COMUNIDAD UNIVERSITARIA
          </p>

          <h3 className="text-lg font-semibold mt-4">Ubicación</h3>
          <p className="text-gray-700">
            Centro de Convenciones Cintermex, Monterrey, N.L.
          </p>

          <h3 className="text-lg font-semibold mt-4">Fecha y Horarios</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>📅 25 al 28 de Octubre 2025</li>
            <li>🕘 Horario: 9:00 AM - 6:00 PM</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4">¿Qué incluye?</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Ponencias y talleres</li>
            <li>Conferencistas nacionales e internacionales</li>
            <li>Presentaciones Orales</li>
            <li>Platicas Magistrales</li>
            <li>Simposios</li>
          </ul>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-4 px-6 flex justify-between items-center w-full border-t border-gray-400 bg-gray-300">
        <img
          src={logoPrincipal}
          alt="Logo Principal"
          className="h-12 object-contain"
        />
        <img
          src={logoCintermex}
          alt="Logo Cintermex"
          className="h-12 object-contain"
        />
      </footer>
    </div>
  );
}

export default Info;
