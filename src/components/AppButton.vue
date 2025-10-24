<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :type="nativeType"
    :disabled="isButton && disabled"
    :class="classes"
    v-bind="$attrs"
    @click="onClick"
  >
    <slot />
  </component>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  variant?: Variant
  size?: Size
  block?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  to?: any
  href?: string
}>(), {
  variant: 'primary',
  size: 'md',
  block: false,
  disabled: false,
  type: 'button'
})

const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

const isLink = computed(() => !!props.href)
const isRouterLink = computed(() => !!props.to && !props.href)
const isButton = computed(() => !isLink.value && !isRouterLink.value)

const tag = computed(() => (isRouterLink.value ? RouterLink : (isLink.value ? 'a' : 'button')))

const nativeType = computed(() => (isButton.value ? props.type : undefined))

const classes = computed(() => {
  const base = ['btn']
  // variant
  if (props.variant === 'primary') base.push('btn-primary')
  else if (props.variant === 'secondary') base.push('btn-secondary')
  else base.push('btn-ghost')
  // size
  if (props.size === 'sm') base.push('h-8', 'px-2')
  else if (props.size === 'lg') base.push('h-10', 'px-4')
  else base.push('h-9', 'px-3')
  // block
  if (props.block) base.push('w-full', 'justify-start')
  return base
})

function onClick(ev: MouseEvent) {
  if (props.disabled) {
    ev.preventDefault()
    ev.stopPropagation()
    return
  }
  emit('click', ev)
}
</script>

