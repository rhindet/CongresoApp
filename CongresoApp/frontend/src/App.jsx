// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Inicio from "./components/Inicio";
import Home from "./components/Home";
import Location from "./components/Location";
import Schedule from "./components/Schedule";
import TalkDetailsSimposio from './components/TalkDetailsSimposio';
import TalkDetailsMagistrales from './components/TalkDetailsMagistrales';
import Events from './components/Events';
import Information from './components/Information';
import Simposios from './components/Cate_Eventos/Simposios';
import Magistrales from './components/Cate_Eventos/Magistrales';
import PO from './components/Cate_Eventos/PO';
import Admin from './components/Admin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/home" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/location" element={<Location />} />
      <Route path="/talk-details-simposio" element={<TalkDetailsSimposio />} />
      <Route path="/talk-details-magistrales" element={<TalkDetailsMagistrales />} />
      <Route path="/events" element={<Events />} />
      <Route path='/info' element={<Information />} />
      <Route path='/simposios' element={<Simposios />} />
      <Route path='/magistrales' element={<Magistrales />} />
      <Route path='/presentaciones' element={<PO />} />
      <Route path='/admin0707' element={<Admin />} />

    </Routes>
  )
}

export default App