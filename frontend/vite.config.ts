import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Definindo a configuração do Vite para o frontend
export default defineConfig({
  plugins: [react()],
  root: './frontend', // Certificando-se de que o Vite procure a pasta frontend
  build: {
    outDir: '../dist', // Para definir a saída do build
  },
})

