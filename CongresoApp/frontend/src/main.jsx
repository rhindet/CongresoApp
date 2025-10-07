import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// =========================================================================
// 💡 CÓDIGO DE REGISTRO DEL SERVICE WORKER
// =========================================================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // La ruta debe ser relativa a la raíz de tu dominio (ya que el archivo está en /public)
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch(error => {
        console.error('Fallo el registro del Service Worker:', error);
      });
  });
}