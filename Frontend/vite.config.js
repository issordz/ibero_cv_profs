import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-back': {
        target: 'https://gestionacreditacionespru.ibero.mx',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api-back/, '/back'),
      }
    }
  }
})
