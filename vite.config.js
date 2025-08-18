// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Use relative paths so that assets load correctly on GitHub Pages
  base: '/',
  plugins: [tailwindcss(), react()],
  build: {
    // Output the production builds into the `docs/` folder
    outDir: 'docs',
    // Clean the output directory on each build
    emptyOutDir: true,
    // Enable asset hashing for better security and cache busting
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Generate hashed filenames for all assets
          if (assetInfo.name && /\.(png|jpg|jpeg|gif|svg|webp|ico)$/i.test(assetInfo.name)) {
            // For images, use a more secure hash pattern
            return 'assets/[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
})
