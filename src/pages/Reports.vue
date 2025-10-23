<template>
  <div class='space-y-4'>
    <h2 class='text-lg font-semibold'>Reports</h2>
    <div class='grid md:grid-cols-3 gap-4'>
      <AppCard title="Operation Log">
        <div class='text-sm text-[var(--text-muted)]'>Template</div>
      </AppCard>
      <AppCard title="Attendance">
        <div class='text-sm text-[var(--text-muted)]'>Template</div>
      </AppCard>
      <AppCard title="Payroll">
        <div class='text-sm text-[var(--text-muted)]'>Template</div>
      </AppCard>
    </div>
  </div>
</template>
<script setup>
import AppCard from '../components/AppCard.vue'
</script>

