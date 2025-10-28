<template>
    <div class="flex items-center gap-4">
        <label v-for="opt in props.options" :key="opt.value" class="inline-flex items-center gap-2">
            <input type="radio" :name="props.name || 'radio-group'" class="h-4 w-4" :value="opt.value"
                :checked="props.modelValue === opt.value" :disabled="opt.disabled"
                @change="emit('update:modelValue', opt.value); emit('change', opt.value)" />
            <span class="text-sm">{{ opt.label }}</span>
        </label>
    </div>
</template>

<script setup lang="ts">
export interface RadioOption { label: string; value: string; disabled?: boolean }
const props = defineProps<{ modelValue: string; options: RadioOption[]; name?: string }>();
const emit = defineEmits(['update:modelValue', 'change']);
</script>
