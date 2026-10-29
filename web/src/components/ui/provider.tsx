import type { ReactNode } from 'react'
import { ChakraProvider, LocaleProvider } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import { system } from '@/theme'
import { Toaster } from './toaster'

export function Provider({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <LocaleProvider locale="fa-IR">
        <ThemeProvider attribute="class" disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </LocaleProvider>
    </ChakraProvider>
  )
}
