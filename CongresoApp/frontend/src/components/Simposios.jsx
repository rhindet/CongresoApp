import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderMobile from '../modules/HeaderMobile';
import HeaderDesktop from '../modules/HeaderDesktop';

const scheduleData = [
    { titulo: 'Conferencia de Apertura', hora: '06:00', doctor: 'Dr. Daniela Cantú Barajas', fecha: '9', Tipo: 'His', tp: 'Presentaciones orales' },
    { titulo: 'Conferencia de Apertura', hora: '06:00', doctor: 'Dr. Daniela Cantú Barajas', fecha: '10', Tipo: 'Car', tp: 'Simposios' },
    { titulo: 'Avances de Cardiología', hora: '6:30', doctor: 'Dr. Martell Hinojosa', fecha: '9', Tipo: 'His', tp: 'Platicas magistrales' },
    { titulo: 'Investigación de Cáncer', hora: '7:00', doctor: 'Dr. Chester Bennington', fecha: '9', Tipo: 'His', tp: 'Presentaciones orales' },
    { titulo: 'Enfermedades Autoinmunes', hora: '7:00', doctor: 'Dr. Edgar Francisco Sandoval', fecha: '9', Tipo: 'Car', tp: 'Simposios' },
    { titulo: 'Conferencia Final', hora: '9:00', doctor: 'Dr. Chespín', fecha: '9', Tipo: 'His', tp: 'Platicas magistrales' },
    { titulo: 'Investigación de Cáncer', hora: '10:00', doctor: 'Dr. Chester Bennington', fecha: '9', Tipo: 'His', tp: 'Presentaciones orales' },
    { titulo: 'Enfermedades Autoinmunes', hora: '10:15', doctor: 'Dr. Edgar Francisco Sandoval', fecha: '9', Tipo: 'Car', tp: 'Platicas magistrales' },
    { titulo: 'Conferencia Final', hora: '11:00', doctor: 'Dr. Chespín', fecha: '9', Tipo: 'His', tp: 'Simposios' },
    { titulo: 'Nuevos Horizontes en Oncología', hora: '12:00', doctor: 'Dra. Grey', fecha: '10', Tipo: 'His', tp: 'Platicas magistrales' },
    { titulo: 'Cuidado de la piel', hora: '13:00', doctor: 'Dr. Enrique Segobiano', fecha: '10', Tipo: 'Car', tp: 'Presentaciones orales' },
];

function renderTalkCard(talk, index) {
    return (
        <Link
            to=""
            key={index}
            className="rounded-xl px-4 py-3 w-full shadow-md items-center flex gap-6 mt-4"
            style={{ backgroundColor: '#E6E6E6' }}
        >
            <div className="w-15 text-right pr-1">
                <span className="font-extrabold text-2xl text-[#29568E]">{talk.hora}</span>
            </div>
            <div className="w-1 h-12 bg-yellow-400 rounded-sm" />
            <div className="flex-1 flex flex-col">
                <span className="font-bold text-xl text-[#29568E]">{talk.titulo}</span>
                <span className="text-gray-700 text-sm font-medium">{talk.doctor}</span>
            </div>
        </Link>
    );
}

function Simposios() {
    const [day, setDay] = useState('9');

    const filteredTalks = scheduleData.filter((talk) => talk.fecha === day);

    return (
        <div className="min-h-dvh overflow-hidden bg-[#DCDCDE]">
            <HeaderMobile backLink="/events" title="Simposios" />
            <div className="hidden md:block">
                <HeaderDesktop backLink="/events" />
            </div>

            <main className="pt-20 pb-20 min-h-screen flex flex-col items-center w-full px-4">
                {/* Botones de día */}
                <div className="flex justify-center gap-4 mb-4">
                    {['9', '10'].map((d) => (
                        <button
                            key={d}
                            onClick={() => setDay(d)}
                            className={`px-10 py-3 rounded-full font-semibold text-white transition ${day === d ? 'bg-yellow-400 text-white' : 'bg-gray-300 text-gray-600'}`}
                        >
                            {d} Octubre
                        </button>
                    ))}
                </div>

                {/* Renderizar conferencias */}
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {filteredTalks.map((talk, index) => renderTalkCard(talk, index))}
                </div>
            </main>
        </div>
    );
}

export default Simposios;
