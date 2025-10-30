<template>
    <slot v-if="allowed" />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useAuth } from '../stores/authStore'
const props = withDefaults(defineProps<{ roles?: string[] }>(), { roles: () => [] })
const auth = useAuth()
const allowed = computed(() => auth.hasRole(props.roles))
</script>
