<template>
    <header class="h-14 px-4 border-b border-[var(--border-subtle)] bg-surface flex items-center justify-between">
        <div class="flex items-center gap-3">
            <img src="/logo.svg" class="h-7 w-auto" alt="logo" />
            <h1 class="text-base font-semibold">{{ t('app.title') }}</h1>
        </div>
        <div class="flex items-center gap-2" @keydown.escape.stop="menuOpen = false">
            <input class="input w-64" :placeholder="t('app.searchPlaceholder')" />
            <div v-if="auth.isAuthenticated" class="ml-2 flex items-center gap-2 relative group">
                <span class="text-sm text-[var(--text-secondary)] hidden md:inline">{{ auth.user?.email }}</span>
                <button type="button"
                    class="h-9 w-9 rounded-full bg-[var(--bg-canvas)] grid place-items-center cursor-pointer"
                    aria-haspopup="menu" :aria-expanded="menuOpen" @click.stop="menuOpen = !menuOpen">{{ avatarInitial
                    }}</button>
                <div @click.stop
                    class="absolute right-0 top-full mt-2 z-50 w-64 rounded-lg border border-[var(--border-subtle)] bg-surface shadow-elev3 p-3"
                    :class="[menuOpen ? 'block' : 'hidden', 'group-hover:block']" role="menu">
                    <div
                        class="absolute -top-2 right-5 h-3 w-3 bg-surface border border-[var(--border-subtle)] rotate-45">
                    </div>
                    <div class="flex items-center gap-2 mb-3">
                        <div class="h-8 w-8 rounded-full bg-[var(--bg-canvas)] grid place-items-center">{{ avatarInitial
                        }}</div>
                        <div class="min-w-0">
                            <div class="text-sm font-medium truncate">{{ auth.user?.name || auth.user?.email }}</div>
                            <div class="text-xs text-[var(--text-secondary)] truncate">{{ auth.user?.email }}</div>
                        </div>
                    </div>
                    <LanguageSwitcherInline />
                    <div class="h-px my-3 bg-[var(--border-subtle)]"></div>
                    <button class="btn btn-secondary h-9 px-3 w-full justify-start" @click="$emit('toggleTheme')">{{
                        t('app.theme') }}</button>
                    <div class="h-px my-3 bg-[var(--border-subtle)]"></div>
                    <button class="btn btn-ghost h-9 px-3 w-full justify-start" @click="auth.logout()">{{
                        t('auth.logout') }}</button>
                </div>
            </div>
        </div>
    </header>
</template>
<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { useAuth } from '../stores/authStore'
import LanguageSwitcherInline from '@/components/i18n/LanguageSwitcherInline.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const auth = useAuth()
const avatarInitial = computed(() => (auth.user?.name || auth.user?.email || 'U').toString().charAt(0).toUpperCase())
const menuOpen = ref(false)
function handleWindowClick() { menuOpen.value = false }
onMounted(() => window.addEventListener('click', handleWindowClick))
onBeforeUnmount(() => window.removeEventListener('click', handleWindowClick))
</script>
