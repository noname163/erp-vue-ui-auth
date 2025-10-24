<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <FormInput v-model="name" :label="t('companies.accounts.fields.name')" placeholder="Nguyen Van A" />
    <FormInput v-model="email" type="email" :label="t('companies.accounts.fields.email')" placeholder="user@company.com" />
    <div>
      <label class="label" for="account-role">{{ t('companies.accounts.fields.role') }}</label>
      <select id="account-role" v-model="role" class="input">
        <option v-for="option in roleOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
    </div>
    <div>
      <label class="label" for="account-status">{{ t('companies.accounts.fields.status') }}</label>
      <select id="account-status" v-model="status" class="input">
        <option v-for="option in statusOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import FormInput from './FormInput.vue'

type AccountStatus = 'Active' | 'Inactive'
type AccountRole = 'Owner' | 'Admin' | 'Member'

interface AccountFormModel {
  name: string
  email: string
  role: AccountRole
  status: AccountStatus
}

const { t } = useI18n()

const props = defineProps<{
  modelValue: AccountFormModel
  roleOptions: Array<{ value: AccountRole; label: string }>
  statusOptions: Array<{ value: AccountStatus; label: string }>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: AccountFormModel): void
}>()

const name = computed({
  get: () => props.modelValue.name,
  set: (v: string) => emit('update:modelValue', { ...props.modelValue, name: v })
})
const email = computed({
  get: () => props.modelValue.email,
  set: (v: string) => emit('update:modelValue', { ...props.modelValue, email: v })
})
const role = computed({
  get: () => props.modelValue.role,
  set: (v: AccountRole) => emit('update:modelValue', { ...props.modelValue, role: v })
})
const status = computed({
  get: () => props.modelValue.status,
  set: (v: AccountStatus) => emit('update:modelValue', { ...props.modelValue, status: v })
})
</script>

