<template>
    <div class="relative min-h-[calc(100vh-56px)] grid place-items-center overflow-hidden">
        <!-- Full background image behind the form -->
        <div class="absolute inset-0 login-bg bg-cover bg-center opacity-60"></div>
        <!-- Optional dim overlay for contrast -->
        <div class="absolute inset-0 bg-black/20"></div>

        <form class="relative card w-full max-w-md" @submit.prevent="onSubmit">
            <div class="mb-4 flex items-center gap-2">
                <img src="/logo.svg" class="h-7 w-auto" alt="logo" />
                <h2 class="text-xl font-semibold">Welcome back</h2>
            </div>
            <p class="text-sm text-[var(--text-muted)] mb-4">Sign in to continue to ERP.</p>

            <FormInput v-model="email" label="Email" placeholder="admin@company.com" class="mb-3" />
            <FormInput v-model="password" label="Password" type="password" placeholder="********" class="mb-4"
                autocomplete="current-password" />

            <p v-if="error" class="text-sm text-red-600 mb-3">{{ error }}</p>
            <button class="btn btn-primary w-full h-10">Login</button>
            <p class="text-xs text-[var(--text-muted)] mt-3">
                Demo roles by email: <code>admin@</code> -> admin, <code>manager@</code> -> manager, others -> viewer
            </p>
        </form>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../stores/auth'
import FormInput from '../components/FormInput.vue'
const auth = useAuth()
const email = ref('admin@company.com')
const password = ref('password')
const error = ref('')
async function onSubmit() {
    try {
        error.value = ''
        await auth.login({ email: email.value, password: password.value })
    } catch (e: unknown) {
        error.value = e instanceof Error ? e.message : 'Login failed'
    }
}
</script>
