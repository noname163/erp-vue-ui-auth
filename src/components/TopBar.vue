<template>
  <header class="h-14 px-4 border-b border-[var(--border-subtle)] bg-surface flex items-center justify-between">
    <div class="flex items-center gap-3">
      <img src="/logo.svg" class="h-7 w-auto" alt="logo" />
      <h1 class="text-base font-semibold">{{ t('app.title') }}</h1>
    </div>
    <div class="flex items-center gap-2">
      <input class="input w-64" placeholder="Search employees, schedules..." />
      <button class="btn btn-secondary h-9 px-3" @click="$emit('toggleTheme')">
        <span class="i">🌓</span><span class="ml-2 hidden md:inline">Theme</span>
      </button>
      <LanguageSwitcherInline />
      <div v-if="auth.isAuthenticated" class="ml-2 flex items-center gap-2">
        <span class="text-sm text-[var(--text-secondary)]">{{ auth.user?.email }}</span>
        <button class="btn btn-ghost h-9 px-3" @click="auth.logout()">{{ t('auth.logout') }}</button>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useAuth } from '../stores/auth'
import LanguageSwitcherInline from '@/components/i18n/LanguageSwitcherInline.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const auth = useAuth()
</script>
