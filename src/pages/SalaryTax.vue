<template>
  <div class='space-y-4'>
    <h2 class='text-lg font-semibold'>Salary & Tax</h2>
    <AppCard title="Payroll Stepper">
      <ol class='flex gap-4 text-sm'>
        <li class='badge'>1. Select period</li>
        <li class='badge'>2. Validate time</li>
        <li class='badge'>3. Adjustments</li>
        <li class='badge'>4. Tax calc</li>
        <li class='badge'>5. Review</li>
        <li class='badge'>6. Export</li>
      </ol>
    </AppCard>
  </div>
</template>
<script setup lang="ts">
import AppCard from '../components/AppCard.vue'
</script>

