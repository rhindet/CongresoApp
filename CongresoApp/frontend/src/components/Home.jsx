// import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import confevents from '../assets/conf-events.png'

function Home() {
  // const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-[#DCDCDE] flex flex-col md:flex-row items-center justify-center p-4 md:p-10">
      {/* Logo del congreso */}
      <div className='text-center md:text-left md:w-1/2 space-y-2 flex flex-col items-center md:items-start'>
        <img src={logo} alt="Logo Congreso" className='w-100 h-48 mx-auto' />
      </div>

      {/* Texto fechas del congreso */}
      <p className='text-xl md:text-3xl font-bold mt-1 text-[#014480]'>
        10-11 de
        <span className="text-yellow-500 ml-1.5">Octubre</span></p>

      {/* Imagen central */}
      <div className="mt-1 text-center md:hidden">
        <img src={confevents} alt="Conferences Icon" className="w-100 mx-auto md:w-50" />
      </div>

      {/* Botones */}
      <div className='mt-1 text-center md:m-20 md:mt-50'>
        <span className="text-xl md:text-2xl font-bold text-[#014480]">Bienvenido Usuario</span>
        <div className="mt-5 mb-30 flex gap-4">
          <button className="bg-yellow-400 text-white px-5 py-2 rounded-full font-medium w-40 h-10 hover:bg-[#014480]">
            Iniciar Sesión
          </button>
          <button className="bg-yellow-400 text-white px-5 py-2 rounded-full font-medium w-40 h-10 hover:bg-[#014480]">
            Registrarse
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
