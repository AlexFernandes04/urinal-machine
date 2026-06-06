import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000, // Set your desired port here
    allowedHosts: ['urinal-machine-production.up.railway.app', 'urinal-machine.onrender.com', 'https://alexfernandes04.github.io/urinal-machine/'], // Allow ngrok subdomains
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

})
