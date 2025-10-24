    <template>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormInput v-model="name" :label="t('companies.fields.name')" placeholder="Acme Corp" />
            <FormInput v-model="code" :label="t('companies.fields.code')" placeholder="C-10001" />
            <FormInput v-model="industry" :label="t('companies.fields.industry')" placeholder="Manufacturing" />
            <FormInput v-model="phone" :label="t('companies.fields.phone')" placeholder="(+84) 901234567" />
            <FormInput v-model="contactEmail" type="email" :label="t('companies.fields.email')"
                placeholder="contact@acme.com" class="md:col-span-2" />
            <div>
                <label class="label" for="company-status">{{ t('companies.fields.status') }}</label>
                <select id="company-status" v-model="status" class="input">
                    <option v-for="option in statusOptions" :key="option.value" :value="option.value">{{ option.label }}
                    </option>
                </select>
            </div>
        </div>
    </template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import FormInput from './FormInput.vue'

type CompanyStatus = 'Active' | 'Inactive'

interface CompanyFormModel {
    name: string
    code: string
    industry: string
    contactEmail: string
    phone: string
    status: CompanyStatus
}

const { t } = useI18n()

const props = defineProps<{
    modelValue: CompanyFormModel
    statusOptions: Array<{ value: CompanyStatus; label: string }>
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', v: CompanyFormModel): void
}>()

const name = computed({
    get: () => props.modelValue.name,
    set: (v: string) => emit('update:modelValue', { ...props.modelValue, name: v })
})
const code = computed({
    get: () => props.modelValue.code,
    set: (v: string) => emit('update:modelValue', { ...props.modelValue, code: v })
})
const industry = computed({
    get: () => props.modelValue.industry,
    set: (v: string) => emit('update:modelValue', { ...props.modelValue, industry: v })
})
const contactEmail = computed({
    get: () => props.modelValue.contactEmail,
    set: (v: string) => emit('update:modelValue', { ...props.modelValue, contactEmail: v })
})
const phone = computed({
    get: () => props.modelValue.phone,
    set: (v: string) => emit('update:modelValue', { ...props.modelValue, phone: v })
})
const status = computed({
    get: () => props.modelValue.status,
    set: (v: CompanyStatus) => emit('update:modelValue', { ...props.modelValue, status: v })
})
</script>

