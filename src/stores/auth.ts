import { defineStore } from 'pinia'
import { ref, computed, type Ref } from 'vue'
import router from '../router'

type User = { email: string; name: string; roles: string[] }

export const useAuth = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))

  const isAuthenticated = computed<boolean>(() => !!token.value)
  const roles = computed<string[]>(() => (user.value?.roles || []))

  function hasRole(required?: string[]): boolean {
    if (!required || required.length === 0) return true
    return required.some(r => roles.value.includes(r))
  }

  async function login({ email, password }: { email: string; password: string }): Promise<void> {
    if (!email || !password) throw new Error('Email and password are required')
    let assigned: string[] = ['viewer']
    if (email.includes('admin')) assigned = ['admin']
    else if (email.includes('manager')) assigned = ['manager', 'viewer']

    token.value = 'demo-token-' + Date.now()
    user.value = { email, name: email.split('@')[0], roles: assigned }

    localStorage.setItem('token', token.value)
    localStorage.setItem('user', JSON.stringify(user.value))

    router.replace('/dashboard')
  }

  function logout(): void {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.replace('/login')
  }

  return { token, user, isAuthenticated, roles, hasRole, login, logout }
})
