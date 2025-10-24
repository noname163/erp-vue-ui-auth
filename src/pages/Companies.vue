<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">{{ t('companies.title') }}</h2>
      <RequireRole :roles="['admin']">
        <AppButton variant="primary" size="md" @click="openCreateCompany">{{ t('companies.add') }}</AppButton>
      </RequireRole>
    </div>

    <AppTable :columns="columns" :rows="companies" :placeholder="t('companies.searchPlaceholder')">
      <template #cell:name="{ row }">
        <div>
          <div class="font-medium">{{ row.name }}</div>
          <div class="text-xs text-[var(--text-muted)]">{{ row.code }}</div>
        </div>
      </template>
      <template #cell:contactEmail="{ row }">
        <div>
          <div>{{ row.contactEmail }}</div>
          <div class="text-xs text-[var(--text-muted)]">{{ row.phone }}</div>
        </div>
      </template>
      <template #cell:status="{ row }">
        <span class="inline-flex items-center rounded-full bg-[var(--bg-canvas)] px-2 py-1 text-xs font-medium text-[var(--text-secondary)]">
          {{ statusLabel(row.status) }}
        </span>
      </template>
      <template #cell:accounts="{ row }">
        <span class="font-medium">{{ row.accounts.length }}</span>
      </template>
      <template #cell:actions="{ row }">
        <div class="flex gap-2">
          <AppButton variant="ghost" size="sm" @click="openAccounts(row as Company)">{{ t('companies.manageAccounts') }}</AppButton>
          <AppButton variant="ghost" size="sm" @click="startEditCompany(row as Company)">{{ t('controls.edit') }}</AppButton>
          <AppButton variant="ghost" size="sm" class="text-red-500" @click="askDeleteCompany(row as Company)">{{ t('controls.remove') }}</AppButton>
        </div>
      </template>
    </AppTable>

    <AppModal
      :open="openCompanyModal"
      :title="editingCompanyId ? t('companies.editTitle') : t('companies.createTitle')"
      :confirm-text="editingCompanyId ? t('controls.save') : t('controls.create')"
      @close="closeCompanyModal"
      @confirm="saveCompany"
    >
      <CompanyForm v-model="companyForm" :status-options="statusOptions" />
    </AppModal>

    <AppModal
      :open="openDeleteModal"
      :title="t('companies.deleteTitle')"
      :confirm-text="t('controls.remove')"
      @close="closeDeleteModal"
      @confirm="deleteCompany"
    >
      <p class="text-sm text-[var(--text-muted)]">
        {{ t('companies.deleteMessage', { name: companyToDelete?.name ?? '' }) }}
      </p>
    </AppModal>

    <AppModal
      :open="openAccountsModal"
      :title="selectedCompany ? t('companies.accounts.manageTitle', { name: selectedCompany.name }) : t('companies.accounts.title')"
      :confirm-text="t('controls.close')"
      @close="closeAccountsModal"
      @confirm="closeAccountsModal"
    >
      <div class="space-y-4">
        <div class="space-y-2">
          <div v-if="selectedCompany && selectedCompany.accounts.length" class="space-y-2">
            <div
              v-for="account in selectedCompany.accounts"
              :key="account.id"
              class="flex items-start justify-between rounded-md border border-[var(--border-subtle)] px-3 py-2"
            >
              <div>
                <div class="font-medium">{{ account.name }}</div>
                <div class="text-xs text-[var(--text-muted)]">{{ account.email }}</div>
                <div class="text-xs text-[var(--text-muted)]">{{ roleLabel(account.role) }} · {{ statusLabel(account.status) }}</div>
              </div>
              <div class="flex gap-2">
            <AppButton variant="ghost" size="sm" @click="startEditAccount(account)">{{ t('controls.edit') }}</AppButton>
            <AppButton variant="ghost" size="sm" class="text-red-500" @click="removeAccount(account.id)">{{ t('controls.remove') }}</AppButton>
              </div>
            </div>
          </div>
          <p v-else class="text-sm text-[var(--text-muted)]">{{ t('companies.accounts.noAccounts') }}</p>
        </div>

        <div class="border-t border-[var(--border-subtle)] pt-3">
          <h3 class="text-sm font-semibold mb-3">
            {{ editingAccountId ? t('companies.accounts.editAccountTitle') : t('companies.accounts.addAccountTitle') }}
          </h3>
          <CompanyAccountForm
            v-model="accountForm"
            :role-options="accountRoleOptions"
            :status-options="statusOptions"
          />
          <div class="mt-3 flex justify-end gap-2">
            <AppButton variant="secondary" size="md" @click="resetAccountForm()">{{ t('companies.accounts.resetForm') }}</AppButton>
            <AppButton variant="primary" size="md" @click="saveAccount">
              {{ editingAccountId ? t('companies.accounts.updateAccount') : t('companies.accounts.addAccount') }}
            </AppButton>
          </div>
        </div>
      </div>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppTable from '../components/AppTable.vue'
import AppModal from '../components/AppModal.vue'
import FormInput from '../components/FormInput.vue'
import RequireRole from '../components/RequireRole.vue'
import AppButton from '../components/AppButton.vue'
import CompanyForm from '../components/CompanyForm.vue'
import CompanyAccountForm from '../components/CompanyAccountForm.vue'

type CompanyStatus = 'Active' | 'Inactive'
type AccountStatus = CompanyStatus
type AccountRole = 'Owner' | 'Admin' | 'Member'

interface CompanyAccount {
  id: number
  name: string
  email: string
  role: AccountRole
  status: AccountStatus
}

interface Company {
  id: number
  name: string
  code: string
  industry: string
  contactEmail: string
  phone: string
  status: CompanyStatus
  accounts: CompanyAccount[]
}

const { t } = useI18n()

const companies = ref<Company[]>([
  {
    id: 1,
    name: 'Alpha Manufacturing',
    code: 'C-1001',
    industry: 'Manufacturing',
    contactEmail: 'ops@alphamfg.com',
    phone: '+84 901 234 567',
    status: 'Active',
    accounts: [
      { id: 11, name: 'Mai Nguyen', email: 'mai.nguyen@alphamfg.com', role: 'Owner', status: 'Active' },
      { id: 12, name: 'Thanh Le', email: 'thanh.le@alphamfg.com', role: 'Admin', status: 'Active' }
    ]
  },
  {
    id: 2,
    name: 'Saigon Retail Group',
    code: 'C-1024',
    industry: 'Retail',
    contactEmail: 'hello@saigonretail.vn',
    phone: '+84 907 556 778',
    status: 'Active',
    accounts: [
      { id: 21, name: 'Khoa Tran', email: 'khoa.tran@saigonretail.vn', role: 'Owner', status: 'Active' },
      { id: 22, name: 'Linh Pham', email: 'linh.pham@saigonretail.vn', role: 'Member', status: 'Inactive' }
    ]
  },
  {
    id: 3,
    name: 'Delta Logistics',
    code: 'C-1042',
    industry: 'Logistics',
    contactEmail: 'contact@deltalog.vn',
    phone: '+84 28 3890 1234',
    status: 'Inactive',
    accounts: [
      { id: 31, name: 'Huy Bui', email: 'huy.bui@deltalog.vn', role: 'Admin', status: 'Active' }
    ]
  }
])

const columns = computed(() => [
  { key: 'name', label: t('companies.columns.company') },
  { key: 'industry', label: t('companies.columns.industry') },
  { key: 'contactEmail', label: t('companies.columns.contact') },
  { key: 'status', label: t('companies.columns.status') },
  { key: 'accounts', label: t('companies.columns.accounts') },
  { key: 'actions', label: '' }
])

const statusOptions = computed(() => [
  { value: 'Active' as CompanyStatus, label: t('companies.status.active') },
  { value: 'Inactive' as CompanyStatus, label: t('companies.status.inactive') }
])

const accountRoleOptions = computed(() => [
  { value: 'Owner' as AccountRole, label: t('companies.accounts.roles.owner') },
  { value: 'Admin' as AccountRole, label: t('companies.accounts.roles.admin') },
  { value: 'Member' as AccountRole, label: t('companies.accounts.roles.member') }
])

const openCompanyModal = ref(false)
const openDeleteModal = ref(false)
const openAccountsModal = ref(false)

const editingCompanyId = ref<number | null>(null)
const companyToDelete = ref<Company | null>(null)
const selectedCompanyId = ref<number | null>(null)
const editingAccountId = ref<number | null>(null)

const companyForm = reactive({
  name: '',
  code: '',
  industry: '',
  contactEmail: '',
  phone: '',
  status: 'Active' as CompanyStatus
})

const accountForm = reactive({
  name: '',
  email: '',
  role: 'Admin' as AccountRole,
  status: 'Active' as AccountStatus
})

const selectedCompany = computed(() => companies.value.find(company => company.id === selectedCompanyId.value) ?? null)

function openCreateCompany() {
  editingCompanyId.value = null
  resetCompanyForm()
  openCompanyModal.value = true
}

function startEditCompany(company: Company) {
  editingCompanyId.value = company.id
  resetCompanyForm(company)
  openCompanyModal.value = true
}

function closeCompanyModal() {
  openCompanyModal.value = false
  resetCompanyForm()
}

function resetCompanyForm(company?: Company) {
  companyForm.name = company?.name ?? ''
  companyForm.code = company?.code ?? ''
  companyForm.industry = company?.industry ?? ''
  companyForm.contactEmail = company?.contactEmail ?? ''
  companyForm.phone = company?.phone ?? ''
  companyForm.status = company?.status ?? 'Active'
}

function saveCompany() {
  if (!companyForm.name || !companyForm.code) return
  const payload = {
    name: companyForm.name.trim(),
    code: companyForm.code.trim(),
    industry: companyForm.industry.trim(),
    contactEmail: companyForm.contactEmail.trim(),
    phone: companyForm.phone.trim(),
    status: companyForm.status
  }
  if (editingCompanyId.value) {
    const existing = companies.value.find(company => company.id === editingCompanyId.value)
    if (existing) {
      existing.name = payload.name
      existing.code = payload.code
      existing.industry = payload.industry
      existing.contactEmail = payload.contactEmail
      existing.phone = payload.phone
      existing.status = payload.status
    }
  } else {
    companies.value.unshift({ id: Date.now(), accounts: [], ...payload })
  }
  openCompanyModal.value = false
}

function askDeleteCompany(company: Company) {
  companyToDelete.value = company
  openDeleteModal.value = true
}

function closeDeleteModal() {
  openDeleteModal.value = false
  companyToDelete.value = null
}

function deleteCompany() {
  if (!companyToDelete.value) return
  companies.value = companies.value.filter(company => company.id !== companyToDelete.value?.id)
  companyToDelete.value = null
  openDeleteModal.value = false
}

function openAccounts(company: Company) {
  selectedCompanyId.value = company.id
  editingAccountId.value = null
  resetAccountForm()
  openAccountsModal.value = true
}

function closeAccountsModal() {
  openAccountsModal.value = false
  selectedCompanyId.value = null
  resetAccountForm()
}

function resetAccountForm(account?: CompanyAccount) {
  accountForm.name = account?.name ?? ''
  accountForm.email = account?.email ?? ''
  accountForm.role = account?.role ?? 'Admin'
  accountForm.status = account?.status ?? 'Active'
  editingAccountId.value = account?.id ?? null
}

function saveAccount() {
  if (!selectedCompany.value || !accountForm.name || !accountForm.email) return
  const payload: CompanyAccount = {
    id: editingAccountId.value ?? Date.now(),
    name: accountForm.name.trim(),
    email: accountForm.email.trim(),
    role: accountForm.role,
    status: accountForm.status
  }
  if (editingAccountId.value) {
    const index = selectedCompany.value.accounts.findIndex(account => account.id === editingAccountId.value)
    if (index !== -1) {
      selectedCompany.value.accounts[index] = { ...payload }
    }
  } else {
    selectedCompany.value.accounts.push({ ...payload })
  }
  resetAccountForm()
}

function startEditAccount(account: CompanyAccount) {
  resetAccountForm(account)
}

function removeAccount(accountId: number) {
  if (!selectedCompany.value) return
  selectedCompany.value.accounts = selectedCompany.value.accounts.filter(account => account.id !== accountId)
}

function statusLabel(value: CompanyStatus | AccountStatus) {
  return statusOptions.value.find(option => option.value === value)?.label ?? value
}

function roleLabel(value: AccountRole) {
  return accountRoleOptions.value.find(option => option.value === value)?.label ?? value
}
</script>

