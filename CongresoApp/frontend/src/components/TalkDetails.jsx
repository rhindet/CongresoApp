import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import HeaderMobile from '../modules/HeaderMobile'
import HeaderDesktop from '../modules/HeaderDesktop'
import YTLive from '../modules/YTLive'
import planoMapa from '../assets/Plano_Centro_de_Convenciones_1 (ZONACONGRESO).jpg'

export default function TalkDetail() {
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state) {
            navigate('/schedule');
        }
    }, [state, navigate]);

    if (!state) return null;

    const { titulo, hora, doctor, descripcion, salon, videoUrl } = state;

    return (
        <div className="min-h-dvh w-full bg-[#DCDCDE] overflow-x-hidden">
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

                    {/* Video de YouTube embevido*/}
                    <div className="mt-5 flex items-center gap-2">
                        <span
                            className={`w-3 h-3 rounded-full ${videoUrl ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
                                }`}
                        ></span>
                        <h3 className="text-lg md:text-xl font-semibold text-[#977b27]">EN VIVO</h3>
                    </div>
                    
                    {videoUrl ? (
                        <YTLive url={videoUrl} />
                    ) : (
                        <div className='relative w-full pb-[56.25%] mt-1'>
                            <div className="absolute top-0 left-0 w-full h-full bg-[#fefce8] flex items-center justify-center border rounded-lg">
                                <p className="text-[#977b27] font-semibold text-center px-4">
                                    El video en vivo comenzará próximamente.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}