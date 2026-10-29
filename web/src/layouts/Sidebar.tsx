import { useState } from 'react'
import { Box, Collapsible, HStack, IconButton, Menu, Portal, Separator, Stack, Text } from '@chakra-ui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LuChevronDown } from 'react-icons/lu'
import { navigation, type NavGroup, type NavItem } from '@/app/navigation'
import { Logo } from '@/components/Logo'
import { Tooltip } from '@/components/ui/tooltip'

function NavLink({ item, active, onNavigate }: { item: NavItem; active: boolean; onNavigate?: () => void }) {
  return (
    <HStack
      asChild
      gap="3"
      px="3"
      py="2"
      rounded="md"
      fontSize="sm"
      bg={active ? 'blue.subtle' : undefined}
      color={active ? 'blue.fg' : 'fg.muted'}
      fontWeight={active ? 'medium' : 'normal'}
      _hover={{ bg: active ? 'blue.subtle' : 'bg.muted', color: active ? 'blue.fg' : 'fg' }}
    >
      <Link to={item.path} onClick={onNavigate}>
        {item.icon}
        {item.label}
      </Link>
    </HStack>
  )
}

function NavSection({ group, pathname, onNavigate }: { group: NavGroup; pathname: string; onNavigate?: () => void }) {
  const hasActive = group.items.some((i) => i.path === pathname)
  const [open, setOpen] = useState(true)

  return (
    <Collapsible.Root open={open || hasActive} onOpenChange={(e) => setOpen(e.open)}>
      <Collapsible.Trigger asChild>
        <HStack
          as="button"
          w="full"
          justify="space-between"
          px="3"
          py="1.5"
          fontSize="xs"
          fontWeight="semibold"
          color="fg.subtle"
          cursor="pointer"
          _hover={{ color: 'fg' }}
        >
          {group.title}
          <Collapsible.Indicator transition="transform 0.2s" _open={{ transform: 'rotate(180deg)' }}>
            <LuChevronDown />
          </Collapsible.Indicator>
        </HStack>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Stack gap="0.5" mt="1">
          {group.items.map((item) => (
            <NavLink key={item.path} item={item} active={pathname === item.path} onNavigate={onNavigate} />
          ))}
        </Stack>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

/** Full sidebar: grouped, collapsible sections. Also used inside the mobile drawer. */
export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation()
  return (
    <Stack gap="4" p="4">
      <Box px="2" py="1">
        <Logo />
      </Box>
      {navigation.map((group) => (
        <NavSection key={group.key} group={group} pathname={pathname} onNavigate={onNavigate} />
      ))}
    </Stack>
  )
}

/** Icon-only sidebar: each group opens its pages in a flyout menu. */
export function MiniSidebarNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <Stack gap="2" py="4" align="center">
      <Box mb="2">
        <Logo compact />
      </Box>
      <Separator w="8" />
      {navigation.map((group) => {
        const active = group.items.some((i) => i.path === pathname)
        return (
          <Menu.Root key={group.key} positioning={{ placement: 'left-start' }} onSelect={(e) => navigate(e.value)}>
            <Tooltip content={group.title} positioning={{ placement: 'left' }}>
              <Menu.Trigger asChild>
                <IconButton
                  aria-label={group.title}
                  variant={active ? 'subtle' : 'ghost'}
                  colorPalette={active ? 'blue' : 'gray'}
                  size="md"
                >
                  {group.icon}
                </IconButton>
              </Menu.Trigger>
            </Tooltip>
            <Portal>
              <Menu.Positioner>
                <Menu.Content minW="52">
                  <Menu.ItemGroup>
                    <Menu.ItemGroupLabel>{group.title}</Menu.ItemGroupLabel>
                    {group.items.map((item) => (
                      <Menu.Item key={item.path} value={item.path} color={item.path === pathname ? 'blue.fg' : undefined}>
                        {item.icon}
                        <Text>{item.label}</Text>
                      </Menu.Item>
                    ))}
                  </Menu.ItemGroup>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        )
      })}
    </Stack>
  )
}
