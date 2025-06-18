import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import logo from '../assets/logo.png'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="min-h-dvh overflow-hidden bg-[#DCDCDE]">
            {/* Header */}
            <header className="bg-white shadow-md md:hidden fixed top-0 left-0 w-full z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-[#014480]">INICIO DE SESIÓN</h1>
                    <nav className="space-x-4">
                        <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">Regresar</Link>
                    </nav>
                </div>
            </header>

            <main className="min-h-dvh pt-20 p-4 flex flex-col md:flex-row items-center justify-center md:p-10">
                {/* Logo del congreso */}
                <div className='w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-4'>
                    <img src={logo} alt="Logo Congreso" className='w-full max-w-xs md:max-w-md md:w-3/4' />
                </div>

                {/* Formulario */}
                <div className='w-full max-w-xs text-center mt-10 md:mt-0'>
                    <div className="flex justify-between items-center mb-4 px-1">
                        <span className="text-gray-700 font-semibold">Iniciar Sesión</span>
                        <a href="#" className="text-yellow-500 text-sm font-medium hover:underline">Regístrate aquí</a>
                    </div>

                    {/* Input Email */}
                    <div className="relative mb-4 ">
                        <EnvelopeIcon className="w-5 h-5 text-[#E6E6E6] absolute left-3 top-2.5" />
                        <input
                            type="email"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 w-full py-2 rounded bg-[#B1B1B4] text-gray-700 placeholder-[#E6E6E6] focus:outline-none"
                        />
                    </div>

                    {/* Input Password */}
                    <div className="relative mb-4 ">
                        <LockClosedIcon className="w-5 h-5 text-[#E6E6E6] absolute left-3 top-2.5" />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 w-full py-2 rounded bg-[#B1B1B4] text-gray-700 placeholder-[#E6E6E6] focus:outline-none"
                        />
                    </div>

                    {/* Botón ingresar */}
                    <button className="bg-yellow-400 text-white font-semibold w-full py-2 rounded hover:bg-[#014480]">
                        Ingresar
                    </button>

                    {/* Recuperar contraseña */}
                    <p className="text-sm mt-4 text-[#014480]">
                        Se te olvidó tu contraseña <a href="#" className="text-yellow-500 font-medium hover:underline">Pulsa Aquí</a>
                    </p>
                </div>
            </main>
        </div>
    )
}
