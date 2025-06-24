// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Inicio from "./components/Inicio";
import Home from "./components/Home";
import Location from "./components/Location";
import Schedule from "./components/Schedule";
import TalkDetails from './components/TalkDetails';
import Categories from './components/Categories';
import Information from './components/Information';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/home" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/location" element={<Location />} />
      <Route path="/talk-details" element={<TalkDetails />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/information" element={<Information />} />
    </Routes>
  )
}

export default App