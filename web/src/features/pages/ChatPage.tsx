import { useEffect, useRef, useState } from 'react'
import { Avatar, Badge, Box, Card, Flex, Float, HStack, IconButton, Input, InputGroup, Stack, Status, Text } from '@chakra-ui/react'
import { LuPaperclip, LuPhone, LuSearch, LuSend, LuSmile, LuVideo, LuEllipsisVertical } from 'react-icons/lu'
import { formatNumber } from '@/lib/format'

type Message = { id: number; mine: boolean; text: string; time: string }

const contacts = [
  { name: 'مریم رضایی', last: 'فایل‌ها رو فرستادم 👌', time: '۱۰:۴۲', unread: 2, online: true },
  { name: 'تیم طراحی', last: 'علی: جلسه ساعت ۳ شد', time: '۰۹:۳۰', unread: 5, online: true },
  { name: 'رضا محمدی', last: 'ممنون، دریافت شد', time: 'دیروز', online: false },
  { name: 'سارا کریمی', last: 'فردا صحبت کنیم؟', time: 'دیروز', online: true },
  { name: 'محمد حسینی', last: 'باشه حتماً', time: 'شنبه', online: false },
]

const initialMessages: Message[] = [
  { id: 1, mine: false, text: 'سلام! نسخه‌ی جدید داشبورد رو دیدی؟', time: '۱۰:۳۰' },
  { id: 2, mine: true, text: 'سلام، آره همین الان بررسی کردم. خیلی بهتر شده 👏', time: '۱۰:۳۲' },
  { id: 3, mine: false, text: 'فقط به نظرم رنگ نمودارها توی حالت تیره یه کم کم‌رنگه.', time: '۱۰:۳۵' },
  { id: 4, mine: true, text: 'موافقم. امروز درستش می‌کنم و خبر میدم.', time: '۱۰:۳۸' },
  { id: 5, mine: false, text: 'عالیه. فایل‌ها رو هم برات فرستادم 👌', time: '۱۰:۴۲' },
]

export function ChatPage() {
  const [active, setActive] = useState(0)
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState('')
  const endRef = useRef<HTMLDivElement>(null)
  const contact = contacts[active]

  useEffect(() => endRef.current?.scrollIntoView({ block: 'end' }), [messages])

  const send = () => {
    const text = draft.trim()
    if (!text) return
    const time = new Intl.DateTimeFormat('fa-IR', { hour: '2-digit', minute: '2-digit' }).format(new Date())
    setMessages((m) => [...m, { id: m.length + 1, mine: true, text, time }])
    setDraft('')
  }

  return (
    <Card.Root overflow="hidden">
      <Flex h="75vh">
        <Stack w="80" borderInlineEndWidth="1px" gap="0" hideBelow="md" flexShrink={0}>
          <Box p="3" borderBottomWidth="1px">
            <InputGroup startElement={<LuSearch />}>
              <Input size="sm" placeholder="جستجوی گفتگو" />
            </InputGroup>
          </Box>
          <Box overflowY="auto">
            {contacts.map((c, i) => (
              <HStack
                key={c.name}
                gap="3"
                p="3"
                cursor="pointer"
                bg={i === active ? 'bg.muted' : undefined}
                _hover={{ bg: 'bg.muted' }}
                onClick={() => setActive(i)}
              >
                <Avatar.Root size="md">
                  <Avatar.Fallback name={c.name} />
                  {c.online && (
                    <Float placement="bottom-start" offsetX="1" offsetY="1">
                      <Status.Root colorPalette="green">
                        <Status.Indicator boxSize="2.5" outline="2px solid" outlineColor="bg.panel" />
                      </Status.Root>
                    </Float>
                  )}
                </Avatar.Root>
                <Stack gap="0" flex="1" minW="0">
                  <HStack justify="space-between">
                    <Text fontSize="sm" fontWeight="semibold" truncate>
                      {c.name}
                    </Text>
                    <Text fontSize="xs" color="fg.muted">
                      {c.time}
                    </Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="xs" color="fg.muted" truncate>
                      {c.last}
                    </Text>
                    {c.unread && (
                      <Badge size="xs" variant="solid" colorPalette="blue" rounded="full">
                        {formatNumber(c.unread)}
                      </Badge>
                    )}
                  </HStack>
                </Stack>
              </HStack>
            ))}
          </Box>
        </Stack>

        <Flex direction="column" flex="1" minW="0">
          <HStack p="3" borderBottomWidth="1px" gap="3">
            <Avatar.Root size="sm">
              <Avatar.Fallback name={contact.name} />
            </Avatar.Root>
            <Box flex="1">
              <Text fontWeight="semibold" fontSize="sm">
                {contact.name}
              </Text>
              <Text fontSize="xs" color={contact.online ? 'fg.success' : 'fg.muted'}>
                {contact.online ? 'آنلاین' : 'آخرین بازدید اخیراً'}
              </Text>
            </Box>
            {[
              { i: <LuPhone />, l: 'تماس' },
              { i: <LuVideo />, l: 'تماس تصویری' },
              { i: <LuEllipsisVertical />, l: 'بیشتر' },
            ].map((a) => (
              <IconButton key={a.l} variant="ghost" size="sm" aria-label={a.l}>
                {a.i}
              </IconButton>
            ))}
          </HStack>

          <Stack flex="1" overflowY="auto" p="4" gap="3" bg="bg.subtle">
            <Text alignSelf="center" fontSize="xs" color="fg.muted" bg="bg.muted" px="3" py="1" rounded="full">
              امروز
            </Text>
            {messages.map((m) => (
              <Flex key={m.id} justify={m.mine ? 'flex-start' : 'flex-end'}>
                <Box
                  maxW="75%"
                  px="4"
                  py="2"
                  rounded="2xl"
                  roundedStartEnd={m.mine ? 'sm' : '2xl'}
                  roundedEndEnd={m.mine ? '2xl' : 'sm'}
                  bg={m.mine ? 'blue.solid' : 'bg.panel'}
                  color={m.mine ? 'blue.contrast' : 'fg'}
                  shadow="xs"
                >
                  <Text fontSize="sm">{m.text}</Text>
                  <Text fontSize="2xs" opacity={0.7} textAlign="end" mt="1">
                    {m.time}
                  </Text>
                </Box>
              </Flex>
            ))}
            <div ref={endRef} />
          </Stack>

          <HStack p="3" borderTopWidth="1px" gap="2">
            <IconButton variant="ghost" size="sm" aria-label="پیوست">
              <LuPaperclip />
            </IconButton>
            <IconButton variant="ghost" size="sm" aria-label="ایموجی">
              <LuSmile />
            </IconButton>
            <Input
              placeholder="پیام خود را بنویسید…"
              value={draft}
              onChange={(e) => setDraft(e.currentTarget.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
            />
            <IconButton colorPalette="blue" aria-label="ارسال" onClick={send}>
              <LuSend style={{ transform: 'scaleX(-1)' }} />
            </IconButton>
          </HStack>
        </Flex>
      </Flex>
    </Card.Root>
  )
}
