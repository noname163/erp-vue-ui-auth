import { defineConfig } from 'vite'
import { defineConfig as defineTestConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
export default defineConfig({ plugins: [vue()], test: { environment: 'happy-dom', globals: true } })
