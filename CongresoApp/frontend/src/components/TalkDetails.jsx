import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import HeaderMobile from '../modules/HeaderMobile'
import HeaderDesktop from '../modules/HeaderDesktop'
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
<<<<<<< HEAD
        <div className="min-h-dvh overflow-hidden bg-[#DCDCDE]">
=======
        <div className="min-h-dvh w-full bg-[#DCDCDE] overflow-x-hidden">
>>>>>>> 78ef72d (Prueba)
            {/* HEADER */}
            <HeaderMobile backLink="/schedule" title="Detalle" />
            {/* Heacer Desktop */}
            <div className="hidden md:block">
                <HeaderDesktop backLink="/schedule" />
            </div>

            <main className="pt-20 px-4 pb-10 flex justify-center">
                <div className="bg-white p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl shadow-md w-full max-w-3xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#014480]">{titulo}</h2>
                    <p className="text-sm md:text-base text-gray-600 mt-2">{hora} - {doctor}</p>

                    <h3 className="mt-5 text-lg md:text-xl font-semibold text-[#977b27]">Resumen</h3>
                    <p className="text-sm md:text-base mt-2 text-gray-700">{descripcion || 'Aún no disponible.'}</p>

                    <h3 className="mt-5 text-lg md:text-xl font-semibold text-[#977b27]">Salón</h3>
                    <p className="text-sm md:text-base text-gray-700">{salon || 'Auditorio Principal'}</p>

                    <div className="mt-6">
                        <img
                            src={planoMapa}
                            alt="Mapa del auditorio"
                            className="w-full max-h-[500px] object-contain rounded-lg border"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}