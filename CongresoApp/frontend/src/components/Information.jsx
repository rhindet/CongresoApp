import { Link } from 'react-router-dom';
import HeaderMobile from '../modules/HeaderMobile';
import HeaderDesktop from '../modules/HeaderDesktop';
import logo from '../../public//assets/logo.png';
import logoCintermex from '../../public//assets/LogoCintermex.png';

function Information() {
  return (
    <div
      className="min-h-screen flex flex-col text-blue-900"
    >
      {/* Header Mobile*/}
      <HeaderMobile backLink="/home" title="CONVOCATORIA 2025" />
      {/* Header Desktop */}
      <div className="hidden md:block">
        <HeaderDesktop backLink="/home" />
      </div>

      {/* CONTENIDO */}
      <main className="pt-28 pb-16 px-6 flex-grow w-full max-w-4xl mx-auto">
        <section className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-6 border border-gray-200">
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
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-4 px-6 flex justify-between items-center w-full border-t border-gray-300">
        <img
          src={logo}
          alt="Logo Principal"
          className="w-35 object-contain"
        />
        <img
          src={logoCintermex}
          alt="Logo Cintermex"
          className="w-15 object-contain"
        />
      </footer>
    </div>
  );
}

export default Information;
