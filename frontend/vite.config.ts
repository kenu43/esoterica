import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // En desarrollo, /api/requests va al emulador de Functions (`pnpm --dir backend/functions serve`)
    proxy: {
      '/api/requests': {
        target: 'http://127.0.0.1:5001',
        rewrite: () => '/esoterica-app/us-central1/sendRequest',
      },
    },
  },
  build: {
    target: 'es2022',
    // Firebase, Leaflet y cada página se cargan bajo demanda (import dinámico).
    // Los estilos de HeroUI pesan ~57 kB gzip; se pueden recortar importando solo
    // los componentes usados (ver README → Rendimiento).
    chunkSizeWarningLimit: 650,
  },
})
