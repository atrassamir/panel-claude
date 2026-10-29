import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

/**
 * Shared HTTP client for the real backend. Feature APIs currently use the
 * in-memory mock in `@/mocks`; switch them to `http` once the backend exists.
 */
export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  timeout: 15_000,
})

http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

http.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) useAuthStore.getState().logout()
    return Promise.reject(error)
  },
)
