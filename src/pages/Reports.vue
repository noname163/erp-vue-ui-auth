<template>
  <div class='space-y-4'>
    <h2 class='text-lg font-semibold'>{{ t('reportsPage.title') }}</h2>
    <div class='grid md:grid-cols-3 gap-4'>
      <AppCard :title="t('reportsPage.operationLog')">
        <div class='text-sm text-[var(--text-muted)]'>Template</div>
      </AppCard>
      <AppCard :title="t('reportsPage.attendance')">
        <div class='text-sm text-[var(--text-muted)]'>Template</div>
      </AppCard>
      <AppCard :title="t('reportsPage.payroll')">
        <div class='text-sm text-[var(--text-muted)]'>Template</div>
      </AppCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppCard from '../components/AppCard.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
