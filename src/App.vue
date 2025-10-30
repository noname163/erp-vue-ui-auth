<template>
    <div class="min-h-screen flex" :class="{ dark: isDark }">
        <SideNav v-if="auth.isAuthenticated" :collapsed="collapsed" @toggle="collapsed = !collapsed" />
        <div class="flex-1 flex flex-col bg-[var(--bg-canvas)]">
            <TopBar v-if="auth.isAuthenticated" :isDark="isDark" @toggleTheme="isDark = !isDark" />
            <main class="p-4">
                <router-view />
            </main>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from './stores/authStore'
import SideNav from './components/SideNav.vue'
import TopBar from './components/TopBar.vue'
const collapsed = ref(false)
const isDark = ref(false)
const auth = useAuth()
</script>
