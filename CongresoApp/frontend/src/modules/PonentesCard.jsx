/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import PonenteModal from './PonenteModal';

const DEFAULT_IMG = '/assets/ponentes/default.png';

// encodea cada segmento para soportar espacios/acentos
const safeSeg = (s) => encodeURIComponent(String(s || '').trim());

export default function PonentesCard({ programa = [], departamento = '', index, actividad1, horario}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [ponenteSeleccionado, setPonenteSeleccionado] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    // Si quieres debug:
    // console.log('Programa ejemplo:', programa[0]);
    // console.log('Departamento:', departamento);
  }, []); // mount once

  const handleImageLoad = (idx) => {
    setLoadedImages((prev) => ({ ...prev, [idx]: true }));
  };

  const abrirModal = (ponenteData) => {
    setPonenteSeleccionado(ponenteData);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setPonenteSeleccionado(null);
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center">
        {(programa || []).map((p, idx) => {
          const nombre = p?.nombre ?? 'Sin dato';
          const afiliacion = p?.afiliacion ?? 'Ponente';
          const imagen = p?.imagen ?? 'default.png';
          const actividad = actividad1 ?? '';
          const descripcion = p?.descripcion ?? 'Sin descripción disponible.';
          const horario1 = p?.horario ?? 'Sin Horario';
          const isImageLoaded = !!loadedImages[idx];

          // Si no es default, arma la ruta desde /public
          const rutaFinal =
            imagen && imagen !== 'default.png'
              ? `/assets/ponentes/Simposio/${safeSeg(departamento)}/${safeSeg(imagen)}`
              : DEFAULT_IMG;

          return (
            <div
              key={`${index ?? 'grp'}-${idx}`}
              className="flex flex-col items-center bg-white p-3 rounded-xl shadow-md w-48 text-center relative"
            >
              {/* Contenedor de la imagen */}
              <div className="w-24 h-24 mb-2 relative">
                {!isImageLoaded && (
                  <img
                    src={DEFAULT_IMG}
                    alt="Cargando..."
                    className="w-24 h-24 object-cover rounded-full absolute opacity-50"
                  />
                )}

                <img
                  src={rutaFinal}
                  alt={`Foto de ${nombre}`}
                  className={`w-24 h-24 object-cover rounded-full transition-opacity duration-500 ${
                    isImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(idx)}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DEFAULT_IMG;
                    handleImageLoad(idx);
                  }}
                />
              </div>

              {/* Contenido del card */}
              <p className="text-sm font-semibold">{nombre}</p>
              <p className="text-xs text-gray-500 mb-2">{afiliacion}</p>

              <p className="text-sm font-bold text-[#977b27]">Tema:</p>
              <p className="text-sm text-[#977b27] mb-5">{actividad}</p>

              <p className='mt-auto text-gray-500 focus:outline-none'>{horario}</p>

              {/* Botón "Ver más" */}
              <button
                onClick={() => abrirModal({ nombre, afiliacion, descripcion, rutaFinal, actividad })}
                className="mt-auto text-sm font-semibold text-blue-600 hover:underline focus:outline-none"
              >
                Ver más
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modalVisible && <PonenteModal ponente={ponenteSeleccionado} onClose={cerrarModal} />}
    </>
  );
}
