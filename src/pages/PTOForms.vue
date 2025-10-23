<template>
  <div class='space-y-4'>
    <div class='flex items-center justify-between'>
      <h2 class='text-lg font-semibold'>PTO & Forms</h2>
      <div class='flex gap-2'>
        <button class='btn btn-primary h-9 px-3'>New Request</button>
      </div>
    </div>
    <AppCard title="Requests">
      <div class='text-sm text-[var(--text-muted)]'>List placeholder</div>
    </AppCard>
  </div>
</template>
<script setup lang="ts">
import AppCard from '../components/AppCard.vue'
</script>

