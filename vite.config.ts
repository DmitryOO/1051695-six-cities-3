/// <reference types='vitest' />
/// <reference types='vite/client' />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8', // или 'istanbul'
      reporter: ['text', 'json', 'html'], // форматы отчетов
      reportsDirectory: './coverage', // папка для отчетов
      include: ['src/**/*.{ts,tsx}'], // какие файлы проверять
      exclude: ['node_modules/', 'src/test/'], // что игнорировать
    },
  },
});
