import { useEffect, useState } from 'react';
import DefaultImg from '../.././public/assets/ponentes/default.png';
import PonenteModal from './PonenteModal';

export default function PonentesCard({ programa, departamento, index, actividad1 }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [ponenteSeleccionado, setPonenteSeleccionado] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});


  useEffect(() => {
    console.log("Programa", programa[0]?.afiliacion);
    console.log("Index", index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  // Función para abrir el modal con la información del ponente
  const abrirModal = (ponenteData) => {
    setPonenteSeleccionado(ponenteData);
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setModalVisible(false);
    setPonenteSeleccionado(null);
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center">
        {programa.map((p, idx) => {
          const nombre = p.nombre ?? 'Sin dato';
          const afiliacion = p.afiliacion ?? 'Ponente';
          const imagen = p.imagen ?? 'default.png';
          const actividad = actividad1 ?? '';
          const descripcion = p.descripcion ?? 'Sin descripción disponible.';
          const isImageLoaded = loadedImages[idx];

          const rutaFinal = imagen !== 'default.png'
            ? `/assets/ponentes/Simposio/${departamento}/${imagen}`
            : DefaultImg.src;

          return (
            <div
              key={idx}
              className="flex flex-col items-center bg-white p-3 rounded-xl shadow-md w-48 text-center relative"
            >
              {/* Contenedor de la imagen */}
              <div className="w-24 h-24 mb-2 relative">
                {!isImageLoaded && (
                  <img
                    src={DefaultImg.src}
                    alt="Cargando..."
                    className="w-24 h-24 object-cover rounded-full absolute"
                  />
                )}
                <img
                  src={rutaFinal}
                  alt={`Foto de ${nombre}`}
                  className={`w-24 h-24 object-cover rounded-full transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  onLoad={() => handleImageLoad(idx)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DefaultImg.src;
                    handleImageLoad(idx);
                  }}
                />
              </div>

              {/* Contenido del card */}
              <p className="text-sm font-semibold">{nombre}</p>
              <p className="text-xs text-gray-500 mb-2">{afiliacion}</p>

              <p className="text-sm font-bold text-[#977b27]">Tema:</p>
              <p className="text-sm text-[#977b27] mb-5">{actividad}</p>

              {/* Botón "Ver más" */}
              <button
                onClick={() => abrirModal({ nombre, afiliacion, descripcion, rutaFinal, actividad })}
                className="mt-auto text-sm font-semibold text-blue-600 hover:underline focus:outline-none" >
                Ver más
              </button>
            </div>
          );
        })}
      </div>

      {/* El componente Modal se renderiza cuando modalVisible es true */}
      {modalVisible && (
        <PonenteModal ponente={ponenteSeleccionado} onClose={cerrarModal} />
      )}
    </>
  );
}