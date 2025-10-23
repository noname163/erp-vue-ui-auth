<template><slot v-if="allowed" /></template>
<script setup>
import { computed } from 'vue'
import { useAuth } from '../stores/auth'
const props = defineProps({ roles: { type: Array, default: () => [] } })
const auth = useAuth()
const allowed = computed(() => auth.hasRole(props.roles))
</script>
