<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/40" @click="emit('close')"></div>
    <div class="relative bg-surface rounded-lg shadow-elev3 border border-[var(--border-subtle)] w-full max-w-lg p-4">
      <header class="flex items-center justify-between mb-3">
        <h3 class="text-base font-semibold">{{ title }}</h3>
        <button class="btn btn-ghost h-8 px-2" @click="emit('close')">✕</button>
      </header>
      <div class="space-y-3">
        <slot />
      </div>
      <footer class="mt-4 flex justify-end gap-2">
        <button class="btn btn-secondary h-9 px-3" @click="emit('close')">Cancel</button>
        <button class="btn btn-primary h-9 px-3" @click="emit('confirm')">{{ confirmText }}</button>
      </footer>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({ open: Boolean, title: String, confirmText: { type: String, default: 'Save' } })
const emit = defineEmits(['close','confirm'])
</script>
