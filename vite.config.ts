// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // 🔴 IMPORTANT: yahan apne GitHub repo ka exact naam
  // tumhare case me folder/repo "luxeestate" hai:
  base: '/luxeestate/',

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    outDir: 'dist', // default bhi 'dist' hi hota hai, bas clarity ke liye
  },
})