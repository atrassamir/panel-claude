import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Dialog, HStack, Input, InputGroup, Kbd, Portal, Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { LuCornerDownLeft, LuSearch } from 'react-icons/lu'
import { navigation } from '@/app/navigation'

const entries = navigation.flatMap((g) => g.items.map((item) => ({ ...item, group: g.title ?? '' })))

/** Ctrl/Cmd+K search over every page in the panel. */
export function CommandPalette() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const results = useMemo(() => {
    const q = query.trim()
    return q ? entries.filter((e) => e.label.includes(q) || e.group.includes(q)) : entries
  }, [query])

  const go = (path: string) => {
    setOpen(false)
    navigate(path)
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        color="fg.muted"
        justifyContent="space-between"
        w={{ base: 'auto', md: '64' }}
        onClick={() => setOpen(true)}
        aria-label="جستجو"
      >
        <HStack gap="2">
          <LuSearch />
          <Text hideBelow="md">جستجوی صفحه‌ها…</Text>
        </HStack>
        <Kbd size="sm" hideBelow="md" dir="ltr">
          Ctrl K
        </Kbd>
      </Button>

      <Dialog.Root
        open={open}
        onOpenChange={(e) => {
          setOpen(e.open)
          if (!e.open) {
            setQuery('')
            setActive(0)
          }
        }}
        placement="top"
        size="md"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content mt="20">
              <Box p="3" borderBottomWidth="1px">
                <InputGroup startElement={<LuSearch />}>
                  <Input
                    autoFocus
                    variant="flushed"
                    placeholder="نام صفحه را بنویسید…"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.currentTarget.value)
                      setActive(0)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault()
                        setActive((a) => Math.min(a + 1, results.length - 1))
                      } else if (e.key === 'ArrowUp') {
                        e.preventDefault()
                        setActive((a) => Math.max(a - 1, 0))
                      } else if (e.key === 'Enter' && results[active]) {
                        go(results[active].path)
                      }
                    }}
                  />
                </InputGroup>
              </Box>
              <Stack gap="0.5" p="2" maxH="96" overflowY="auto" role="listbox">
                {results.length === 0 && (
                  <Text p="6" textAlign="center" color="fg.muted">
                    صفحه‌ای پیدا نشد
                  </Text>
                )}
                {results.map((r, i) => (
                  <HStack
                    key={r.path}
                    role="option"
                    aria-selected={i === active}
                    gap="3"
                    px="3"
                    py="2"
                    rounded="md"
                    cursor="pointer"
                    bg={i === active ? 'bg.muted' : undefined}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r.path)}
                  >
                    <Box color="fg.muted">{r.icon}</Box>
                    <Text flex="1" fontSize="sm">
                      {r.label}
                    </Text>
                    <Text fontSize="xs" color="fg.subtle">
                      {r.group}
                    </Text>
                    {i === active && <LuCornerDownLeft />}
                  </HStack>
                ))}
              </Stack>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
