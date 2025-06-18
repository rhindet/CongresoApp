// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Inicio from "./components/Inicio";
import Home from "./components/Home";
import Location from "./components/Location";
import Articles from "./components/Articles";

function App() {      
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/home" element={<Home />} />
      <Route path="/location" element={<Location />} />
      <Route path="/articles" element={<Articles />} />
    </Routes>
    )
}

export default App