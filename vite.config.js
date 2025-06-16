// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Use relative paths so that assets load correctly on GitHub Pages
  base: '/',
  plugins: [
      tailwindcss(),
    react()
  ],
  build: {
    // Output the production build into the `docs/` folder
    outDir: 'docs',
    // Clean the output directory on each build
    emptyOutDir: true
  }
})
