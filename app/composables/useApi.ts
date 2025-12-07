/**
 * Custom API composables for type-safe API calls
 * Uses Nuxt's useFetch under the hood
 */

export type ApiResponse<T> = {
  data: T
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
  }
}

/**
 * Fetch API data with automatic error handling
 * Usage: const { data } = await useApi<User[]>('/api/users')
 */
export async function useApi<T>(url: string) {
  return useFetch<ApiResponse<T>>(url)
}
