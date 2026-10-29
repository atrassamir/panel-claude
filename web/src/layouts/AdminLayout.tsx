import { Suspense, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  Avatar,
  Box,
  CloseButton,
  Drawer,
  Flex,
  HStack,
  IconButton,
  Menu,
  Portal,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { LuLogOut, LuMenu } from 'react-icons/lu'
import { navigation } from '@/app/navigation'
import { ColorModeButton } from '@/components/ui/color-mode'
import { useAuthStore } from '@/stores/auth'

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation()

  return (
    <Stack gap="5" p="4">
      <Text fontWeight="bold" fontSize="lg" color="blue.fg" px="3">
        پنل مدیریت
      </Text>
      {navigation.map((group, i) => (
        <Stack key={group.title ?? i} gap="1">
          {group.title && (
            <Text fontSize="xs" fontWeight="medium" color="fg.muted" px="3" mb="1">
              {group.title}
            </Text>
          )}
          {group.items.map((item) => {
            const active = pathname === item.path
            return (
              <HStack
                key={item.path}
                asChild
                gap="3"
                px="3"
                py="2"
                rounded="md"
                fontSize="sm"
                bg={active ? 'blue.subtle' : undefined}
                color={active ? 'blue.fg' : 'fg'}
                fontWeight={active ? 'medium' : 'normal'}
                _hover={{ bg: active ? 'blue.subtle' : 'bg.muted' }}
              >
                <Link to={item.path} onClick={onNavigate}>
                  {item.icon}
                  {item.label}
                </Link>
              </HStack>
            )
          })}
        </Stack>
      ))}
    </Stack>
  )
}

function UserMenu() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  return (
    <Menu.Root positioning={{ placement: 'bottom-start' }}>
      <Menu.Trigger asChild>
        <HStack as="button" gap="2" cursor="pointer">
          <Avatar.Root size="sm" colorPalette="blue">
            <Avatar.Fallback name={user?.name} />
          </Avatar.Root>
          <Text fontSize="sm" hideBelow="sm">
            {user?.name}
          </Text>
        </HStack>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="48">
            <Box px="2" py="1.5">
              <Text fontSize="sm" fontWeight="medium">
                {user?.name}
              </Text>
              <Text fontSize="xs" color="fg.muted" dir="ltr" textAlign="end">
                {user?.email}
              </Text>
            </Box>
            <Menu.Separator />
            <Menu.Item
              value="logout"
              color="fg.error"
              onSelect={() => {
                logout()
                navigate('/login')
              }}
            >
              <LuLogOut />
              خروج
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <Flex minH="100vh">
      <Box
        as="aside"
        w="64"
        flexShrink={0}
        borderInlineEndWidth="1px"
        bg="bg.panel"
        hideBelow="lg"
        position="sticky"
        top="0"
        h="100vh"
        overflowY="auto"
      >
        <SidebarNav />
      </Box>

      <Drawer.Root open={drawerOpen} onOpenChange={(e) => setDrawerOpen(e.open)} placement="start">
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content maxW="64">
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
              <SidebarNav onNavigate={() => setDrawerOpen(false)} />
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>

      <Flex direction="column" flex="1" minW="0" bg="bg.subtle">
        <Flex
          as="header"
          h="16"
          px={{ base: '4', md: '6' }}
          align="center"
          justify="space-between"
          borderBottomWidth="1px"
          bg="bg.panel"
          position="sticky"
          top="0"
          zIndex="sticky"
        >
          <IconButton variant="ghost" size="sm" aria-label="باز کردن منو" hideFrom="lg" onClick={() => setDrawerOpen(true)}>
            <LuMenu />
          </IconButton>
          <HStack gap="3" ms="auto">
            <ColorModeButton />
            <UserMenu />
          </HStack>
        </Flex>

        <Box as="main" flex="1" p={{ base: '4', md: '6' }}>
          <Suspense
            fallback={
              <Flex justify="center" py="12">
                <Spinner />
              </Flex>
            }
          >
            <Outlet />
          </Suspense>
        </Box>
      </Flex>
    </Flex>
  )
}
