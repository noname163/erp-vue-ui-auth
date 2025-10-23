<template>
  <div class="bg-surface rounded-lg shadow-elev1 border border-[var(--border-subtle)] overflow-hidden">
    <div class="p-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <input class="input w-64" v-model="q" :placeholder="placeholder" />
      </div>
      <div class="flex items-center gap-2">
        <slot name="actions" />
      </div>
    </div>
    <div class="overflow-auto">
      <table class="min-w-full text-sm">
        <thead class="bg-[var(--bg-canvas)] text-[var(--text-secondary)]">
          <tr>
            <th v-for="col in columns" :key="col.key" class="text-left px-3 py-2 border-b border-[var(--border-subtle)] whitespace-nowrap">
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in filtered" :key="row.id" class="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-canvas)]">
            <td v-for="col in columns" :key="col.key" class="px-3 py-2 whitespace-nowrap">
              <slot :name="`cell:${col.key}`" :row="row">{{ row[col.key] }}</slot>
            </td>
          </tr>
          <tr v-if="filtered.length === 0">
            <td :colspan="columns.length" class="px-3 py-8 text-center text-[var(--text-muted)]">No results</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
const props = defineProps({
  columns: { type: Array, default: () => [] },
  rows: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Search...' }
})
const q = ref('')
const filtered = computed(() => {
  if (!q.value) return props.rows
  const needle = q.value.toLowerCase()
  return props.rows.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(needle)))
})
</script>

