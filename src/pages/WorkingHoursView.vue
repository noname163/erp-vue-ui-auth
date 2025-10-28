<template>
    <div class="p-6 space-y-6">
        <header class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div class="space-y-2">
                <h1 class="text-2xl font-semibold">{{ t('workingHoursView.title') }}</h1>
                <p class="text-sm text-gray-500">{{ t('workingHoursView.subtitle') }}</p>
            </div>

            <div class="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                <DateRangePicker v-model="dateRange" />
                <EmployeeSearchBar v-model="search" :placeholder="t('workingHoursView.searchPlaceholder')" @search="(q) => (search = q)" />
                <AppButton @click="openCreate">{{ t('workingHoursView.addButton') }}</AppButton>
            </div>
        </header>

        <main>
            <AppTable :columns="tableColumns" :rows="tableRows" :placeholder="t('controls.searchPlaceholder')">
                <template #cell:employee="{ row }">
                    {{ employees.find(x => x.id === row.employee)?.name || row.employee }}
                </template>
                <template #cell:start="{ row }">
                    {{ row.start || '-' }}
                </template>
                <template #cell:end="{ row }">
                    {{ row.end || '-' }}
                </template>
                <template #cell:hours="{ row }">
                    {{ row.hours ?? '-' }}
                </template>
                <template #cell:ot="{ row }">
                    {{ row.ot ?? 0 }}
                </template>
                <template #cell:action="{ row }">
                    <AppButton size="sm" @click="openEdit({ id: row.id, employeeId: row.employee, date: row.date, startTime: row.start || undefined, endTime: row.end || undefined, workingHours: typeof row.hours==='number'? row.hours: undefined, otHours: Number(row.ot)||0 })">{{ t('controls.edit') }}</AppButton>
                </template>
            </AppTable>
        </main>

        <Modal :open="showModal" :title="editingSlot ? t('workingHoursView.editTitle') : t('workingHoursView.addTitle')"
            @close="showModal = false">
            <WorkingHourForm :employees="filteredEmployees"
                :selected-employee-ids="editingSlot ? [editingSlot.employeeId] : []" :date="modalDate"
                :initial-mode="editingSlot ? (editingSlot.workingHours != null ? 'BY_HOURS' : 'BY_TIME') : 'BY_HOURS'"
                :initial-hours="editingSlot?.workingHours ?? null" :initial-start="editingSlot?.startTime ?? null"
                :initial-end="editingSlot?.endTime ?? null" :initial-ot="editingSlot?.otHours ?? 0"
                @submit="upsertWorkingHours" @cancel="showModal = false" />
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { todayISO } from '@/utils/date';
import type { Employee, ScheduleSlot, DateRange } from '@/types/scheduling';

import DateRangePicker from '@/components/inputs/DateRangePicker.vue';
import EmployeeSearchBar from '@/components/EmployeeSearchBar.vue';
// import ScheduleTable from '@/components/ScheduleTable.vue';
import AppTable from '@/components/AppTable.vue';
import Modal from '@/components/ui/Modal.vue';
import WorkingHourForm from '@/components/WorkingHourForm.vue';
import AppButton from '@/components/AppButton.vue';

// ---------- Local state ----------
const employees = ref<Employee[]>([
    { id: 'e1', code: 'EMP001', name: 'Alice Nguyen', department: 'Ops' },
    { id: 'e2', code: 'EMP002', name: 'Bao Tran', department: 'Sales' },
    { id: 'e3', code: 'EMP003', name: 'Cuong Le', department: 'Ops' },
]);

const dateRange = ref<DateRange>({ start: todayISO(), end: todayISO() });
const search = ref<string>('');
const filteredEmployees = computed(() => {
    const q = search.value.trim().toLowerCase();
    if (!q) return employees.value;
    return employees.value.filter(e =>
        e.name.toLowerCase().includes(q) || e.code.toLowerCase().includes(q)
    );
});

// mock schedule store (replace with API calls)
let idCounter = 1;
const slots = ref<ScheduleSlot[]>([
    { id: String(idCounter++), employeeId: 'e1', date: todayISO(), startTime: '09:00', endTime: '17:00', workingHours: 8, otHours: 0 },
]);

const viewSlots = computed(() =>
    slots.value.filter(s =>
        s.date >= dateRange.value.start && s.date <= dateRange.value.end &&
        filteredEmployees.value.some(e => e.id === s.employeeId)
    )
);

const rangeLabel = computed(() =>
    dateRange.value.start === dateRange.value.end
        ? dateRange.value.start
        : `${dateRange.value.start} - ${dateRange.value.end}`
);

// modal state
const showModal = ref(false);
const modalDate = ref(todayISO());
const editingSlot = ref<ScheduleSlot | null>(null);
const { t } = useI18n();

// ---------- Actions ----------
function openCreate() {
    editingSlot.value = null;
    modalDate.value = dateRange.value.start;
    showModal.value = true;
}

function openEdit(slot: ScheduleSlot) {
    editingSlot.value = { ...slot };
    modalDate.value = slot.date;
    showModal.value = true;
}

function upsertWorkingHours(payload: {
    mode: 'BY_HOURS' | 'BY_TIME';
    hours?: number | null;
    startTime?: string | null;
    endTime?: string | null;
    otHours: number;
    applyAll: boolean;
    employeeIds: string[];
}) {
    const applyIds = payload.applyAll ? filteredEmployees.value.map(e => e.id) : payload.employeeIds;

    if (editingSlot.value) {
        // Update the single slot
        const idx = slots.value.findIndex(s => s.id === editingSlot.value!.id);
        if (idx >= 0) {
            slots.value[idx] = {
                ...slots.value[idx],
                workingHours: payload.mode === 'BY_HOURS' ? payload.hours ?? undefined : undefined,
                startTime: payload.mode === 'BY_TIME' ? payload.startTime ?? undefined : undefined,
                endTime: payload.mode === 'BY_TIME' ? payload.endTime ?? undefined : undefined,
                otHours: payload.otHours,
            };
        }
    } else {
        // Create for selected employees on modalDate (first date of range)
        for (const empId of applyIds) {
            slots.value.push({
                id: String(idCounter++),
                employeeId: empId,
                date: modalDate.value,
                workingHours: payload.mode === 'BY_HOURS' ? payload.hours ?? undefined : undefined,
                startTime: payload.mode === 'BY_TIME' ? payload.startTime ?? undefined : undefined,
                endTime: payload.mode === 'BY_TIME' ? payload.endTime ?? undefined : undefined,
                otHours: payload.otHours,
            });
        }
    }
    showModal.value = false;
}

onMounted(() => {
    // TODO: Replace stubs with API calls:
    // - fetch employees
    // - fetch slots by date range and optional employee query
});

const tableColumns = computed(() => ([
  { key: 'employee', label: t('employees.title') },
  { key: 'date', label: t('workingHoursForm.date') },
  { key: 'start', label: t('workingHoursForm.startTime') },
  { key: 'end', label: t('workingHoursForm.endTime') },
  { key: 'hours', label: t('workingHoursForm.workingHours') },
  { key: 'ot', label: t('workingHoursForm.otHours') },
  { key: 'action', label: t('controls.edit') },
]));

const tableRows = computed(() => viewSlots.value.map(s => ({
  id: s.id,
  employee: s.employeeId,
  date: s.date,
  start: s.startTime ?? '',
  end: s.endTime ?? '',
  hours: s.workingHours ?? null,
  ot: s.otHours ?? 0,
})));
</script>
