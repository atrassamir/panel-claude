import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AuthUser = {
  id: number
  name: string
  email: string
  role: string
}

type AuthState = {
  token: string | null
  user: AuthUser | null
  setSession: (token: string, user: AuthUser) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    { name: 'panel-auth' },
  ),
)
