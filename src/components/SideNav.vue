<template>
    <aside
        :class="['h-screen sticky top-0 bg-surface border-r border-[var(--border-subtle)] transition-all', collapsed ? 'w-16' : 'w-60']">
        <div class="h-14 flex items-center justify-between px-3">
            <span class="font-semibold" v-if="!collapsed">{{ t('app.title') }}</span>
            <button class="btn btn-ghost h-9 w-9" @click="$emit('toggle')">≡</button>
        </div>
        <nav class="px-2">
            <RouterLink v-for="item in visibleItems" :key="item.to" :to="item.to"
                class="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[var(--bg-canvas)]"
                active-class="bg-[var(--bg-canvas)]">
                <AppIcon :name="item.icon" />
                <span v-if="!collapsed">{{ typeof item.label === 'function' ? item.label() : item.label }}</span>
            </RouterLink>
        </nav>
    </aside>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useAuth } from '../stores/authStore'
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'
withDefaults(defineProps<{ collapsed?: boolean }>(), { collapsed: false })
const { t } = useI18n()
const auth = useAuth()
const items = [
    { to: '/dashboard', icon: 'dashboard', label: () => t('nav.dashboard') },
    { to: '/companies', icon: 'building', label: () => t('nav.companies'), roles: ['admin'] },
    { to: '/employees', icon: 'users', label: () => t('nav.employees'), roles: ['admin', 'manager'] },
    { to: '/schedules', icon: 'calendar', label: () => t('workSchedules.title'), roles: ['admin', 'manager'] },
    { to: '/pto', icon: 'form', label: () => t('nav.pto'), roles: ['admin', 'manager', 'viewer'] },
    { to: '/salary-tax', icon: 'payroll', label: () => t('nav.salaryTax'), roles: ['admin'] },
    { to: '/reports', icon: 'reports', label: () => t('nav.reports'), roles: ['admin', 'manager'] },
    { to: '/audit', icon: 'shield', label: () => t('nav.auditLog'), roles: ['admin'] },
    { to: '/settings', icon: 'settings', label: () => t('nav.settings'), roles: ['admin'] },
]
const visibleItems = computed(() => items.filter(i => !i.roles || auth.hasRole(i.roles)))
</script>
