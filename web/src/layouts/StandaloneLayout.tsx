import { Suspense } from 'react'
import { Box, Center, Spinner } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { ColorModeButton } from '@/components/ui/color-mode'

export function StandaloneLayout() {
  return (
    <Box minH="100vh" position="relative">
      <Box position="absolute" top="4" insetEnd="4" zIndex="docked">
        <ColorModeButton />
      </Box>
      <Suspense
        fallback={
          <Center minH="100vh">
            <Spinner />
          </Center>
        }
      >
        <Outlet />
      </Suspense>
    </Box>
  )
}
