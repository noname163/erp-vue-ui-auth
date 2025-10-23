<template>
  <div class="w-full">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="input w-full min-h-10 flex items-center flex-wrap gap-1">
      <template v-if="modelValue.length">
        <span v-for="(val, i) in visibleTags" :key="val" class="badge">
          {{ valueToLabel(val) }}
          <button v-if="tagRemovable" class="ml-1" type="button" @click="remove(val)" aria-label="Remove">×</button>
        </span>
        <span v-if="hiddenCount > 0" class="badge">+{{ hiddenCount }}</span>
      </template>
      <input v-if="searchable" v-model="q" class="outline-none flex-1 min-w-[120px] bg-transparent" placeholder="{{ placeholder || 'Select...' }}" />
      <button type="button" class="ml-auto text-[var(--text-secondary)]" @click="toggle">▾</button>
    </div>
    <div v-if="open" class="relative">
      <div class="absolute z-50 mt-1 w-full rounded-lg border border-[var(--border-subtle)] bg-surface shadow-elev2 p-1" role="listbox" aria-multiselectable="true">
        <ul class="max-h-60 overflow-auto">
          <li v-for="opt in filtered" :key="opt.value">
            <label class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[var(--bg-canvas)]">
              <input type="checkbox" :checked="modelValue.includes(opt.value)" :disabled="opt.disabled" @change="toggleVal(opt)" />
              <span>{{ opt.label }}</span>
            </label>
          </li>
          <li v-if="filtered.length === 0" class="px-3 py-2 text-[var(--text-muted)] text-sm">No results</li>
        </ul>
      </div>
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SelectOption, OptionValue } from '../../types/form-controls'

const emit = defineEmits<{
  (e: 'update:modelValue', v: OptionValue[]): void
  (e: 'change', v: OptionValue[]): void
  (e: 'clear'): void
}>()

const props = withDefaults(defineProps<{
  modelValue: OptionValue[]
  options: SelectOption[]
  label?: string
  placeholder?: string
  searchable?: boolean
  disabled?: boolean
  required?: boolean
  error?: string
  maxTagsVisible?: number
  tagRemovable?: boolean
}>(), { searchable: false, maxTagsVisible: 3, tagRemovable: true })

const open = ref(false)
const q = ref('')
const filtered = computed(() => props.searchable && q.value
  ? props.options.filter(o => o.label.toLowerCase().includes(q.value.toLowerCase()))
  : props.options)
const visibleTags = computed(() => props.modelValue.slice(0, props.maxTagsVisible))
const hiddenCount = computed(() => Math.max(0, props.modelValue.length - props.maxTagsVisible))
const valueToLabel = (v: OptionValue) => props.options.find(o => o.value === v)?.label || String(v)

function toggle() { if (props.disabled) return; open.value = !open.value }
function toggleVal(opt: SelectOption) {
  if (opt.disabled) return
  const exists = props.modelValue.includes(opt.value)
  const next = exists ? props.modelValue.filter(v => v !== opt.value) : [...props.modelValue, opt.value]
  emit('update:modelValue', next)
  emit('change', next)
}
function remove(v: OptionValue) { toggleVal({ label: '', value: v }) }
</script>

