import { inject, provide } from 'vue'

export type I18nResolver = { t: (key: string, params?: Record<string, any>) => string }
const I18N_RESOLVER = Symbol('I18N_RESOLVER')

export function provideI18nResolver(resolver: I18nResolver) {
  provide(I18N_RESOLVER, resolver)
}

export function useI18nResolver() {
  const r = inject<I18nResolver>(I18N_RESOLVER)
  if (!r) throw new Error('I18n resolver not provided')
  return r
}

