import React from 'react';
import '../assets/loader.css'

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="dot-pulse"></div>
      <span className="loading-text">Cargando...</span>
    </div>
  );
};

export default Loader;