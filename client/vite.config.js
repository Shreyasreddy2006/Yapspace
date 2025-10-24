import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Alias Node-only `cookie` package (pulled in by react-router) to an ESM/browser-friendly
    // implementation so Vite can bundle it for the client.
    alias: {
      cookie: 'cookie-es'
    }
  },
  build: {
    outDir: 'dist',
  sourcemap: false,
  // Use esbuild minifier (bundled with Vite) to avoid adding terser as a dependency
  minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  },
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 3000,
    host: true
  }
})
