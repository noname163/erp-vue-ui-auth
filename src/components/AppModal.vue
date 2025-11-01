<template>
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true"
        :aria-labelledby="titleId">
        <div class="absolute inset-0 bg-black/40" @click="emit('close')"></div>
        <div
            class="relative bg-surface rounded-lg shadow-elev3 border border-[var(--border-subtle)] w-full max-w-lg p-4">
            <header class="flex items-center justify-between mb-3">
                <h3 class="text-base font-semibold" :id="titleId">{{ title }}</h3>
                <button class="btn btn-ghost h-8 px-2" aria-label="Close" @click="emit('close')">×</button>
            </header>
            <div class="space-y-3">
                <slot></slot>
            </div>
            <footer class="mt-4 flex justify-end gap-2">
                <AppButton variant="secondary" size="md" @click="emit('close')">{{ t('controls.cancel') }}</AppButton>
                <AppButton variant="primary" size="md" :disabled="props.confirmDisabled" @click="emit('confirm')">{{
                        confirmText }}</AppButton>
            </footer>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AppButton from './AppButton.vue'
const { t } = useI18n()
const props = withDefaults(
    defineProps<{ open: boolean; title?: string; confirmText?: string; confirmDisabled?: boolean }>(),
    { confirmText: 'Save', confirmDisabled: false }
)
const emit = defineEmits<{
    (e: 'close'): void
    (e: 'confirm'): void
}>()

const uid = Math.random().toString(36).slice(2)
const titleId = `app-modal-title-${uid}`

function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && props.open) emit('close')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>
