import { defineConfig } from 'vite'
// import dns from 'dns'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// dns.setDefaultResultOrder('verbatim')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server:{
    host:'0.0.0.0',
    port:5173
  }
})
