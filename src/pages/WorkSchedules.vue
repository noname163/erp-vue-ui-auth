<template>
  <div class='space-y-4'>
    <div class='flex items-center justify-between'>
      <h2 class='text-lg font-semibold'>{{ t('workSchedules.title') }}</h2>
      <div class='flex gap-2'>
        <button class='btn btn-secondary h-9 px-3'>{{ t('workSchedules.copyLastWeek') }}</button>
        <button class='btn btn-primary h-9 px-3'>{{ t('workSchedules.newSchedule') }}</button>
      </div>
    </div>
    <div class='grid grid-cols-1 xl:grid-cols-2 gap-4'>
      <AppCard :title="t('workSchedules.calendarWeek')">
        <div class='h-64 grid place-items-center text-[var(--text-muted)]'>Calendar placeholder</div>
      </AppCard>
      <AppCard :title="t('workSchedules.shiftsTable')">
        <div class='h-64 grid place-items-center text-[var(--text-muted)]'>Table placeholder</div>
      </AppCard>
    </div>
  </div>
  
</template>
<script setup lang="ts">
import AppCard from '../components/AppCard.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
