export interface ApiEnvelope<T> {
  success: boolean
  message: string
  data: T
}

export interface PagedResponse<T> {
  data: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  last: boolean
  message?: string
  success?: boolean
}

export function isPagedResponse<T = unknown>(obj: unknown): obj is PagedResponse<T> {
  const o = obj as Record<string, unknown>
  return (
    !!o &&
    Array.isArray(o.data) &&
    typeof o.page === 'number' &&
    typeof o.size === 'number' &&
    typeof o.totalElements === 'number' &&
    typeof o.totalPages === 'number' &&
    typeof o.last === 'boolean'
  )
}

export function isApiEnvelope<T = unknown>(obj: unknown): obj is ApiEnvelope<T> {
  const o = obj as Record<string, unknown>
  return !!o && typeof o.success === 'boolean' && 'data' in o
}

