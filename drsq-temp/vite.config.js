import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    // The chat backend is PHP (public/api/chat.php). In development, run it with
    // `php -S localhost:8000 -t public` and Vite forwards /api calls to it.
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
