import { Avatar, Box, HStack, Menu, Portal, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { LuLogOut, LuSettings, LuUser } from 'react-icons/lu'
import { useAuthStore } from '@/stores/auth'

export function UserMenu() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  return (
    <Menu.Root positioning={{ placement: 'bottom-start' }}>
      <Menu.Trigger asChild>
        <HStack as="button" gap="2" cursor="pointer" aria-label="منوی کاربر">
          <Avatar.Root size="sm" colorPalette="blue">
            <Avatar.Fallback name={user?.name} />
          </Avatar.Root>
          <Text fontSize="sm" hideBelow="md">
            {user?.name}
          </Text>
        </HStack>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="52">
            <Box px="2" py="1.5">
              <Text fontSize="sm" fontWeight="medium">
                {user?.name}
              </Text>
              <Text fontSize="xs" color="fg.muted" dir="ltr" textAlign="end">
                {user?.email}
              </Text>
            </Box>
            <Menu.Separator />
            <Menu.Item value="profile" onSelect={() => navigate('/pages/profile')}>
              <LuUser /> پروفایل
            </Menu.Item>
            <Menu.Item value="settings" onSelect={() => navigate('/pages/settings')}>
              <LuSettings /> تنظیمات حساب
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item
              value="logout"
              color="fg.error"
              onSelect={() => {
                logout()
                navigate('/login')
              }}
            >
              <LuLogOut /> خروج
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
