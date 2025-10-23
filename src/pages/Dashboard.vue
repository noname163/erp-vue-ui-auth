<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
    <AppCard title="Active Employees">
      <div class="text-2xl font-semibold">148</div>
      <div class="text-[var(--text-muted)] text-sm">+3 this week</div>
    </AppCard>
    <AppCard title="Today's Shifts">
      <div class="text-2xl font-semibold">42</div>
      <div class="text-[var(--text-muted)] text-sm">7 ongoing</div>
    </AppCard>
    <AppCard title="Pending PTO">
      <div class="text-2xl font-semibold">5</div>
      <div class="text-[var(--text-muted)] text-sm">needs approval</div>
    </AppCard>
    <AppCard title="Payroll Status">
      <div class="text-2xl font-semibold">On Track</div>
      <div class="text-[var(--text-muted)] text-sm">Period: Oct 2025</div>
    </AppCard>
  </div>

  <div class="grid md:grid-cols-2 gap-4">
    <AppCard title="Quick Actions">
      <div class="flex flex-wrap gap-2">
        <RequireRole :roles="['admin','manager']"><router-link to="/employees" class="btn btn-primary h-9 px-3">Add Employee</router-link></RequireRole>
        <RequireRole :roles="['admin','manager']"><router-link to="/schedules" class="btn btn-secondary h-9 px-3">Create Schedule</router-link></RequireRole>
        <RequireRole :roles="['admin']"><router-link to="/salary-tax" class="btn btn-secondary h-9 px-3">Run Payroll</router-link></RequireRole>
      </div>
    </AppCard>
    <AppCard title="Recent Activity">
      <ul class="text-sm text-[var(--text-muted)] list-disc pl-5">
        <li>09:10 – PTO approved by Anh Tran</li>
        <li>08:32 – Schedule updated for Dept. Ops</li>
        <li>Yesterday – 3 new employees imported</li>
      </ul>
    </AppCard>
  </div>
</template>
<script setup lang="ts">
import AppCard from '../components/AppCard.vue'
import RequireRole from '../components/RequireRole.vue'
</script>
