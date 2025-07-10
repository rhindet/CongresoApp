import { useEffect } from 'react';

export default function Ponentes({ programa, departamento, index }) {
  useEffect(() => {
    console.log("Programa", programa[0]?.afiliacion);
    console.log("Index", index);
  }, []);

  return (
    <>
      {programa.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center">
          {programa.map((p, idx) => (
            <div key={idx} className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md w-48">
              <img
                src={`/assets/ponentes/Simposio/${departamento}/${p.imagen}`}
                alt={`Foto de ${p.nombre}`}
                className="w-24 h-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-semibold text-center">{p.nombre}</p>
              <p className="text-xs text-gray-500 text-center">{p.afiliacion}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}