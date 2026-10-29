import { useTheme } from 'next-themes'

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme()
  const colorMode = resolvedTheme === 'dark' ? 'dark' : 'light'
  return {
    colorMode,
    setColorMode: setTheme,
    toggleColorMode: () => setTheme(colorMode === 'dark' ? 'light' : 'dark'),
  }
}
