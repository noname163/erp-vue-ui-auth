<template>
  <div class='space-y-4'>
    <h2 class='text-lg font-semibold'>{{ t('salaryTax.title') }}</h2>
    <AppCard :title="t('salaryTax.stepperTitle')">
      <ol class='flex gap-4 text-sm'>
        <li class='badge'>{{ t('salaryTax.steps.selectPeriod') }}</li>
        <li class='badge'>{{ t('salaryTax.steps.validateTime') }}</li>
        <li class='badge'>{{ t('salaryTax.steps.adjustments') }}</li>
        <li class='badge'>{{ t('salaryTax.steps.taxCalc') }}</li>
        <li class='badge'>{{ t('salaryTax.steps.review') }}</li>
        <li class='badge'>{{ t('salaryTax.steps.export') }}</li>
      </ol>
    </AppCard>
  </div>
</template>
<script setup lang="ts">
import AppCard from '../components/AppCard.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
