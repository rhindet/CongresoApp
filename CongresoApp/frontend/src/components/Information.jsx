import { Link } from 'react-router-dom';
import HeaderMobile from '../modules/HeaderMobile';
import HeaderDesktop from '../modules/HeaderDesktop';
import logo from '../../public//assets/logo.png';
import logoCintermex from '../../public//assets/LogoCintermex.png';
import { useState } from 'react';

function Information() {

  const [showOscarFull, setShowOscarFull] = useState(false);

const oscarText = `Estimados estudiantes, profesores, investigadores y miembros de la comunidad universitaria:

Es un privilegio darles la más cordial bienvenida al 33º Congreso Nacional de Investigación e Innovación en Medicina, un espacio emblemático que, durante más de tres décadas, ha sido testigo del crecimiento académico y científico de nuestra institución.

Este congreso representa mucho más que un encuentro académico: es una celebración del talento, el pensamiento crítico y la vocación de servicio que caracteriza a nuestra comunidad. Con más de 850 trabajos de investigación e innovación, conferencias magistrales, simposios y talleres, este foro se consolida como una plataforma para impulsar el conocimiento que transforma realidades.

Este año, con entusiasmo damos paso al 1er Foro de Innovación Tecnológica en Salud, una nueva dimensión de diálogo y creatividad donde estudiantes, docentes e investigadores presentan ideas y prototipos con aplicación directa en la práctica médica.

Los invito a vivir esta experiencia como una oportunidad para transformar la teoría en soluciones, colaborar entre disciplinas y fortalecer la investigación clínica y traslacional. Su energía, su curiosidad y su compromiso son los motores que mantienen viva la esencia de este congreso.

A quienes guían, enseñan y acompañan: gracias por sembrar conocimiento y construir vocaciones. Su labor forma las bases de una medicina con excelencia académica y profundo sentido humano.

Y a toda la comunidad académica, su participación activa en este congreso reafirma nuestra misión institucional: servir con ciencia, valores y conciencia social.

Les deseo una experiencia enriquecedora, que despierte nuevas preguntas, genere alianzas duraderas y contribuya a construir un futuro donde la medicina mexicana siga avanzando con liderazgo y responsabilidad.

¡Sean todas y todos bienvenidos al 33.º Congreso!`;
const oscarShort = oscarText.split('\n')[0] + '\n...';


const [showCamachoFull, setShowCamachoFull] = useState(false);

const camachoText = `Es un verdadero honor darles la más cálida bienvenida al 33º Congreso Nacional de Investigación e Innovación en Medicina, que se llevará a cabo los próximos 9 y 10 de octubre de 2025 en el Centro Internacional de Negocios Monterrey (CINTERMEX).

Este congreso representa una celebración del dinamismo, la creatividad y la capacidad transformadora de la investigación y la innovación médica en México y en nuestra Facultad de Medicina de la UANL.

Como Subdirector de Investigación, me llena de orgullo unir a profesionales, académicos, estudiantes y visionarios comprometidos con la ambición compartida de impulsar la medicina hacia nuevos y trascendentes horizontes.

Nuestra misión es clara y apasionante: generar y difundir ideas disruptivas, promover la colaboración interdisciplinaria y acelerar proyectos que generen impacto real en la salud colectiva. Inspirados por la resiliencia mostrada durante la pandemia de COVID‑19, demostramos una vez más que, ante desafíos sin precedentes, podemos innovar con celeridad y eficacia.

El 1.er Foro de Innovación Tecnológica en Salud, que forma parte de este congreso, será una plataforma excepcional para presentar, retroalimentar y potenciar proyectos con enfoque científico y tecnológico en salud.

En este contexto, los invito a:
	•	Compartir sus ideas y avances en presentaciones, pósteres y el foro de innovación.
	•	Establecer redes de colaboración que trasciendan estas jornadas.
	•	Abrir canales interdisciplinarios donde el conocimiento se enriquezca y crezca de forma colectiva.

Les exhorto a aprovechar al máximo esta oportunidad: aprendan, dialoguen, colaboren y siembren las semillas de proyectos que transformen el bienestar de las personas.

Agradezco profundamente su compromiso, dedicación y pasión por la ciencia y la salud pública. Espero con entusiasmo convivir y aprender juntos en este evento de alto nivel académico.
`;

const camachoShort = camachoText.split('\n')[0] + '\n...';

  return (
    <div
      className="min-h-screen flex flex-col text-blue-900"
    >
      <HeaderMobile backLink="/home" title="CONVOCATORIA 2025" />
      <div className="hidden md:block">
        <HeaderDesktop backLink="/home" />
      </div>

      <main className="pt-28 pb-16 px-6 flex-grow w-full max-w-5xl mx-auto space-y-10">
  
        <section className="space-y-14">
          {/* Bloque Dr. Oscar */}
          <article className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">


            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-200 shadow-md shrink-0">
              <img
                src="/assets/Dr_ Oscar.png"
                alt="Dr. Oscar Vidal"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1 text-left md:text-justify space-y-2 md:space-y-4 text-gray-800">
              <h3 className="text-2xl font-bold text-blue-800">Dr. med. Oscar Vidal Gutiérrez</h3>
              <p className="text-sm italic text-blue-600">
                Director de la Facultad de Medicina y del Hospital Universitario "Dr. José Eleuterio González" – UANL
              </p>
              <p className="whitespace-pre-line leading-snug text-base text-justify">
                {showOscarFull ? oscarText : oscarShort}
              </p>
              <button
                onClick={() => setShowOscarFull(!showOscarFull)}
                className="text-blue-700 font-semibold underline mt-2"
>
                {showOscarFull ? 'Ver menos' : 'Ver más'}
              </button>

            </div>
          </article>

          {/* Bloque Dr. Camacho */}
          <article className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-200 shadow-md shrink-0">
              <img
                src="/assets/Dr_ Camacho.png"
                alt="Dr. Adrián Camacho"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1 text-left md:text-justify space-y-2 md:space-y-4 text-gray-800">
              <h3 className="text-2xl font-bold text-blue-800">Dr. med. Adrián Camacho Ortiz</h3>
              <p className="text-sm italic text-blue-600">
                Subdirector de Investigación, Facultad de Medicina, UANL
              </p>
              <p className="whitespace-pre-line leading-snug text-base text-justify">
                {showCamachoFull ? camachoText : camachoShort}
              </p>
              <button
                onClick={() => setShowCamachoFull(!showCamachoFull)}
                className="text-blue-700 font-semibold underline mt-2">
                {showCamachoFull ? 'Ver menos' : 'Ver más'}
              </button>

            </div>
          </article>
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
