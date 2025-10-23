import { createI18n } from 'vue-i18n'
import en from '@/locales/en/common.json'
import vi from '@/locales/vi/common.json'

const STORAGE_KEY = 'app.locale'
const DEFAULT_LOCALE = ((localStorage.getItem(STORAGE_KEY) || navigator.language || 'en')
  .toLowerCase()
  .startsWith('vi')) ? 'vi' : 'en'

export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: 'en',
  messages: { en, vi }
})

export function setLocale(locale: 'en' | 'vi') {
  i18n.global.locale.value = locale
  localStorage.setItem(STORAGE_KEY, locale)
}

export function getLocale(): 'en' | 'vi' {
  return i18n.global.locale.value as 'en' | 'vi'
}

