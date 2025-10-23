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
<script setup>
import { computed } from 'vue'
defineOptions({ inheritAttrs: true })
const props = defineProps({
  modelValue: [String, Number],
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  id: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])
const inputId = computed(() => props.id)
function onInput(e) { emit('update:modelValue', e.target.value) }
</script>

