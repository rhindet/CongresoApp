// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "./components/Home";
import Location from "./components/Location";
import Articles from "./components/Articles";
import { ApiRequests } from './core/ApiRequests'

function App() {
  // const [count, setCount] = useState(0)
  // const [loginResult, setLoginResult] = useState(null)  // estado para resultado login
  // const api = new ApiRequests() // instancia de ApiRequests

  // // Función para llamar login y guardar resultado
  // const handleLogin = async () => {
  //   try {
  //     const result = await api.login('usuario123')
  //     setLoginResult(result)
  //   } catch (error) {
  //     setLoginResult({ error: error.message })
  //   }
  // }

        
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/location" element={<Location />} />
      <Route path="/articles" element={<Articles />} />
    </Routes>
    )
}

export default App