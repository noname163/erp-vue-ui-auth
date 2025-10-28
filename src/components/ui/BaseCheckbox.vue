<template>
    <label class="inline-flex items-center gap-2 cursor-pointer select-none">
        <input type="checkbox" class="h-4 w-4 rounded border" :checked="props.modelValue"
            :aria-label="props.ariaLabel || props.label"
            @change="(e: any) => { emit('update:modelValue', e.target.checked); emit('change', e.target.checked); }" />
        <span class="text-sm">{{ props.label }}</span>
    </label>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: boolean; label?: string; ariaLabel?: string }>();
const emit = defineEmits(['update:modelValue', 'change']);
</script>
