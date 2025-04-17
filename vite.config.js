import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/front_5th_chapter2-1/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        basic: path.resolve(__dirname, 'index.html'),
        advanced: path.resolve(__dirname, 'index.advanced.html'),
      },
    },
  },
  server: {
    open: '/index.html',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js'
  },
})
