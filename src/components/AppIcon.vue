<template>
  <svg :class="['h-5 w-5', cls]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <component :is="paths[name] || paths.default" />
  </svg>
</template>
<script setup lang="ts">
import { h } from 'vue'
const props = withDefaults(defineProps<{ name: 'dashboard'|'users'|'calendar'|'form'|'payroll'|'reports'|'shield'|'settings'|'building'|string; cls?: string }>(), { cls: '' })
const paths: Record<string, any> = {
  dashboard: { render() { return [
    h('path', { d: 'M3 3h8v8H3z' }),
    h('path', { d: 'M13 3h8v5h-8z' }),
    h('path', { d: 'M13 10h8v11h-8z' }),
    h('path', { d: 'M3 13h8v8H3z' })] } },
  building: { render() { return [
    h('path', { d: 'M3 21h18' }),
    h('path', { d: 'M6 21V7' }),
    h('path', { d: 'M10 21V3' }),
    h('path', { d: 'M14 21V7' }),
    h('path', { d: 'M18 21V3' }),
    h('rect', { x: '2', y: '3', width: '20', height: '4' })] } },
  users: { render() { return [
    h('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }),
    h('circle', { cx: '9', cy: '7', r: '4' }),
    h('path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87' }),
    h('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })] } },
  calendar: { render() { return [
    h('rect', { x: '3', y: '4', width: '18', height: '18', rx: '2' }),
    h('line', { x1: '16', y1: '2', x2: '16', y2: '6' }),
    h('line', { x1: '8', y1: '2', x2: '8', y2: '6' }),
    h('line', { x1: '3', y1: '10', x2: '21', y2: '10' })] } },
  form: { render() { return [
    h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16l4-2 4 2 4-2 4 2V8z' }),
    h('path', { d: 'M14 2v6h6' })] } },
  payroll: { render() { return [
    h('path', { d: 'M12 1v22' }),
    h('path', { d: 'M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6' })] } },
  reports: { render() { return [
    h('path', { d: 'M3 3h18v4H3z' }),
    h('path', { d: 'M7 7v14' }),
    h('path', { d: 'M12 7v14' }),
    h('path', { d: 'M17 7v14' })] } },
  shield: { render() { return [
    h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' })] } },
  settings: { render() { return [
    h('circle', { cx: '12', cy: '12', r: '3' }),
    h('path', { d: 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0A1.65 1.65 0 0 0 9 3.09V3a2 2 0 1 1 4 0v.09c0 .65.39 1.24 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06c-.46.46-.6 1.15-.33 1.82h0A1.65 1.65 0 0 0 20.91 11H21a2 2 0 1 1 0 4h-.09c-.65 0-1.24.39-1.51 1z' })] } },
  default: { render() { return [h('circle', { cx: '12', cy: '12', r: '3' })] } }
}
const { name, cls } = props
</script>
