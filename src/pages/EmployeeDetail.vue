<template>
  <div class='space-y-4'>
    <div class='card flex items-center justify-between'>
      <div class='flex items-center gap-3'>
        <div class='h-12 w-12 rounded-full bg-[var(--bg-canvas)] grid place-items-center text-lg'>D</div>
        <div>
          <div class='font-semibold text-lg'>Dat Huu Dang</div>
          <div class='text-[var(--text-muted)]'>Code: E-03421 • Engineering</div>
        </div>
      </div>
      <div class='flex gap-2'>
        <button class='btn btn-secondary h-9 px-3'>Edit</button>
        <button class='btn btn-primary h-9 px-3'>Disable</button>
      </div>
    </div>
    <div class='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <AppCard title="Contact">
        <div class='text-sm'>Email: dat.huudang@example.com</div>
        <div class='text-sm'>Phone: +84 90 123 4567</div>
      </AppCard>
      <AppCard title="Employment">
        <div class='text-sm'>Role: Backend Developer</div>
        <div class='text-sm'>Manager: Anh Tran</div>
      </AppCard>
    </div>
  </div>
</template>
<script setup>
import AppCard from '../components/AppCard.vue'
</script>

