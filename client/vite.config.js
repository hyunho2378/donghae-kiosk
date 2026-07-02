import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // /api 요청을 Express 서버(server/index.js, PORT 3001)로 프록시 (PROMPT 09)
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
