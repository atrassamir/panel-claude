import { IconButton } from '@chakra-ui/react'
import { LuMoon, LuSun } from 'react-icons/lu'
import { useColorMode } from './use-color-mode'

export function ColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton variant="ghost" size="sm" aria-label="تغییر تم" onClick={toggleColorMode}>
      {colorMode === 'dark' ? <LuSun /> : <LuMoon />}
    </IconButton>
  )
}
