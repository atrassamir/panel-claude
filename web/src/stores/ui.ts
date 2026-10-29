import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UiState = {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
    }),
    {
      name: 'panel-ui',
      version: 1,
      // v0 also stored a sidebar/top-nav layout choice, which no longer exists.
      migrate: (persisted) => ({ sidebarCollapsed: !!(persisted as Partial<UiState>)?.sidebarCollapsed }),
    },
  ),
)
