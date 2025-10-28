<script setup lang="ts">
import type { ScheduleSlot, Employee } from '@/types/scheduling';

const props = defineProps<{
    employees: Employee[];
    slots: ScheduleSlot[];
    dateRangeLabel: string;
}>();

const emit = defineEmits<{
    (e: 'edit', slot: ScheduleSlot): void;
}>();

function empName(id: string) {
    return props.employees.find(e => e.id === id)?.name || id;
}
</script>

<template>
    <div class="rounded-xl border overflow-hidden">
        <div class="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
            <h4 class="font-medium">Schedules — {{ dateRangeLabel }}</h4>
            <span class="text-sm text-gray-500">{{ slots.length }} record(s)</span>
        </div>

        <table class="w-full text-sm">
            <thead class="bg-gray-50">
                <tr>
                    <th class="text-left p-3 border-b">Employee</th>
                    <th class="text-left p-3 border-b">Date</th>
                    <th class="text-left p-3 border-b">Start</th>
                    <th class="text-left p-3 border-b">End</th>
                    <th class="text-left p-3 border-b">Hours</th>
                    <th class="text-left p-3 border-b">OT</th>
                    <th class="text-left p-3 border-b">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="s in slots" :key="s.id" class="even:bg-gray-50/40">
                    <td class="p-3 border-b">{{ empName(s.employeeId) }}</td>
                    <td class="p-3 border-b">{{ s.date }}</td>
                    <td class="p-3 border-b">{{ s.startTime ?? '-' }}</td>
                    <td class="p-3 border-b">{{ s.endTime ?? '-' }}</td>
                    <td class="p-3 border-b">{{ s.workingHours ?? '-' }}</td>
                    <td class="p-3 border-b">{{ s.otHours ?? 0 }}</td>
                    <td class="p-3 border-b">
                        <button class="text-blue-600 hover:underline" @click="$emit('edit', s)">Edit</button>
                    </td>
                </tr>
                <tr v-if="!slots.length">
                    <td colspan="7" class="p-4 text-center text-gray-500">No schedules</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
