import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '../router'

export const useAuth = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

  const isAuthenticated = computed(() => !!token.value)
  const roles = computed(() => (user.value?.roles || []))

  function hasRole(required) {
    if (!required || required.length === 0) return true
    return required.some(r => roles.value.includes(r))
  }

  async function login({ email, password }) {
    if (!email || !password) throw new Error('Email and password are required')
    let assigned = ['viewer']
    if (email.includes('admin')) assigned = ['admin']
    else if (email.includes('manager')) assigned = ['manager','viewer']

    token.value = 'demo-token-' + Date.now()
    user.value = { email, name: email.split('@')[0], roles: assigned }

    localStorage.setItem('token', token.value)
    localStorage.setItem('user', JSON.stringify(user.value))

    router.replace('/dashboard')
  }

  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.replace('/login')
  }

  return { token, user, isAuthenticated, roles, hasRole, login, logout }
})
