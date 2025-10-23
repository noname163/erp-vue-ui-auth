import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './styles/tailwind.css'
import { i18n } from '@/i18n'
import { provideI18nResolver } from '@/i18n/provideI18n'

const app = createApp(App)
app.use(createPinia()).use(router).use(i18n)

provideI18nResolver({ t: (k: string, p?: Record<string, any>) => i18n.global.t(k, p as any) as string })

app.mount('#app')
