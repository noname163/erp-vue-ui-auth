<template>
  <div class="w-full">
    <label v-if="label" class="label" :for="id">{{ label }}</label>
    <div class="relative">
      <input
        :id="id"
        class="input w-full pr-10"
        :placeholder="placeholder || format"
        :value="displayValue"
        :disabled="disabled"
        :aria-invalid="Boolean(error)"
        @input="onInput"
        @focus="open"
        @keydown="onKeydown"
      />
      <button v-if="clearable && !!modelDate" type="button" class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-[var(--text-secondary)]" @click="clear">×</button>
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>

    <div v-if="isOpen" class="absolute z-50 mt-1 w-72 rounded-lg border border-[var(--border-subtle)] bg-surface shadow-elev2 p-3" role="dialog" aria-modal="true">
      <div class="flex items-center justify-between mb-2">
        <button class="btn btn-ghost h-8 px-2" @click="prevMonth" aria-label="Previous month">‹</button>
        <div class="text-sm font-medium">{{ viewLabel }}</div>
        <button class="btn btn-ghost h-8 px-2" @click="nextMonth" aria-label="Next month">›</button>
      </div>
      <div class="grid grid-cols-7 text-xs text-[var(--text-secondary)] mb-1">
        <div v-for="d in weekdays" :key="d" class="text-center py-1">{{ d }}</div>
      </div>
      <div class="grid grid-cols-7 gap-1" role="grid">
        <button
          v-for="cell in cells"
          :key="cell.date.toISOString()"
          class="h-9 rounded-md text-sm"
          :class="dayClass(cell)"
          :disabled="isDisabled(cell.date)"
          @click="pick(cell.date)"
        >{{ cell.date.getDate() }}</button>
      </div>
    </div>
  </div>
  
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { addMonths, clampDate, formatDate, monthGrid, parseDate, toDate, toISODate } from '../../utils/date'

const emit = defineEmits<{
  (e: 'update:modelValue', v: string | Date | null): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'change', v: string | Date | null): void
}>()

const props = withDefaults(defineProps<{
  modelValue: string | Date | null
  label?: string
  placeholder?: string
  min?: string | Date
  max?: string | Date
  disabled?: boolean
  required?: boolean
  error?: string
  format?: string
  clearable?: boolean
  id?: string
}>(), { format: 'yyyy-MM-dd', clearable: true, id: undefined })

const id = computed(() => props.id)
const isOpen = ref(false)
const modelDate = computed(() => toDate(props.modelValue))
const minDate = computed(() => toDate(props.min))
const maxDate = computed(() => toDate(props.max))
const cursor = ref<Date>(modelDate.value || new Date())
watch(modelDate, (v) => { if (v) cursor.value = v })

const displayValue = computed(() => modelDate.value ? formatDate(modelDate.value, props.format) : '')
const viewLabel = computed(() => `${cursor.value.toLocaleString(undefined, { month: 'long' })} ${cursor.value.getFullYear()}`)
const weekdays = ['Mo','Tu','We','Th','Fr','Sa','Su']
const cells = computed(() => monthGrid(cursor.value))

function open() { if (!props.disabled) { isOpen.value = true; emit('focus') } }
function close() { isOpen.value = false; emit('blur') }
function prevMonth() { cursor.value = addMonths(cursor.value, -1) }
function nextMonth() { cursor.value = addMonths(cursor.value, 1) }
function isDisabled(d: Date) {
  if (minDate.value && d < minDate.value) return true
  if (maxDate.value && d > maxDate.value) return true
  return false
}
function dayClass(cell: { date: Date; inMonth: boolean }) {
  const sel = modelDate.value && cell.date && cell.inMonth && cell.date.toDateString() === modelDate.value.toDateString()
  return [
    cell.inMonth ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]',
    'hover:bg-[var(--bg-canvas)]',
    sel ? 'bg-brand text-white hover:bg-brand' : 'bg-transparent'
  ]
}
function pick(d: Date) {
  const clamped = clampDate(d, minDate.value || undefined, maxDate.value || undefined)
  emit('update:modelValue', toISODate(clamped)!)
  emit('change', toISODate(clamped)!)
  close()
}
function clear() { emit('update:modelValue', null); emit('change', null) }
function onInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  if (!val) { emit('update:modelValue', null); return }
  const d = parseDate(val, props.format)
  if (d && !isDisabled(d)) emit('update:modelValue', toISODate(d))
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') { e.preventDefault(); close() }
}
</script>

