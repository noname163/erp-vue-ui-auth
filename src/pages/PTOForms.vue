<template>
  <div class='space-y-4'>
    <div class='flex items-center justify-between'>
      <h2 class='text-lg font-semibold'>{{ t('ptoPage.title') }}</h2>
      <div class='flex gap-2'>
        <button class='btn btn-primary h-9 px-3'>{{ t('ptoPage.newRequest') }}</button>
      </div>
    </div>
    <AppCard :title="t('ptoPage.requests')">
      <div class='text-sm text-[var(--text-muted)]'>List placeholder</div>
    </AppCard>
  </div>
</template>
<script setup lang="ts">
import AppCard from '../components/AppCard.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
