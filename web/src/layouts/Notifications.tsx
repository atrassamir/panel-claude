import { useState } from 'react'
import { Avatar, Badge, Box, Button, Float, HStack, IconButton, Popover, Portal, Stack, Text } from '@chakra-ui/react'
import { LuBell } from 'react-icons/lu'
import { formatNumber } from '@/lib/format'

const initial = [
  { id: 1, name: 'مریم رضایی', text: 'یک سفارش جدید ثبت کرد', time: '۲ دقیقه پیش', unread: true },
  { id: 2, name: 'سیستم', text: 'پشتیبان‌گیری شبانه با موفقیت انجام شد', time: '۱ ساعت پیش', unread: true },
  { id: 3, name: 'علی احمدی', text: 'روی فاکتور ORD-1004 نظر گذاشت', time: '۳ ساعت پیش', unread: true },
  { id: 4, name: 'سارا کریمی', text: 'به تیم فروش اضافه شد', time: 'دیروز', unread: false },
  { id: 5, name: 'سیستم', text: 'نسخه‌ی جدید پنل منتشر شد', time: '۲ روز پیش', unread: false },
]

export function Notifications() {
  const [items, setItems] = useState(initial)
  const unread = items.filter((i) => i.unread).length

  return (
    <Popover.Root positioning={{ placement: 'bottom-start' }}>
      <Popover.Trigger asChild>
        <Box position="relative">
          <IconButton variant="ghost" size="sm" aria-label="اعلان‌ها">
            <LuBell />
          </IconButton>
          {unread > 0 && (
            <Float placement="top-start" offset="1.5">
              <Badge size="xs" variant="solid" colorPalette="red" rounded="full" px="1.5">
                {formatNumber(unread)}
              </Badge>
            </Float>
          )}
        </Box>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content width={{ base: '80', sm: '96' }}>
            <Popover.Header>
              <HStack justify="space-between">
                <Popover.Title fontWeight="semibold">اعلان‌ها</Popover.Title>
                <Button
                  size="xs"
                  variant="ghost"
                  colorPalette="blue"
                  disabled={unread === 0}
                  onClick={() => setItems((list) => list.map((i) => ({ ...i, unread: false })))}
                >
                  همه خوانده شد
                </Button>
              </HStack>
            </Popover.Header>
            <Popover.Body p="0">
              <Stack gap="0">
                {items.map((n) => (
                  <HStack
                    key={n.id}
                    gap="3"
                    px="4"
                    py="3"
                    align="start"
                    borderTopWidth="1px"
                    bg={n.unread ? 'blue.subtle/40' : undefined}
                  >
                    <Avatar.Root size="sm">
                      <Avatar.Fallback name={n.name} />
                    </Avatar.Root>
                    <Stack gap="0.5" flex="1">
                      <Text fontSize="sm">
                        <Text as="span" fontWeight="semibold">
                          {n.name}
                        </Text>{' '}
                        {n.text}
                      </Text>
                      <Text fontSize="xs" color="fg.muted">
                        {n.time}
                      </Text>
                    </Stack>
                    {n.unread && <Box boxSize="2" rounded="full" bg="blue.solid" mt="1.5" />}
                  </HStack>
                ))}
              </Stack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
