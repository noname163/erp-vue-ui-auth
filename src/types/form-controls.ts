export type OptionValue = string | number

export interface SelectOption {
  label: string
  value: OptionValue
  disabled?: boolean
}

export interface DateRange {
  start: string | Date | null
  end: string | Date | null
}

