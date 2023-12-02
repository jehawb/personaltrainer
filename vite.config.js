import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/personaltrainer/',   // Required for github pages? Breaks all the navigation atleast
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },

})
