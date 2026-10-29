import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Account = { name: string; email: string; password: string }
export type SessionUser = Omit<Account, 'password'>

type AuthState = {
  accounts: Account[]
  user: SessionUser | null
  login: (email: string, password: string) => void
  register: (account: Account) => void
  logout: () => void
}

const normalize = (email: string) => email.trim().toLowerCase()

/**
 * Front-end only auth: accounts live in localStorage. This is for demoing
 * the UI and is not secure — passwords are stored as plain text.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accounts: [{ name: 'مدیر سیستم', email: 'admin@example.com', password: 'admin123' }],
      user: null,

      login: (email, password) => {
        const account = get().accounts.find((a) => a.email === normalize(email))
        if (!account || account.password !== password) throw new Error('ایمیل یا رمز عبور اشتباه است')
        set({ user: { name: account.name, email: account.email } })
      },

      register: ({ name, email, password }) => {
        const normalized = normalize(email)
        if (get().accounts.some((a) => a.email === normalized)) throw new Error('این ایمیل قبلاً ثبت شده است')
        set((s) => ({
          accounts: [...s.accounts, { name, email: normalized, password }],
          user: { name, email: normalized },
        }))
      },

      logout: () => set({ user: null }),
    }),
    { name: 'panel-auth' },
  ),
)
