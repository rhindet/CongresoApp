// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Inicio from "./components/Inicio";
import Home from "./components/Home";
import Location from "./components/Location";
import Schedule from "./components/Schedule";
import TalkDetails from './components/TalkDetails';
import Events from './components/Events';
import Information from './components/Information';
import Simposios from './components/Simposios';
import Magistrales from './components/Magistrales';
import PO from './components/PO';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/home" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/location" element={<Location />} />
      <Route path="/talk-details" element={<TalkDetails />} />
      <Route path="/events" element={<Events />} />
      <Route path='/info' element={<Information />} />
      <Route path='/simposios' element={<Simposios />} />
      <Route path='/magistrales' element={<Magistrales />} />
      <Route path='/Preor' element={<PO />} />

    </Routes>
  )
}

export default App