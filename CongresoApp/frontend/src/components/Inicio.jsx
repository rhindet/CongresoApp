import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function Inicio() {
  return (
    <div className="min-h-dvh bg-[#DCDCDE] flex flex-col md:flex-row items-center justify-center p-4 md:p-10 gap-6 overflow-x-hidden">
      {/* Logo del congreso */}
      <div className='w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-4'>
        <img src={logo} alt="Logo Congreso" className='w-full max-w-xs md:max-w-sm lg:max-w-md' />
      </div>

      {/* Texto fechas del congreso */}
      <div className='w-full md:w-1/2 flex flex-col items-center text-center space-y-4'>
        <p className='text-2xl md:text-3xl font-bold mt-1 text-[#29568E]'>
          9-10 de
          <span className="text-yellow-400 mx-2">Octubre</span>
          2025
        </p>
      </div>

      {/* Imagen central */}
      <div className='w-full md:w-1/2 flex flex-col items-center gap-6'>

      {/* Boton */}
        <div className="flex flex-row gap-4 mt-3 md:mx-auto md:w-full">
          <Link
            to="/home"
            className="bg-yellow-400 text-white px-6 py-3 rounded-full font-medium w-40 text-center hover:bg-[#29568E] transition-all duration-300 md:w-full"
          >
            Bienvenido
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Inicio
