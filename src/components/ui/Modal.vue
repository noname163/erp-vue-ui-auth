<script setup lang="ts">
defineProps<{ open: boolean; title?: string; widthClass?: string }>();
const emit = defineEmits(['close']);
function onBackdrop(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target?.id === 'modal-backdrop') emit('close');
}
</script>

<template>
    <div v-if="open" id="modal-backdrop" class="fixed inset-0 z-50 grid place-items-center bg-black/40"
        @click="onBackdrop">
        <div :class="['bg-white rounded-md sm:rounded-xl shadow-xl w-full sm:max-w-2xl max-h-[90vh] overflow-auto mx-2 sm:mx-0', widthClass]">
            <div class="flex items-center justify-between p-4 border-b">
                <h3 class="text-lg font-semibold">{{ title }}</h3>
                <button class="text-sm px-2 py-1 rounded hover:bg-gray-100" @click="$emit('close')">✕</button>
            </div>
            <div class="p-4">
                <slot />
            </div>
        </div>
    </div>
</template>




