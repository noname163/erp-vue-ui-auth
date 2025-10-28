<template>
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
        <BaseInput class="w-full" :model-value="modelValue" :placeholder="placeholder || t('app.searchPlaceholder')"
            aria-label="Employee search" @update:modelValue="handleInput" />
        <AppButton class="w-full sm:w-auto" variant="secondary" @click="$emit('search', modelValue.trim())">
            {{ t('controls.search') }}
        </AppButton>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import AppButton from './AppButton.vue';
import BaseInput from './inputs/BaseInput.vue';


defineProps<{ modelValue: string; placeholder?: string }>();
const emit = defineEmits(['update:modelValue', 'search']);
const { t } = useI18n();
let timer: any;
function handleInput(v: string) {
    emit('update:modelValue', v);
    clearTimeout(timer);
    timer = setTimeout(() => emit('search', v.trim()), 300);
}
</script>
