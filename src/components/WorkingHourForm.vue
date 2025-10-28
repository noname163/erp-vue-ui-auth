<template>
    <div class="space-y-5">
        <div>
            <div class="mb-2 text-sm text-gray-500">{{ t('workingHoursForm.date') }}: {{ date }}</div>
            <BaseRadioGroup v-model="mode" :options="radioOptions" name="wh-mode" />
        </div>

        <!-- BY_HOURS -->
        <div v-if="mode === 'BY_HOURS'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="text-sm block mb-1">{{ t('workingHoursForm.workingHours') }}</label>
                <BaseInput type="number" min="0" step="0.25" placeholder="e.g., 8" v-model="hours" />
            </div>
            <div>
                <label class="text-sm block mb-1">{{ t('workingHoursForm.otHours') }}</label>
                <BaseInput type="number" min="0" step="0.25" placeholder="e.g., 2" v-model="otHours" />
            </div>
        </div>

        <!-- BY_TIME -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="text-sm block mb-1">{{ t('workingHoursForm.startTime') }}</label>
                <BaseInput type="time" v-model="startTime" />
            </div>
            <div>
                <label class="text-sm block mb-1">{{ t('workingHoursForm.endTime') }}</label>
                <BaseInput type="time" v-model="endTime" />
            </div>
        </div>

        <!-- Bottom section: for BY_TIME keep OT + employees; for BY_HOURS only employees -->
        <div v-if="mode === 'BY_TIME'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="text-sm block mb-1">{{ t('workingHoursForm.otHours') }}</label>
                <BaseInput type="number" min="0" step="0.25" placeholder="e.g., 2" v-model="otHours" />
            </div>
            <div class="space-y-2">
                <div :class="applyAll ? 'opacity-50 pointer-events-none' : ''">
                    <label class="text-sm block mb-1">{{ t('workingHoursForm.applySelectedEmployees') }}</label>
                    <BaseSelect multiple :options="employeeOptions" v-model="chosenEmployees"
                        placeholder="Select employees" />
                </div>
            </div>
        </div>
        <div v-else class="grid grid-cols-1 gap-4">
            <div class="space-y-2">
                <div :class="applyAll ? 'opacity-50 pointer-events-none' : ''">
                    <label class="text-sm block mb-1">{{ t('workingHoursForm.applySelectedEmployees') }}</label>
                    <BaseSelect multiple :options="employeeOptions" v-model="chosenEmployees"
                        placeholder="Select employees" />
                </div>
            </div>
        </div>

        <div class="flex justify-end gap-2 pt-2">
            <AppButton variant="secondary" @click="$emit('cancel')">{{ t('controls.cancel') }}</AppButton>
            <AppButton @click="submit">{{ t('controls.save') }}</AppButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseRadioGroup from '@/components/ui/BaseRadioGroup.vue';
import BaseSelect, { type SelectOption } from '@/components/ui/BaseSelect.vue';
import type { WorkingHourMode, Employee } from '@/types/scheduling';
import { ref, computed } from 'vue';
import BaseInput from './inputs/BaseInput.vue';
import AppButton from './AppButton.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
    employees: Employee[];
    selectedEmployeeIds: string[]; // who to apply to (ignored if applyAll)
    date: string; // current date context (or first in the range)
    initialMode?: WorkingHourMode;
    initialHours?: number | null;
    initialStart?: string | null; // "HH:mm"
    initialEnd?: string | null;   // "HH:mm"
    initialOT?: number | null;
}>();

const emit = defineEmits<{
    (e: 'submit', payload: {
        mode: WorkingHourMode;
        hours?: number | null;
        startTime?: string | null;
        endTime?: string | null;
        otHours: number;
        applyAll: boolean;
        employeeIds: string[];
    }): void;
    (e: 'cancel'): void;
}>();

const mode = ref<WorkingHourMode>(props.initialMode ?? 'BY_HOURS');
const hours = ref<number | null>(props.initialHours ?? null);
const startTime = ref<string | null>(props.initialStart ?? null);
const endTime = ref<string | null>(props.initialEnd ?? null);
const otHours = ref<number>(props.initialOT ?? 0);
const applyAll = ref<boolean>(false);
const chosenEmployees = ref<string[]>([...props.selectedEmployeeIds]);
const { t } = useI18n();

const radioOptions = computed(() => [
    { label: t('workingHoursForm.byHours'), value: 'BY_HOURS' },
    { label: t('workingHoursForm.byTime'), value: 'BY_TIME' },
]);

const employeeOptions: SelectOption[] = props.employees.map(e => ({ label: `${e.code} - ${e.name}`, value: e.id }));

function validate(): string | null {
    if (mode.value === 'BY_HOURS') {
        if (hours.value == null || isNaN(Number(hours.value)) || Number(hours.value) < 0) return 'Please input a valid working hour (>= 0)';
    } else {
        if (!startTime.value || !endTime.value) return 'Please input both start and end time';
        if (startTime.value >= endTime.value) return 'End time must be after start time';
    }
    if (otHours.value < 0) return 'OT hours cannot be negative';
    if (!applyAll.value && chosenEmployees.value.length === 0) return 'Please choose at least one employee or check "Apply to all"';
    return null;
}

function submit() {
    const err = validate();
    if (err) { alert(err); return; }
    emit('submit', {
        mode: mode.value,
        hours: mode.value === 'BY_HOURS' ? Number(hours.value) : null,
        startTime: mode.value === 'BY_TIME' ? startTime.value : null,
        endTime: mode.value === 'BY_TIME' ? endTime.value : null,
        otHours: Number(otHours.value),
        applyAll: applyAll.value,
        employeeIds: applyAll.value ? [] : chosenEmployees.value
    });
}
</script>
