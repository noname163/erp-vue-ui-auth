export function toDate(val: string | Date | null | undefined): Date | null {
  if (!val) return null
  if (val instanceof Date) return isNaN(val.getTime()) ? null : val
  const d = new Date(val)
  return isNaN(d.getTime()) ? null : d
}

export function toISODate(d: Date | null): string | null {
  if (!d) return null
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function clampDate(d: Date, min?: Date | null, max?: Date | null): Date {
  if (min && d < min) return new Date(min)
  if (max && d > max) return new Date(max)
  return d
}

export function isBefore(a: Date, b: Date) { return a.getTime() < b.getTime() }
export function isAfter(a: Date, b: Date) { return a.getTime() > b.getTime() }
export function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function startOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth(), 1) }
export function endOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth() + 1, 0) }
export function addMonths(d: Date, n: number) { return new Date(d.getFullYear(), d.getMonth() + n, d.getDate()) }

export function formatDate(d: Date, format = 'yyyy-MM-dd'): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return format
    .replace('yyyy', String(y))
    .replace('MM', m)
    .replace('dd', day)
}

export function parseDate(input: string, format = 'yyyy-MM-dd'): Date | null {
  // Support basic yyyy-MM-dd and dd/MM/yyyy or fallback to Date parse
  try {
    let y = 0, m = 0, d = 0
    if (format === 'yyyy-MM-dd') {
      const m1 = input.match(/^(\d{4})-(\d{2})-(\d{2})$/)
      if (m1) {
        y = Number(m1[1]); m = Number(m1[2]); d = Number(m1[3])
        const dt = new Date(y, m - 1, d)
        return isNaN(dt.getTime()) ? null : dt
      }
    }
    if (format === 'dd/MM/yyyy') {
      const m2 = input.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
      if (m2) {
        d = Number(m2[1]); m = Number(m2[2]); y = Number(m2[3])
        const dt = new Date(y, m - 1, d)
        return isNaN(dt.getTime()) ? null : dt
      }
    }
    const dt = new Date(input)
    return isNaN(dt.getTime()) ? null : dt
  } catch { return null }
}

export function monthGrid(view: Date) {
  const start = startOfMonth(view)
  const end = endOfMonth(view)
  const startWeekday = (start.getDay() + 6) % 7 // make Monday=0
  const days: { date: Date; inMonth: boolean }[] = []
  // previous month days
  for (let i = startWeekday - 1; i >= 0; i--) {
    const d = new Date(start)
    d.setDate(d.getDate() - (i + 1))
    days.push({ date: d, inMonth: false })
  }
  for (let d = 1; d <= end.getDate(); d++) {
    days.push({ date: new Date(view.getFullYear(), view.getMonth(), d), inMonth: true })
  }
  // fill up to 42 cells
  while (days.length % 7 !== 0 || days.length < 42) {
    const last = days[days.length - 1].date
    const next = new Date(last)
    next.setDate(last.getDate() + 1)
    days.push({ date: next, inMonth: false })
  }
  return days
}

