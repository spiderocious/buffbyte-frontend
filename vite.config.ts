import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@buffbyte/components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@buffbyte/pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@buffbyte/routes': fileURLToPath(new URL('./src/routes', import.meta.url)),
      '@buffbyte/services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@buffbyte/types': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@buffbyte/utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@buffbyte/config': fileURLToPath(new URL('./src/config', import.meta.url)),
      '@buffbyte/constants': fileURLToPath(new URL('./src/constants', import.meta.url)),
      '@buffbyte/assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
    },
  },
})
