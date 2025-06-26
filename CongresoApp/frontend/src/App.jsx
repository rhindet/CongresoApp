// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Inicio from "./components/Inicio";
import Home from "./components/Home";
import Location from "./components/Location";
import Schedule from "./components/Schedule";
import TalkDetails from './components/TalkDetails';
<<<<<<< HEAD
import Information from './components/Information';
=======
import Categories from './components/Events';
import Info from './components/Information';
import Simposios from './components/Simposios';
import Magistrales from './components/Magistrales';
import PO from './components/PO';
>>>>>>> 78ef72d (Prueba)

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/home" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/location" element={<Location />} />
<<<<<<< HEAD
      <Route path="/talk-detail" element={<TalkDetails />} />
      <Route path="/information" element={<Information />} />
    </Routes>
    )
=======
      <Route path="/talk-details" element={<TalkDetails />} />
      <Route path="/events" element={<Categories />} />
      <Route path='/information' element={<Info />} />
      <Route path='/simposios' element={<Simposios />} />
      <Route path='/magistrales' element={<Magistrales />} />
      <Route path='/Preor' element={<PO />} />

    </Routes>
  )
>>>>>>> 78ef72d (Prueba)
}

export default App