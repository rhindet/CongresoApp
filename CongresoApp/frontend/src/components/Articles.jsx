import { Link } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';

const articlesData = [
  {
    titulo: 'Avances de Cardiología',
    hora: '08:00',
    salon: 'Salón C1D1',
    doctor: 'Dr. Chapatin',
    descripcion:
      'Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia'
  },
  {
    titulo: 'Innovaciones en Neurocirugía',
    hora: '10:00',
    salon: 'Salón A2B2',
    doctor: 'Dra. Grey',
    descripcion:
      'Neurocirugía moderna y tecnologías emergentes para procedimientos mínimamente invasivos y tratamientos más eficientes autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones  han evolucionado a través de los años',
  },

  {
    titulo: 'Innovaciones en Medicina',
    hora: '10:00',
    salon: 'Salón A2B2',
    doctor: 'Dra. Grey',
    descripcion:
      'Neurocirugía moderna y tecnologías emergentes para procedimientos mínimamente invasivos y tratamientos más eficientes autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones  han evolucionado a través de los años',
  },

];

function Articles() {
  return (
    <div className="min-h-screen bg-gray-300 w-full">
      {/* NAVBAR FIJA */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-gray-300">
        <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto w-full">
          <Link
            to="/"
            className="text-gray-700 text-2xl hover:text-indigo-600 transition"
          >
            <FaArrowLeft />
          </Link>
          <h1 className="text-3xl font-bold text-blue-900 text-center flex-1 mr-8">
            Artículos
          </h1>
        </div>
      </div>

      {/* CONTENIDO */}
      <main className="pt-20 pb-10 min-h-screen flex flex-col items-center w-full px-4">
        {articlesData.map((articulo, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-xl p-6 w-full max-w-4xl shadow-lg mt-4"
          >
            <h2 className="text-3xl font-bold text-gray-700 mb-2">
              {articulo.titulo}
            </h2>

            <div className="flex justify-between items-center mb-1 mt-3">
              <span className="text-blue-700 font-bold text-2xl">
                {articulo.hora}
              </span>
              <span className="text-yellow-500 font-bold text-2xl">
                {articulo.salon}
              </span>
            </div>

            <div className="flex justify-between text-xl text-yellow-400 font-semibold mb-3">
              <span>{articulo.doctor}</span>
            </div>

            <p className="text-gray-700 text-sm mb-4 text-justify">
              {articulo.descripcion}
            </p>

            <div className="flex items-center justify-between mt-4">
              <FaMapMarkerAlt className="text-red-600 text-xl" />
              <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded text-sm transition transform hover:scale-105">
                Agregar al Calendario
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Articles;
