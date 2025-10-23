<template>
  <header class="h-14 px-4 border-b border-[var(--border-subtle)] bg-surface flex items-center justify-between">
    <div class="flex items-center gap-3">
      <img src="/logo.svg" class="h-7 w-auto" alt="logo" />
      <h1 class="text-base font-semibold">{{ t('app.title') }}</h1>
    </div>
    <div class="flex items-center gap-2">
      <input class="input w-64" :placeholder="t('app.searchPlaceholder')" />
      <div v-if="auth.isAuthenticated" class="ml-2 flex items-center gap-2 relative group">
        <span class="text-sm text-[var(--text-secondary)]">{{ auth.user?.email }}</span>
        <div class="h-9 w-9 rounded-full bg-[var(--bg-canvas)] grid place-items-center cursor-pointer">{{ avatarInitial }}</div>
        <div class="absolute right-0 top-full mt-2 hidden group-hover:block z-50 min-w-[240px] rounded-lg border border-[var(--border-subtle)] bg-surface shadow-elev2 p-3">
          <div class="mb-2 text-sm font-medium">{{ t('app.language') }}</div>
          <LanguageSwitcherInline />
          <div class="h-px my-2 bg-[var(--border-subtle)]"></div>
          <button class="btn btn-secondary h-9 px-3 w-full text-left" @click="$emit('toggleTheme')">Theme</button>
          <div class="h-px my-2 bg-[var(--border-subtle)]"></div>
          <button class="btn btn-ghost h-9 px-3 w-full text-left" @click="auth.logout()">{{ t('auth.logout') }}</button>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useAuth } from '../stores/auth'
import LanguageSwitcherInline from '@/components/i18n/LanguageSwitcherInline.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const auth = useAuth()
const avatarInitial = computed(() => (auth.user?.name || auth.user?.email || 'U').toString().charAt(0).toUpperCase())
</script>

