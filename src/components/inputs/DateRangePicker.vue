<template>
  <div class="w-full">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="grid grid-cols-1 gap-2">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <FormInput :id="idStart" :label="startLabelComputed" :placeholder="format" :value="startText" @input="onStartInput" />
        </div>
        <div>
          <FormInput :id="idEnd" :label="endLabelComputed" :placeholder="format" :value="endText" @input="onEndInput" />
        </div>
      </div>
      <div class="relative">
        <div class="absolute z-50 mt-1 w-full rounded-lg border border-[var(--border-subtle)] bg-surface shadow-elev2 p-3">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <DatePicker v-model="startInternal" :min="min" :max="max" :format="format" :clearable="true" />
            <DatePicker v-model="endInternal" :min="effectiveMinForEnd" :max="max" :format="format" :clearable="true" />
          </div>
          <div v-if="rangeError" class="mt-2 text-sm text-red-600">{{ rangeError }}</div>
          <div v-if="quickRanges" class="mt-2 flex flex-wrap gap-2">
            <button class="btn btn-secondary h-8 px-2" type="button" @click="applyQuick('today')">Today</button>
            <button class="btn btn-secondary h-8 px-2" type="button" @click="applyQuick('yesterday')">Yesterday</button>
            <button class="btn btn-secondary h-8 px-2" type="button" @click="applyQuick('last7')">Last 7 days</button>
            <button class="btn btn-secondary h-8 px-2" type="button" @click="applyQuick('month')">This month</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { toDate, toISODate, formatDate } from '../../utils/date'
import DatePicker from './DatePicker.vue'
import FormInput from '../FormInput.vue'

const emit = defineEmits<{ (e: 'update:modelValue', v: { start: string | Date | null; end: string | Date | null }): void }>()
const props = withDefaults(defineProps<{
  modelValue: { start: string | Date | null; end: string | Date | null }
  label?: string
  startLabel?: string
  endLabel?: string
  min?: string | Date
  max?: string | Date
  required?: boolean
  compare?: 'endOnOrAfterStart' | 'endOnOrBeforeStart'
  errorStart?: string
  errorEnd?: string
  format?: string
  quickRanges?: boolean
  idStart?: string
  idEnd?: string
}>(), { compare: 'endOnOrAfterStart', format: 'yyyy-MM-dd' })

const startInternal = ref<string | Date | null>(props.modelValue?.start ?? null)
const endInternal = ref<string | Date | null>(props.modelValue?.end ?? null)
watch(() => props.modelValue, (v) => { startInternal.value = v?.start ?? null; endInternal.value = v?.end ?? null }, { deep: true })
watch([startInternal, endInternal], () => emit('update:modelValue', { start: startInternal.value, end: endInternal.value }))

const startDate = computed(() => toDate(startInternal.value))
const endDate = computed(() => toDate(endInternal.value))
const startText = computed(() => startDate.value ? formatDate(startDate.value, props.format) : '')
const endText = computed(() => endDate.value ? formatDate(endDate.value, props.format) : '')
const startLabelComputed = computed(() => props.startLabel || 'Start date')
const endLabelComputed = computed(() => props.endLabel || 'End date')
const effectiveMinForEnd = computed<string | Date | undefined>(() => props.compare === 'endOnOrAfterStart' ? ((startInternal.value as string | Date | null) ?? props.min ?? undefined) : props.min)
const idStart = computed(() => props.idStart)
const idEnd = computed(() => props.idEnd)

const rangeError = computed(() => {
  const s = startDate.value; const e = endDate.value
  if (!s || !e) return ''
  if (props.compare === 'endOnOrBeforeStart') return e.getTime() <= s.getTime() ? '' : 'End must be on/before start'
  return e.getTime() >= s.getTime() ? '' : 'End must be on/after start'
})

function onStartInput(e: Event) {
  const v = (e.target as HTMLInputElement).value
  startInternal.value = v ? v : null
}
function onEndInput(e: Event) {
  const v = (e.target as HTMLInputElement).value
  endInternal.value = v ? v : null
}
function applyQuick(which: 'today'|'yesterday'|'last7'|'month') {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2,'0')
  const iso = (dt: Date) => `${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}`
  if (which === 'today') { const s = iso(d); startInternal.value = s; endInternal.value = s; return }
  if (which === 'yesterday') { const y = new Date(d); y.setDate(d.getDate()-1); const s = iso(y); startInternal.value = s; endInternal.value = s; return }
  if (which === 'last7') { const sdt = new Date(d); sdt.setDate(d.getDate()-6); startInternal.value = iso(sdt); endInternal.value = iso(d); return }
  if (which === 'month') { const sdt = new Date(d.getFullYear(), d.getMonth(), 1); const edt = new Date(d.getFullYear(), d.getMonth()+1, 0); startInternal.value = iso(sdt); endInternal.value = iso(edt); return }
}
</script>
