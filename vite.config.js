import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig as defineTestConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_API_PROXY_TARGET
  return {
    plugins: [vue()],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    test: { environment: 'happy-dom', globals: true },
    server: proxyTarget
      ? {
          proxy: {
            // Proxy API requests in dev to avoid CORS and send cookies
            '/api': {
              target: proxyTarget,
              changeOrigin: true,
              secure: false,
            },
          },
        }
      : undefined,
    // Expose selected envs for debugging if needed
    define: {
      __APP_ENV__: JSON.stringify(mode),
    },
  }
})
