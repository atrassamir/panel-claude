import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type LayoutMode = 'sidebar' | 'topnav'

type UiState = {
  layout: LayoutMode
  sidebarCollapsed: boolean
  setLayout: (layout: LayoutMode) => void
  toggleSidebar: () => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      layout: 'sidebar',
      sidebarCollapsed: false,
      setLayout: (layout) => set({ layout }),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
    }),
    { name: 'panel-ui' },
  ),
)
