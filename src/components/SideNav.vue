<template>
  <aside :class="['h-screen sticky top-0 bg-surface border-r border-[var(--border-subtle)] transition-all', collapsed ? 'w-16' : 'w-60']">
    <div class="h-14 flex items-center justify-between px-3">
      <span class="font-semibold" v-if="!collapsed">Menu</span>
      <button class="btn btn-ghost h-9 w-9" @click="$emit('toggle')">≡</button>
    </div>
    <nav class="px-2">
      <RouterLink v-for="item in visibleItems" :key="item.to" :to="item.to"
        class="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[var(--bg-canvas)]"
        active-class="bg-[var(--bg-canvas)]">
        <span>{{ item.icon }}</span>
        <span v-if="!collapsed">{{ item.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useAuth } from '../stores/auth'
withDefaults(defineProps<{ collapsed?: boolean }>(), { collapsed: false })
const auth = useAuth()
const items = [
  { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { to: '/employees', label: 'Employees', icon: '👥', roles: ['admin','manager'] },
  { to: '/schedules', label: 'Work Schedules', icon: '📅', roles: ['admin','manager'] },
  { to: '/pto', label: 'PTO & Forms', icon: '📝', roles: ['admin','manager','viewer'] },
  { to: '/salary-tax', label: 'Salary & Tax', icon: '💸', roles: ['admin'] },
  { to: '/reports', label: 'Reports', icon: '📈', roles: ['admin','manager'] },
  { to: '/audit', label: 'Audit Log', icon: '🔎', roles: ['admin'] },
  { to: '/settings', label: 'Settings', icon: '⚙️', roles: ['admin'] },
]
const visibleItems = computed(() => items.filter(i => !i.roles || auth.hasRole(i.roles)))
</script>
