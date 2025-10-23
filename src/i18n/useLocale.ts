import { computed } from 'vue'
import { i18n, setLocale, getLocale } from './index'

export function useLocale() {
  const locale = computed(() => i18n.global.locale.value as 'en' | 'vi')
  const changeLocale = (l: 'en' | 'vi') => setLocale(l)
  const toggleLocale = () => setLocale(getLocale() === 'en' ? 'vi' : 'en')
  return { locale, changeLocale, toggleLocale }
}

