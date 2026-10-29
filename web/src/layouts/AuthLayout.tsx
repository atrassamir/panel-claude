import { Box, Card, Flex, Heading } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { ColorModeButton } from '@/components/ui/color-mode'

export function AuthLayout() {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="bg.subtle" p="4" position="relative">
      <Box position="absolute" top="4" insetStart="4">
        <ColorModeButton />
      </Box>
      <Card.Root width="full" maxW="md">
        <Card.Header>
          <Heading size="md" color="blue.fg" textAlign="center">
            پنل مدیریت
          </Heading>
        </Card.Header>
        <Card.Body>
          <Outlet />
        </Card.Body>
      </Card.Root>
    </Flex>
  )
}
