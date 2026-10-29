import { Suspense, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, CloseButton, Drawer, Flex, HStack, IconButton, Portal, Spinner } from '@chakra-ui/react'
import { LuMenu, LuPanelRightClose, LuPanelRightOpen } from 'react-icons/lu'
import { ColorModeButton } from '@/components/ui/color-mode'
import { useUiStore } from '@/stores/ui'
import { AppBreadcrumb } from './AppBreadcrumb'
import { CommandPalette } from './CommandPalette'
import { Notifications } from './Notifications'
import { MiniSidebarNav, SidebarNav } from './Sidebar'
import { UserMenu } from './UserMenu'

export function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { sidebarCollapsed, toggleSidebar } = useUiStore()

  return (
    <Flex minH="100vh">
      <Box
        as="aside"
        w={sidebarCollapsed ? '16' : '64'}
        transition="width 0.2s"
        flexShrink={0}
        borderInlineEndWidth="1px"
        bg="bg.panel"
        hideBelow="lg"
        position="sticky"
        top="0"
        h="100vh"
        overflowY="auto"
      >
        {sidebarCollapsed ? <MiniSidebarNav /> : <SidebarNav />}
      </Box>

      <Drawer.Root open={drawerOpen} onOpenChange={(e) => setDrawerOpen(e.open)} placement="start">
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content maxW="72" overflowY="auto">
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
              <SidebarNav onNavigate={() => setDrawerOpen(false)} />
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>

      <Flex direction="column" flex="1" minW="0" bg="bg.subtle">
        <Box as="header" bg="bg.panel" borderBottomWidth="1px" position="sticky" top="0" zIndex="sticky">
          <Flex h="16" px={{ base: '4', md: '6' }} align="center" gap="3">
            <IconButton variant="ghost" size="sm" aria-label="باز کردن منو" hideFrom="lg" onClick={() => setDrawerOpen(true)}>
              <LuMenu />
            </IconButton>
            <IconButton
              variant="ghost"
              size="sm"
              aria-label={sidebarCollapsed ? 'باز کردن سایدبار' : 'جمع کردن سایدبار'}
              hideBelow="lg"
              onClick={toggleSidebar}
            >
              {sidebarCollapsed ? <LuPanelRightOpen /> : <LuPanelRightClose />}
            </IconButton>
            <CommandPalette />
            <HStack gap="1" ms="auto">
              <ColorModeButton />
              <Notifications />
              <Box ms="2">
                <UserMenu />
              </Box>
            </HStack>
          </Flex>
        </Box>

        <Box as="main" flex="1" p={{ base: '4', md: '6' }}>
          <AppBreadcrumb />
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
