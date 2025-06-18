// import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import confevents from '../assets/conf-events.png'

function Home() {
  // const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-[#DCDCDE] flex flex-col items-center justify-center p-4 md:flex-row md:p-10">
      {/* Logo del congreso */}
      <div className='w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-4'>
        <img src={logo} alt="Logo Congreso" className='w-full max-w-xs mx-auto' />
      </div>

      {/* Texto fechas del congreso */}
      <div className='w-full md:w-1/2 flex flex-col items-center text-center space-y-4'>
        <p className='text-xl md:text-3xl font-bold mt-1 text-[#014480]'>
          10-11 de
          <span className="text-yellow-500 ml-1.5">Octubre</span>
        </p>
      </div>

      {/* Imagen central */}
      <div className="md:hidden mb-4">
        <img src={confevents} alt="Conferences Icon" className="w-full max-w-[200px] mx-auto md:w-50" />
      </div>

      {/* Botones */}
      <div className='text-center md:m-10'>
        <span className="text-xl md:text-2xl font-bold text-[#014480]">Bienvenido Usuario</span>
        <div className="flex flex-row gap-4 mt-3">
          <button className="bg-yellow-400 text-white px-5 py-2 rounded-full font-medium w-40 hover:bg-[#014480]">
            <Link to="/login">Iniciar Sesión</Link>
          </button>
          <button className="bg-yellow-400 text-white px-5 py-2 rounded-full font-medium w-40 hover:bg-[#014480]">
            <Link to="/resgitrarse">Registrarse</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
