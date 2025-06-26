<<<<<<< HEAD
=======

>>>>>>> 78ef72d (Prueba)
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import logoPrincipal from '../assets/logo.png';
import logoCintermex from '../assets/LogoCintermex.png';
<<<<<<< HEAD

function Info() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-300 text-blue-900">
      {/* NAVBAR */}
      <div className="bg-gray-300 fixed top-0 left-0 right-0 z-10 shadow-md">
        <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto w-full">
          <Link
            to="/home"
            className="text-gray-700 text-2xl hover:text-indigo-600 transition"
=======
import backgroundPage from '../assets/Fondo.png'; 

function Info() {
  return (
    <div
      className="min-h-screen flex flex-col text-blue-900"
      style={{
        backgroundImage: `url(${backgroundPage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* NAVBAR */}
      <div className="bg-white fixed top-0 left-0 right-0 z-10 shadow-md">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <Link
            to="/home"
            className="text-gray-600 text-2xl hover:text-blue-700 transition"
>>>>>>> 78ef72d (Prueba)
          >
            <FaArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold text-blue-900 text-center flex-1 mr-8">
            CONVOCATORIA 2025
          </h1>
        </div>
      </div>

      {/* CONTENIDO */}
<<<<<<< HEAD
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
=======
      <main className="pt-28 pb-16 px-6 flex-grow w-full max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-6 border border-gray-200">
          <h2 className="text-2xl font-extrabold text-blue-800 border-b pb-2">
            1er Foro de Innovación Tecnológica en Salud
          </h2>

          <p className="text-gray-700 leading-relaxed text-lg justify items-center">
            Participa en el <strong>1er Foro de Innovación Tecnológica en Salud</strong>, dentro del <strong>33° Congreso Nacional de Investigación e Innovación en Medicina</strong>, a realizarse los días <span className="font-semibold text-blue-700">9 y 10 de octubre de 2025</span> en el <strong>CINTERMEX</strong>, Monterrey.
          </p>

          <p className="text-gray-700 text-lg">
            El foro busca <span className="font-medium text-blue-800">impulsar la innovación tecnológica en salud</span>, brindando a investigadores, docentes y estudiantes una plataforma para mostrar sus proyectos, obtener retroalimentación de expertos y establecer nuevas redes de colaboración.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-blue-800 mb-1">Exposición de Proyectos</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Los equipos deben llegar <strong>30 minutos antes</strong> para preparar su stand.</li>
              <li>Presentar un <strong>prototipo o prueba de concepto</strong>.</li>
              <li>Se permite llevar laptop y <strong>póster científico (90cm x 120cm)</strong>.</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-green-800 mb-1">Constancias</h3>
            <p className="text-gray-700">
              Se otorgará constancia a los integrantes de proyectos seleccionados para exposición presencial. Por favor, revisa cuidadosamente la información antes del registro.
            </p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-yellow-800 mb-1">Confidencialidad</h3>
            <p className="text-gray-700">
              La Facultad de Medicina de la UANL garantiza la privacidad de los datos personales y la propiedad intelectual de los proyectos. No se compartirá información sin el consentimiento del participante, salvo por requerimiento legal. El comité evaluador también mantendrá la reserva de toda la información manejada.
            </p>
          </div>
>>>>>>> 78ef72d (Prueba)
        </div>
      </main>

      {/* FOOTER */}
<<<<<<< HEAD
      <footer className="py-4 px-6 flex justify-between items-center w-full border-t border-gray-400 bg-gray-300">
=======
      <footer className="py-4 px-6 flex justify-between items-center w-full border-t border-gray-400 bg-white/80 backdrop-blur-md shadow-inner">
>>>>>>> 78ef72d (Prueba)
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

<<<<<<< HEAD
=======

>>>>>>> 78ef72d (Prueba)
export default Info;
