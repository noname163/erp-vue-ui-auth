<template>
  <div class="space-y-6">
    <h2 class="text-lg font-semibold">Components Demo</h2>

    <section class="card">
      <h3 class="font-semibold mb-2">DatePicker</h3>
      <DatePicker v-model="d1" label="Date" />
      <div class="mt-2 text-sm text-[var(--text-secondary)]">Value: {{ d1 }}</div>
    </section>

    <section class="card">
      <h3 class="font-semibold mb-2">DateRangePicker</h3>
      <DateRangePicker v-model="range" :quickRanges="true" label="Range" />
      <div class="mt-2 text-sm text-[var(--text-secondary)]">Value: {{ range }}</div>
    </section>

    <section class="card">
      <h3 class="font-semibold mb-2">Dropdown</h3>
      <Dropdown v-model="opt" :options="opts" label="Role" searchable />
      <div class="mt-2 text-sm text-[var(--text-secondary)]">Value: {{ opt }}</div>
    </section>

    <section class="card">
      <h3 class="font-semibold mb-2">MultiSelect</h3>
      <MultiSelect v-model="many" :options="opts" label="Departments" searchable :maxTagsVisible="2" />
      <div class="mt-2 text-sm text-[var(--text-secondary)]">Value: {{ many }}</div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import DatePicker from '../components/inputs/DatePicker.vue'
import DateRangePicker from '../components/inputs/DateRangePicker.vue'
import Dropdown from '../components/inputs/Dropdown.vue'
import MultiSelect from '../components/inputs/MultiSelect.vue'

const d1 = ref<string | null>(null)
const range = ref<{ start: string | null; end: string | null }>({ start: null, end: null })
const opts = [
  { label: 'Admin', value: 'admin' },
  { label: 'Manager', value: 'manager' },
  { label: 'Viewer', value: 'viewer' },
]
const opt = ref<string | null>(null)
const many = ref<string[]>([])
</script>

