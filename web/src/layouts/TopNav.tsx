import { Button, HStack, Menu, Portal } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LuChevronDown } from 'react-icons/lu'
import { navigation } from '@/app/navigation'

/** Horizontal navigation: one dropdown per group. */
export function TopNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <HStack gap="1" overflowX="auto">
      {navigation.map((group) => {
        const active = group.items.some((i) => i.path === pathname)
        return (
          <Menu.Root key={group.key} onSelect={(e) => navigate(e.value)}>
            <Menu.Trigger asChild>
              <Button size="sm" variant={active ? 'subtle' : 'ghost'} colorPalette={active ? 'blue' : 'gray'} flexShrink={0}>
                {group.icon}
                {group.title}
                <LuChevronDown />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content minW="52">
                  {group.items.map((item) => (
                    <Menu.Item key={item.path} value={item.path} color={item.path === pathname ? 'blue.fg' : undefined}>
                      {item.icon}
                      {item.label}
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        )
      })}
    </HStack>
  )
}
