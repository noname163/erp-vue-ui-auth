<template>
  <div class='space-y-4'>
    <h2 class='text-lg font-semibold'>Settings</h2>
    <div class='grid md:grid-cols-2 gap-4'>
      <AppCard title="Company">
        <div class='text-sm text-[var(--text-muted)]'>Fields...</div>
      </AppCard>
      <AppCard title="Departments">
        <div class='text-sm text-[var(--text-muted)]'>List...</div>
      </AppCard>
      <AppCard title="Roles & Permissions">
        <div class='text-sm text-[var(--text-muted)]'>Bitmask...</div>
      </AppCard>
      <AppCard title="API Keys">
        <div class='text-sm text-[var(--text-muted)]'>Keys...</div>
      </AppCard>
    </div>
  </div>
</template>
<script setup>
import AppCard from '../components/AppCard.vue'
</script>

