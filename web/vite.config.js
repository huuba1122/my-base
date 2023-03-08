import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@recoil': path.resolve(__dirname, './src/recoil'),
      '@services': path.resolve(__dirname, './src/services')
    }
  },
  plugins: [react(), eslint()],
  test: {
    globals: true,
    environment: 'jsdom'
  }
});
