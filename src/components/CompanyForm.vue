    <template>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormInput id="company-name" v-model="name" :label="t('companies.fields.name')" placeholder="Acme Corp"
                :validate="true" :required="true" :required-message="t('validation.required')" validate-on="blur"
                @validation="onFieldValidation" />
            <FormInput id="company-tax" v-model="tax" :label="t('companies.fields.tax')" placeholder="C-10001"
                :validate="true" :required="true" :required-message="t('validation.required')" validate-on="blur"
                @validation="onFieldValidation" />
            <FormInput id="company-industry" v-model="industry" :label="t('companies.fields.industry')"
                placeholder="Manufacturing" :validate="true" @validation="onFieldValidation" />
            <FormInput id="company-phone" v-model="phone" :label="t('companies.fields.phone')"
                placeholder="(+84) 901234567" :validate="true" :required="true" :pattern="phonePattern"
                pattern-message="Invalid phone number" validate-on="blur" @validation="onFieldValidation" />
            <FormInput id="company-address" v-model="address" type="adrress" :label="t('companies.fields.address')"
                placeholder="HCM, District 2" class="md:col-span-2" />
        </div>
    </template>
<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import FormInput from './FormInput.vue'

type CompanyStatus = 'Active' | 'Inactive'

interface CompanyFormModel {
    name: string
    tax: string
    industry: string
    address: string
    phone: string
    status: CompanyStatus
}

const { t } = useI18n()
// Simple phone validation: optional +, digits with spaces or dashes, min length
const phonePattern = '^[+]?\\d[\\d\\s-]{7,}$'

const props = defineProps<{
    modelValue: CompanyFormModel
    statusOptions: Array<{ value: CompanyStatus; label: string }>
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', v: CompanyFormModel): void
    (e: 'valid', v: boolean): void
}>()

const name = computed({
    get: () => props.modelValue.name,
    set: (v: string) => emit('update:modelValue', { ...props.modelValue, name: v })
})
const tax = computed({
    get: () => props.modelValue.tax,
    set: (v: string) => emit('update:modelValue', { ...props.modelValue, tax: v })
})
const industry = computed({
    get: () => props.modelValue.industry,
    set: (v: string) => emit('update:modelValue', { ...props.modelValue, industry: v })
})
const address = computed({
    get: () => props.modelValue.address,
    set: (v: string) => emit('update:modelValue', { ...props.modelValue, address: v })
})
const phone = computed({
    get: () => props.modelValue.phone,
    set: (v: string) => emit('update:modelValue', { ...props.modelValue, phone: v })
})
// Track per-field validity and emit overall validity to parent
const fieldValidity = reactive<Record<string, boolean>>({
    'company-name': false,
    'company-tax': false,
    'company-phone': true,
    'company-industry': true,
    'company-address': true,
})

function onFieldValidation(payload: { id?: string; valid: boolean }) {
    if (payload.id) fieldValidity[payload.id] = payload.valid
    console.log('Field validity updated:', Object.values(fieldValidity).every(Boolean))
    emit('valid', Object.values(fieldValidity).every(Boolean))
}

onMounted(() => {
    emit('valid', Object.values(fieldValidity).every(Boolean))
})
</script>
