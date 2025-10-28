<template>
    <input :type="type ?? 'text'" class="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 ring-offset-2"
        :placeholder="placeholder" :value="modelValue as any" :disabled="disabled" :required="required"
        :aria-label="ariaLabel" @input="onInput" @blur="$emit('blur')" @focus="$emit('focus')" />
</template>

<script setup lang="ts">
defineProps<{
    modelValue?: string | number | null;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    ariaLabel?: string;
}>();
const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'change']);
function onInput(e: Event) {
    const t = e.target as HTMLInputElement;
    emit('update:modelValue', t.value);
    emit('change', t.value);
}
</script>
