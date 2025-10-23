<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">Employees</h2>
      <div class="flex gap-2">
        <RequireRole :roles="['admin','manager']">
          <button class="btn btn-secondary h-9 px-3" @click="openImport = true">Import CSV</button>
          <button class="btn btn-primary h-9 px-3" @click="openCreate = true">Add Employee</button>
        </RequireRole>
      </div>
    </div>
    <AppTable :columns="cols" :rows="rows" placeholder="Search employees…">
      <template #cell:name="{ row }">
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 rounded-full bg-[var(--bg-canvas)] grid place-items-center">{{ row.name[0] }}</div>
          <div>
            <div class="font-medium">{{ row.name }}</div>
            <div class="text-[var(--text-muted)] text-xs">{{ row.email }}</div>
          </div>
        </div>
      </template>
      <template #cell:actions="{ row }">
        <router-link :to="`/employees/${row.code}`" class="btn btn-ghost h-8 px-2">View</router-link>
      </template>
    </AppTable>

    <AppModal :open="openCreate" title="Create Employee" confirmText="Create" @close="openCreate=false" @confirm="createEmployee">
      <div>
        <label class="label">Full name</label>
        <input v-model="form.name" class="input" placeholder="Nguyen Van A" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label class="label">Code</label>
          <input v-model="form.code" class="input" placeholder="E-10001" />
        </div>
        <div>
          <label class="label">Email</label>
          <input v-model="form.email" class="input" placeholder="a@example.com" />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label class="label">Department</label>
          <input v-model="form.dept" class="input" placeholder="Engineering" />
        </div>
        <div>
          <label class="label">Manager</label>
          <input v-model="form.manager" class="input" placeholder="Anh Tran" />
        </div>
      </div>
      <div>
        <label class="label">Status</label>
        <select v-model="form.status" class="input">
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
    </AppModal>

    <AppModal :open="openImport" title="Import Employees (CSV)" confirmText="Upload" @close="openImport=false" @confirm="openImport=false">
      <p class="text-sm text-[var(--text-muted)]">Drag & drop CSV here (demo placeholder).</p>
    </AppModal>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import AppTable from '../components/AppTable.vue'
import AppModal from '../components/AppModal.vue'
import RequireRole from '../components/RequireRole.vue'

const cols = [
  { key: 'name', label: 'Employee' },
  { key: 'code', label: 'Code' },
  { key: 'dept', label: 'Department' },
  { key: 'manager', label: 'Manager' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '' }
]

const rows = ref([
  { id:1, name:'Dat Huu Dang', email:'dat.huudang@example.com', code:'E-03421', dept:'Engineering', manager:'Anh Tran', status:'Active' },
  { id:2, name:'Linh Nguyen', email:'linh.ng@example.com', code:'E-03422', dept:'HR', manager:'Hoa Pham', status:'Active' },
  { id:3, name:'Tuan Le', email:'tuan.le@example.com', code:'E-03423', dept:'Ops', manager:'Nam Vu', status:'Inactive' },
])

const openCreate = ref(false)
const openImport = ref(false)
const form = reactive({ name:'', code:'', email:'', dept:'', manager:'', status:'Active' })

function createEmployee() {
  if (!form.name || !form.code) return
  rows.value.unshift({ id: Date.now(), ...form })
  openCreate.value = false
  form.name=''; form.code=''; form.email=''; form.dept=''; form.manager=''; form.status='Active'
}
</script>
