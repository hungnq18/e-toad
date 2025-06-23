import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(), // Plugin hỗ trợ React
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Hỗ trợ import '@/components/xxx'
    },
  },
  build: {
    outDir: 'dist', // Thư mục build, mặc định là 'dist'
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1600,
  },
  base: '/', // Đảm bảo base URL là gốc (root), cần thiết khi deploy chung với backend
  server: {
    historyApiFallback: true,
    port: 5173,
    host: true
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }
});
