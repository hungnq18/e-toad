import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(), // Plugin hỗ trợ React
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Hỗ trợ import '@/components/xxx'
    },
  },
  build: {
    outDir: 'dist', // Thư mục build, mặc định là 'dist'
  },
  base: '/', // Đảm bảo base URL là gốc (root), cần thiết khi deploy chung với backend
});
