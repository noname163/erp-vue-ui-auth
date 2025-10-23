<template>
  <div class="w-full">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="relative">
      <button type="button" class="input w-full text-left flex items-center justify-between"
        :aria-expanded="open"
        @click="toggle"
        @keydown.down.prevent="open=true; focusNext()"
        @keydown.up.prevent="open=true; focusPrev()"
        @keydown.esc.prevent="open=false"
      >
        <span class="truncate">{{ selectedLabel || placeholder || 'Select...' }}</span>
        <span class="ml-2">▾</span>
      </button>
      <div v-if="open" class="absolute z-50 mt-1 w-full rounded-lg border border-[var(--border-subtle)] bg-surface shadow-elev2 p-1" role="listbox">
        <input v-if="searchable" v-model="q" class="input w-full mb-1" placeholder="Search..." />
        <ul class="max-h-60 overflow-auto">
          <li v-for="(opt, idx) in filtered" :key="opt.value">
            <button type="button" class="w-full text-left px-3 py-2 rounded-md hover:bg-[var(--bg-canvas)]"
              :class="{ 'bg-[var(--bg-canvas)]': idx === focusedIndex }"
              role="option"
              :aria-selected="opt.value === modelValue"
              :disabled="opt.disabled"
              @mouseenter="focusedIndex = idx"
              @click="select(opt)"
            >{{ opt.label }}</button>
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
  (e: 'update:modelValue', v: OptionValue | null): void
  (e: 'open'): void
  (e: 'close'): void
  (e: 'change', v: OptionValue | null): void
}>()

const props = withDefaults(defineProps<{
  modelValue: OptionValue | null
  options: SelectOption[]
  label?: string
  placeholder?: string
  searchable?: boolean
  disabled?: boolean
  required?: boolean
  error?: string
}>(), { searchable: false })

const open = ref(false)
const q = ref('')
const focusedIndex = ref(-1)
const selectedLabel = computed(() => props.options.find(o => o.value === props.modelValue)?.label || '')
const filtered = computed(() => props.searchable && q.value
  ? props.options.filter(o => o.label.toLowerCase().includes(q.value.toLowerCase()))
  : props.options)

function toggle() { if (props.disabled) return; open.value = !open.value; if (open.value) emit('open'); else emit('close') }
function select(opt: SelectOption) { if (opt.disabled) return; emit('update:modelValue', opt.value); emit('change', opt.value); open.value = false }
function focusNext() { if (!open.value) return; focusedIndex.value = Math.min(filtered.value.length - 1, focusedIndex.value + 1) }
function focusPrev() { if (!open.value) return; focusedIndex.value = Math.max(0, focusedIndex.value - 1) }
</script>
