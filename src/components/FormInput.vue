<template>
  <div>
    <label v-if="label" class="label" :for="inputId">{{ label }}</label>
    <input
      :id="inputId"
      :type="type"
      class="input"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      v-bind="$attrs"
    />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
defineOptions({ inheritAttrs: true })
const props = defineProps({
  modelValue: [String, Number],
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  id: { type: String, default: '' },
})
const emit = defineEmits<{ (e: 'update:modelValue', value: string | number): void }>()
const inputId = computed(() => props.id)
function onInput(e: Event) { emit('update:modelValue', (e.target as HTMLInputElement).value) }
</script>
