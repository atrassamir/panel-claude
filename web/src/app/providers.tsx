import type { ReactNode } from 'react'
import { App as AntApp, ConfigProvider, theme } from 'antd'
import faIR from 'antd/locale/fa_IR'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useUiStore } from '@/stores/ui'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: 1, refetchOnWindowFocus: false },
  },
})

export function AppProviders({ children }: { children: ReactNode }) {
  const themeMode = useUiStore((s) => s.themeMode)

  return (
    <ConfigProvider
      direction="rtl"
      locale={faIR}
      theme={{
        algorithm: themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          fontFamily: "'Vazirmatn', system-ui, sans-serif",
          colorPrimary: '#1677ff',
          borderRadius: 8,
        },
      }}
    >
      <AntApp>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </AntApp>
    </ConfigProvider>
  )
}
