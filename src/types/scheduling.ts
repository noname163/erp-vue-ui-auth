export type ID = string;

export interface Employee {
  id: ID;
  code: string;
  name: string;
  department?: string;
}

export interface DateRange {
  start: string; // ISO yyyy-MM-dd
  end: string; // ISO yyyy-MM-dd
}

export interface ScheduleSlot {
  id: ID;
  employeeId: ID;
  date: string; // ISO yyyy-MM-dd
  startTime?: string; // "HH:mm"
  endTime?: string; // "HH:mm"
  workingHours?: number; // if provided directly
  otHours?: number; // overtime hours
}

export type WorkingHourMode = "BY_HOURS" | "BY_TIME";
