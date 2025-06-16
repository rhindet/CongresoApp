import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "./components/Home";
import Location from "./components/Location";
import { ApiRequests } from './core/ApiRequests'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [loginResult, setLoginResult] = useState(null)  // estado para resultado login
  const api = new ApiRequests() // instancia de ApiRequests

  // Función para llamar login y guardar resultado
  const handleLogin = async () => {
    try {
      const result = await api.login('usuario123')
      setLoginResult(result)
    } catch (error) {
      setLoginResult({ error: error.message })
    }
  }

        
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/location" element={<Location />} />
    </Routes>
    )
}

export default App