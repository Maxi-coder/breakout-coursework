import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const entry = fileURLToPath(new URL('./src/index.ts', import.meta.url))

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry,
      name: 'BreakoutUiComponents',
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'style',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
})
