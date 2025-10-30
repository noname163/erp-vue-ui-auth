export interface ProblemDetailsResponse {
  // A URI reference that identifies the problem type
  type: string
  // A short summary of the problem
  title: string
  // HTTP status code
  status: number
  // Human-readable explanation specific to this occurrence
  detail: string
  // Request path (instance URI)
  instance: string
  // Server timestamp (ISO 8601 string)
  timestamp: string
}

export function isProblemDetailsResponse(obj: unknown): obj is ProblemDetailsResponse {
  const o = obj as Record<string, unknown>
  return !!o &&
    typeof o.type === 'string' &&
    typeof o.title === 'string' &&
    typeof o.status === 'number' &&
    typeof o.detail === 'string' &&
    typeof o.instance === 'string' &&
    typeof o.timestamp === 'string'
}
