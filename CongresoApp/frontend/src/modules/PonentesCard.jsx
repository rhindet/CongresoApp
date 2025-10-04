import { useEffect, useState } from 'react';
import DefaultImg from '../.././public/assets/ponentes/default.png';

export default function PonentesCard({ programa, departamento, index, actividad1}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log("Programa", programa[0]?.afiliacion);
    console.log("Index", index);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {programa.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center">
          {programa.map((p, idx) => {
            const nombre = p.nombre ?? 'Sin dato';
            const afiliacion = p.afiliacion ?? 'Ponente';
            const imagen = p.imagen ?? DefaultImg;
            const actividad = actividad1 ?? '';
            const descripcion = p.descripcion ?? 'Sin descripción'

            const rutaFinal = imagen !== 'default.png'
              ? `/assets/ponentes/Simposio/${departamento}/${imagen}`
              : DefaultImg;


            return (
              <div key={idx} className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md w-48 relative">
                {/* 
                  ERROR: 
                  En esta parte del código si no se carga ninguna imagen para ningun ponente se desborda/descuadra la interfaz de la pantalla de detalle 
                */}

                {/* Imagen placeholder */}
                {!loaded && (
                  <img
                    src={DefaultImg}
                    alt="Cargando"
                    className="w-24 h-24 object-cover rounded-full mb-2 opacity-50"
                  />
                )}

                {/* Imagen real */}
                <img
                  src={rutaFinal}
                  alt={`Foto de ${nombre}`}
                  className={`w-24 h-24 object-cover rounded-full mb-2 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0 absolute'}`}
                  onLoad={() => setLoaded(true)}
                />

                <p className="text-sm font-semibold text-center">{nombre}</p>
                <p className="text-xs text-gray-500 text-center">{afiliacion}</p>

                <p className="text-sm mt-4 font-bold text-center text-[#977b27]"> Tema: </p>
                <p className="text-sm text-center text-[#977b27]"> {actividad} </p>
                <p className="text-xs text-gray-600 text-center mt-2 ">{descripcion}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}