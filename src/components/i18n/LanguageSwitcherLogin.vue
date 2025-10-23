<script setup lang="ts">
import { useLocale } from '@/i18n/useLocale'
import { useI18n } from 'vue-i18n'
const { locale, changeLocale, toggleLocale } = useLocale()
const { t } = useI18n()
</script>

<template>
  <div class="flex items-center justify-end gap-3 w-full">
    <button
      type="button"
      class="rounded-lg border px-3 py-1 text-sm hover:bg-[var(--bg-canvas)]"
      @click="toggleLocale"
      :aria-label="t('app.language')"
      :title="t('app.language')"
    >
      {{ locale === 'en' ? t('app.vietnamese') : t('app.english') }}
    </button>

    <select
      class="rounded-lg border px-3 py-1 text-sm bg-surface"
      :value="locale"
      @change="changeLocale(($event.target as HTMLSelectElement).value as 'en' | 'vi')"
      aria-label="Language selector"
    >
      <option value="en">{{ t('app.english') }}</option>
      <option value="vi">{{ t('app.vietnamese') }}</option>
    </select>
  </div>
</template>

