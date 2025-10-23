import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig as defineTestConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  test: { environment: 'happy-dom', globals: true }
})
