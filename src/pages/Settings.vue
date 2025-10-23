<template>
  <div class='space-y-4'>
    <h2 class='text-lg font-semibold'>{{ t('settingsPage.title') }}</h2>
    <div class='grid md:grid-cols-2 gap-4'>
      <AppCard :title="t('settingsPage.company')">
        <div class='text-sm text-[var(--text-muted)]'>Fields...</div>
      </AppCard>
      <AppCard :title="t('settingsPage.departments')">
        <div class='text-sm text-[var(--text-muted)]'>List...</div>
      </AppCard>
      <AppCard :title="t('settingsPage.rolesPermissions')">
        <div class='text-sm text-[var(--text-muted)]'>Bitmask...</div>
      </AppCard>
      <AppCard :title="t('settingsPage.apiKeys')">
        <div class='text-sm text-[var(--text-muted)]'>Keys...</div>
      </AppCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppCard from '../components/AppCard.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
