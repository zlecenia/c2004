// frontend/vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    hmr: {
      port: 24678
    },
    watch: {
      usePolling: true
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['zod']
        }
      }
    }
  },
  define: {
    // Ensure env variables are available
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'http://localhost:8101'),
    'import.meta.env.VITE_WS_URL': JSON.stringify(process.env.VITE_WS_URL || 'ws://localhost:8101'),
    'import.meta.env.VITE_CDN_URL': JSON.stringify(process.env.VITE_CDN_URL || 'http://localhost:9000'),
    'import.meta.env.VITE_LOG_LEVEL': JSON.stringify(process.env.VITE_LOG_LEVEL || 'info'),
    'import.meta.env.VITE_ENABLE_RFID': JSON.stringify(process.env.VITE_ENABLE_RFID || 'true'),
    'import.meta.env.VITE_ENABLE_QR': JSON.stringify(process.env.VITE_ENABLE_QR || 'true'),
    'import.meta.env.VITE_ENABLE_BARCODE': JSON.stringify(process.env.VITE_ENABLE_BARCODE || 'true'),
    'import.meta.env.VITE_ENABLE_MANUAL': JSON.stringify(process.env.VITE_ENABLE_MANUAL || 'true'),
  }
});
