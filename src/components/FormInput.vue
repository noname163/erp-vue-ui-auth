<template>
    <div>
        <label v-if="label" class="label" :for="inputId">{{ label }}</label>
        <input :id="inputId" :type="type" class="input"
            :class="{ 'border-red-500 focus-visible:ring-red-500': showError }" :placeholder="placeholder"
            :value="modelValue" :aria-invalid="showError ? 'true' : undefined" @input="onInput" @blur="onBlur"
            v-bind="$attrs" />
        <p v-if="showError" class="mt-1 text-sm text-red-600">{{ finalErrorMessage }}</p>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PropType } from 'vue'
defineOptions({ inheritAttrs: true })
const props = defineProps({
    modelValue: [String, Number],
    label: { type: String, default: '' },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    id: { type: String, default: '' },
    // Validation controls
    validate: { type: Boolean, default: false },
    errorMessage: { type: String, default: '' },
    required: { type: Boolean, default: false },
    requiredMessage: { type: String, default: 'This field is required' },
    pattern: { type: [String, RegExp] as unknown as PropType<string | RegExp | undefined>, default: undefined },
    patternMessage: { type: String, default: 'Invalid format' },
    validateOn: { type: String as PropType<'input' | 'blur' | 'submit'>, default: 'blur' },
    submitted: { type: Boolean, default: false },
})
const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void
    (e: 'validation', payload: { id?: string; valid: boolean; error: string }): void
}>()
const inputId = computed(() => props.id)
const touched = ref(false)
const showError = ref(false)
function deriveError(val: string): boolean {
    if (!props.validate) return !showError.value
    const v = val.trim()
    if (props.required && v.length > 0) {
        showError.value = false
        finalErrorMessage.value = ''
    }
    if (props.required && v.length === 0) {
        finalErrorMessage.value = props.requiredMessage
        showError.value = true

    }
    if (props.pattern && v.length > 0) {
        const regex = typeof props.pattern === 'string' ? new RegExp(props.pattern) : (props.pattern as RegExp)
        if (!regex.test(v)) {
            showError.value = true
            finalErrorMessage.value = props.patternMessage
        }
        else {
            showError.value = false
            finalErrorMessage.value = ''
        }
    }
    return showError.value
}
const finalErrorMessage = ref('')

function emitValidationFor(val: string) {
    console.log('Emitting validation for value:', inputId.value, val)
    const hasError = deriveError(val)
    const message = hasError ? finalErrorMessage.value : ''
    console.log('Validation result - hasError:', hasError)
    emit('validation', { id: inputId.value || undefined, valid: !hasError, error: message })
}

function onInput(e: Event) {
    const next = (e.target as HTMLInputElement).value
    emit('update:modelValue', next)
}
function onBlur(e: Event) {
    touched.value = true
    const next = (e.target as HTMLInputElement).value
    emitValidationFor(next)
    emit('update:modelValue', next)
}

</script>
