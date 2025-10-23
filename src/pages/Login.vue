<template>
  <div class="relative overflow-hidden min-h-[calc(100vh-56px)] grid place-items-center">
    <!-- Decorative background -->
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-brand-tint blur-3xl opacity-70"></div>
      <div class="absolute top-20 -right-20 h-72 w-72 rounded-full bg-brand/30 blur-2xl"></div>
      <div class="absolute -bottom-24 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-brand-tint blur-3xl opacity-60"></div>
    </div>

    <form class="card w-full max-w-md" @submit.prevent="onSubmit">
      <div class="mb-4 flex items-center gap-2">
        <img src="/logo.svg" class="h-7 w-auto" alt="logo" />
        <h2 class="text-xl font-semibold">Welcome back</h2>
      </div>
      <p class="text-sm text-[var(--text-muted)] mb-4">Sign in to continue to ERP.</p>

      <label class="label">Email</label>
      <input v-model="email" class="input mb-3" placeholder="admin@company.com" />

      <label class="label">Password</label>
      <input v-model="password" class="input mb-4" type="password" placeholder="********" />

      <p v-if="error" class="text-sm text-red-600 mb-3">{{ error }}</p>
      <button class="btn btn-primary w-full h-10">Login</button>
      <p class="text-xs text-[var(--text-muted)] mt-3">
        Demo roles by email: <code>admin@</code> -> admin, <code>manager@</code> -> manager, others -> viewer
      </p>
    </form>
  </div>
  
</template>
<script setup>
import { ref } from 'vue'
import { useAuth } from '../stores/auth'
const auth = useAuth()
const email = ref('admin@company.com')
const password = ref('password')
const error = ref('')
async function onSubmit() {
  try {
    error.value = ''
    await auth.login({ email: email.value, password: password.value })
  } catch (e) {
    error.value = e.message || 'Login failed'
  }
}
</script>

