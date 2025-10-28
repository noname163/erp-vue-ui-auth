<template>
    <div class="space-y-4">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h2 class="text-lg font-semibold">{{ t('employees.title') }}</h2>
            <div class="flex flex-wrap gap-2 w-full sm:w-auto">
                <RequireRole :roles="['admin', 'manager']">
                    <AppButton variant="secondary" size="md" @click="openImport = true">{{ t('employees.importCsv') }}</AppButton>
                    <AppButton variant="primary" size="md" @click="openCreate = true">{{ t('employees.add') }}</AppButton>
                </RequireRole>
            </div>
        </div>

        <AppTable :columns="cols" :rows="rows" :placeholder="t('employees.searchPlaceholder')">
            <template #cell:name="{ row }">
                <div class="flex items-center gap-2">
                    <div class="h-8 w-8 rounded-full bg-[var(--bg-canvas)] grid place-items-center">{{ row.name[0] }}
                    </div>
                    <div>
                        <div class="font-medium">{{ row.name }}</div>
                        <div class="text-[var(--text-muted)] text-xs">{{ row.email }}</div>
                    </div>
                </div>
            </template>
            <template #cell:actions="{ row }">
                <AppButton variant="ghost" size="sm" :to="`/employees/${row.code}`">View</AppButton>
            </template>
        </AppTable>

        <AppModal :open="openCreate" :title="t('employees.createTitle')" :confirmText="t('controls.create')"
            @close="openCreate = false" @confirm="createEmployee">
            <div>
                <FormInput v-model="form.name" :label="t('employees.fields.fullName')" placeholder="Nguyen Van A" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <FormInput v-model="form.code" :label="t('employees.fields.code')" placeholder="E-10001" />
                </div>
                <div>
                    <FormInput v-model="form.email" :label="t('employees.fields.email')" placeholder="a@example.com" />
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <Dropdown v-model="form.dept" :options="depts" :label="t('employees.fields.department')"
                        placeholder="Engineering" searchable />
                </div>
                <div>
                    <Dropdown v-model="form.manager" :options="managers" :label="t('employees.fields.manager')"
                        searchable />
                </div>

            </div>
        </AppModal>

        <AppModal :open="openImport" :title="t('employees.importCsv') + ' (CSV)'" :confirmText="t('controls.upload')"
            @close="openImport = false" @confirm="openImport = false">
            <p class="text-sm text-[var(--text-muted)]">Drag & drop CSV here (demo placeholder).</p>
        </AppModal>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import AppTable from '../components/AppTable.vue'
import AppModal from '../components/AppModal.vue'
import RequireRole from '../components/RequireRole.vue'
import FormInput from '../components/FormInput.vue'
import { useI18n } from 'vue-i18n'
import Dropdown from '../components/inputs/Dropdown.vue'
import AppButton from '../components/AppButton.vue'
const { t } = useI18n()

const cols = [
    { key: 'name', label: t('employees.title') },
    { key: 'code', label: t('employees.fields.code') },
    { key: 'dept', label: t('employees.fields.department') },
    { key: 'manager', label: t('employees.fields.manager') },
    { key: 'status', label: t('employees.fields.status') },
    { key: 'actions', label: '' }
]

const rows = ref([
    { id: 1, name: 'Dat Huu Dang', email: 'dat.huudang@example.com', code: 'E-03421', dept: 'Engineering', manager: 'Anh Tran', status: 'Active' },
    { id: 2, name: 'Linh Nguyen', email: 'linh.ng@example.com', code: 'E-03422', dept: 'HR', manager: 'Hoa Pham', status: 'Active' },
    { id: 3, name: 'Tuan Le', email: 'tuan.le@example.com', code: 'E-03423', dept: 'Ops', manager: 'Nam Vu', status: 'Inactive' },
])

const managers = [
    { label: 'Admin', value: 'admin' },
    { label: 'Manager', value: 'manager' },
    { label: 'Viewer', value: 'viewer' },
]
const depts = [
    { label: 'Admin', value: 'admin' },
    { label: 'Manager', value: 'manager' },
    { label: 'Viewer', value: 'viewer' },
]

const openCreate = ref(false)
const openImport = ref(false)
const form = reactive({ name: '', code: '', email: '', dept: '', manager: '', status: 'Active' })

function createEmployee() {
    if (!form.name || !form.code) return
    rows.value.unshift({ id: Date.now(), ...form })
    openCreate.value = false
}
</script>
