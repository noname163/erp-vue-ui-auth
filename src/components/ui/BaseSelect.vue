<template>
    <div class="relative" :class="disabled ? 'opacity-50 pointer-events-none' : ''" ref="rootRef">
        <button type="button"
            class="w-full rounded-md border px-3 py-2 text-sm text-left flex items-center justify-between gap-2"
            :aria-expanded="open" :aria-label="ariaLabel || 'Select'" @click="toggle">
            <span class="truncate" :class="displayText ? '' : 'text-gray-400'">
                {{ displayText || placeholder || t('controls.select') }}
            </span>
            <svg class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z"
                    clip-rule="evenodd" />
            </svg>
        </button>

        <div v-if="open" class="absolute z-10 mt-1 w-full rounded-md border bg-white shadow max-h-[50vh] overflow-auto">
            <div class="p-2 border-b">
                <input v-model="query" type="text" class="w-full rounded-md border px-2 py-1 text-sm"
                    :placeholder="t('controls.searchPlaceholder') || 'Search...'" @keydown.stop />
            </div>
            <div v-if="multiple" class="px-3 py-2 border-b flex items-center gap-2">
                <input id="select-all" type="checkbox" class="h-4 w-4" :checked="allSelected" @change="toggleAll" />
                <label for="select-all" class="text-sm cursor-pointer select-none">{{ t('controls.selectAll') }}</label>
                <span class="ml-auto text-xs text-gray-500">{{ selectedCount }}/{{ filteredOptions.length }}</span>
            </div>
            <ul class="max-h-60 overflow-auto py-1 text-sm">
                <li v-for="opt in filteredOptions" :key="opt.value"
                    class="px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50"
                    :class="opt.disabled ? 'opacity-50 cursor-not-allowed' : ''"
                    @click="opt.disabled ? null : onSelect(opt.value)">
                    <template v-if="multiple">
                        <input type="checkbox" class="h-4 w-4" :checked="isSelected(opt.value)"
                            @change.stop="onSelect(opt.value)" />
                    </template>
                    <template v-else>
                        <span class="inline-block h-4 w-4 rounded-full border flex items-center justify-center">
                            <span v-if="isSelected(opt.value)" class="h-2.5 w-2.5 rounded-full bg-black"></span>
                        </span>
                    </template>
                    <span class="truncate">{{ opt.label }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export interface SelectOption { label: string; value: string; disabled?: boolean }

const props = defineProps<{
    modelValue: string | string[] | null;
    options: SelectOption[];
    multiple?: boolean;
    placeholder?: string;
    disabled?: boolean;
    ariaLabel?: string;
}>();
const emit = defineEmits(['update:modelValue', 'change']);
const { t } = useI18n()

const open = ref(false)
function toggle() { if (!props.disabled) open.value = !open.value }
function close() { open.value = false }

const query = ref('')
const filteredOptions = computed(() => {
    const q = query.value.trim().toLowerCase()
    if (!q) return props.options
    return props.options.filter(o => o.label.toLowerCase().includes(q))
})

function isSelected(v: string) {
    return Array.isArray(props.modelValue)
        ? (props.modelValue as string[]).includes(v)
        : props.modelValue === v
}

function onSelect(v: string) {
    if (props.multiple) {
        const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
        const idx = current.indexOf(v)
        if (idx >= 0) current.splice(idx, 1); else current.push(v)
        emit('update:modelValue', current)
        emit('change', current)
    } else {
        emit('update:modelValue', v)
        emit('change', v)
        close()
    }
}

const selectedCount = computed(() => Array.isArray(props.modelValue) ? props.modelValue.length : (props.modelValue ? 1 : 0))
const allSelected = computed(() => {
    if (!props.multiple) return false
    const enabled = filteredOptions.value.filter(o => !o.disabled).map(o => o.value)
    const current = new Set(Array.isArray(props.modelValue) ? props.modelValue : [])
    return enabled.length > 0 && enabled.every(v => current.has(v))
})

function toggleAll() {
    if (!props.multiple) return
    const enabled = filteredOptions.value.filter(o => !o.disabled).map(o => o.value)
    const current = new Set(Array.isArray(props.modelValue) ? props.modelValue : [])
    const shouldSelectAll = !enabled.every(v => current.has(v))
    const next = new Set(current)
    if (shouldSelectAll) {
        enabled.forEach(v => next.add(v))
    } else {
        enabled.forEach(v => next.delete(v))
    }
    const arr = Array.from(next)
    emit('update:modelValue', arr)
    emit('change', arr)
}

const displayText = computed(() => {
    if (props.multiple) {
        const arr = Array.isArray(props.modelValue) ? props.modelValue : []
        if (!arr.length) return ''
        const labels = props.options.filter(o => arr.includes(o.value)).map(o => o.label)
        return labels.join(', ')
    }
    const single = props.options.find(o => o.value === props.modelValue)
    return single?.label || ''
})

const rootRef = ref<HTMLElement | null>(null)
onMounted(() => {
    function onDocClick(ev: MouseEvent) {
        if (!rootRef.value) return
        if (!(ev.target instanceof Node)) return
        if (!rootRef.value.contains(ev.target)) close()
    }
    document.addEventListener('click', onDocClick)
    onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
})
</script>
