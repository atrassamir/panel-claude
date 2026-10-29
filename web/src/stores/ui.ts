import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeMode = 'light' | 'dark'

type UiState = {
  sidebarCollapsed: boolean
  themeMode: ThemeMode
  toggleSidebar: () => void
  setThemeMode: (mode: ThemeMode) => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      themeMode: 'light',
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setThemeMode: (themeMode) => set({ themeMode }),
    }),
    { name: 'panel-ui' },
  ),
)
