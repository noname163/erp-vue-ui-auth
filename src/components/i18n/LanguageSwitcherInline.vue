<script setup lang="ts">
import { useLocale } from '@/i18n/useLocale'
import { useI18n } from 'vue-i18n'
const { locale, changeLocale } = useLocale()
const { t } = useI18n()
</script>

<template>
  <div class="flex items-center gap-2">
    <span class="text-sm text-[var(--text-secondary)]">{{ t('app.language') }}</span>
    <select
      class="rounded-md border px-2 py-1 text-sm bg-surface"
      :value="locale"
      @change="changeLocale(($event.target as HTMLSelectElement).value as 'en' | 'vi')"
      aria-label="Language selector"
    >
      <option value="en">{{ t('app.english') }}</option>
      <option value="vi">{{ t('app.vietnamese') }}</option>
    </select>
  </div>
</template>

