<template>
    <div class="flex items-center gap-2">
        <input type="date" class="rounded-md border px-3 py-2" :value="modelValue.start || todayISO()"
            :max="modelValue.end || undefined" :required="required" aria-label="Start date"
            @input="setStart(($event.target as HTMLInputElement).value)" />
        <span>—</span>
        <input type="date" class="rounded-md border px-3 py-2" :value="modelValue.end || modelValue.start || todayISO()"
            :min="modelValue.start || undefined" :required="required" aria-label="End date"
            @input="setEnd(($event.target as HTMLInputElement).value)" />
    </div>
</template>

<script setup lang="ts">
import { clampDateRange, todayISO } from '@/utils/date';

const props = withDefaults(defineProps<{
    modelValue: { start: string; end: string };
    required?: boolean;
}>(), {});

const emit = defineEmits(['update:modelValue', 'change']);

function setStart(v: string) {
    const next = clampDateRange({ start: v, end: props.modelValue.end });
    emit('update:modelValue', next);
    emit('change', next);
}
function setEnd(v: string) {
    const next = clampDateRange({ start: props.modelValue.start, end: v });
    emit('update:modelValue', next);
    emit('change', next);
}
</script>
