<template>
  <section class='card'>
    <header v-if='title' class='mb-3 text-sm text-[var(--text-secondary)]'>{{ title }}</header>
    <slot />
  </section>
  </template>
<script setup lang="ts">
withDefaults(defineProps<{ title?: string }>(), { title: undefined })
</script>
