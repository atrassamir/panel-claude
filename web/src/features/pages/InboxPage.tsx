import { useState } from 'react'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Separator,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import {
  LuArchive,
  LuFile,
  LuInbox,
  LuPaperclip,
  LuPencil,
  LuReply,
  LuSearch,
  LuSend,
  LuStar,
  LuTrash2,
  LuForward,
} from 'react-icons/lu'
import { Tooltip } from '@/components/ui/tooltip'
import { formatNumber } from '@/lib/format'

const folders = [
  { key: 'inbox', label: 'صندوق ورودی', icon: <LuInbox />, count: 4 },
  { key: 'starred', label: 'ستاره‌دار', icon: <LuStar /> },
  { key: 'sent', label: 'ارسال شده', icon: <LuSend /> },
  { key: 'drafts', label: 'پیش‌نویس', icon: <LuFile />, count: 2 },
  { key: 'archive', label: 'بایگانی', icon: <LuArchive /> },
  { key: 'trash', label: 'سطل زباله', icon: <LuTrash2 /> },
]

const labels = [
  { name: 'کاری', color: 'blue' },
  { name: 'شخصی', color: 'green' },
  { name: 'مهم', color: 'red' },
]

const mails = [
  { id: 1, from: 'مریم رضایی', subject: 'جلسه‌ی بازبینی طراحی', preview: 'سلام، برای جلسه‌ی فردا ساعت ۱۰ فایل‌های نهایی را آماده کرده‌ام…', time: '۱۰:۴۲', unread: true, label: 'کاری', starred: true },
  { id: 2, from: 'تیم پشتیبانی', subject: 'تیکت شماره ۴۸۲۱ بسته شد', preview: 'مشکل گزارش شده برطرف شد. در صورت نیاز تیکت را دوباره باز کنید.', time: '۰۹:۱۵', unread: true, label: 'مهم' },
  { id: 3, from: 'علی احمدی', subject: 'فاکتور ماه آبان', preview: 'فاکتور این ماه پیوست شده است. لطفاً بررسی و تأیید کنید.', time: 'دیروز', unread: true, label: 'کاری' },
  { id: 4, from: 'سارا کریمی', subject: 'دعوت به جشن تولد', preview: 'جمعه‌ی همین هفته منتظرت هستیم! لطفاً تا چهارشنبه خبر بده.', time: 'دیروز', unread: true, label: 'شخصی' },
  { id: 5, from: 'رضا محمدی', subject: 'گزارش عملکرد هفتگی', preview: 'خلاصه‌ی عملکرد تیم فروش در هفته‌ی گذشته به پیوست است.', time: 'سه‌شنبه', unread: false, label: 'کاری', starred: true },
  { id: 6, from: 'خبرنامه‌ی طراحی', subject: '۱۰ ترند طراحی رابط کاربری', preview: 'در این شماره نگاهی داریم به مهم‌ترین ترندهای طراحی امسال…', time: 'دوشنبه', unread: false },
]

const labelColor = Object.fromEntries(labels.map((l) => [l.name, l.color]))

export function InboxPage() {
  const [folder, setFolder] = useState('inbox')
  const [selectedId, setSelectedId] = useState(1)
  const selected = mails.find((m) => m.id === selectedId) ?? mails[0]

  return (
    <Card.Root overflow="hidden">
      <Flex minH="70vh" direction={{ base: 'column', lg: 'row' }}>
        <Stack w={{ base: 'full', lg: '56' }} p="4" gap="1" borderInlineEndWidth={{ lg: '1px' }} borderBottomWidth={{ base: '1px', lg: 0 }} flexShrink={0}>
          <Button colorPalette="blue" mb="3">
            <LuPencil /> نامه‌ی جدید
          </Button>
          {folders.map((f) => (
            <HStack
              key={f.key}
              as="button"
              px="3"
              py="2"
              rounded="md"
              fontSize="sm"
              cursor="pointer"
              bg={folder === f.key ? 'blue.subtle' : undefined}
              color={folder === f.key ? 'blue.fg' : 'fg.muted'}
              _hover={{ bg: folder === f.key ? 'blue.subtle' : 'bg.muted' }}
              onClick={() => setFolder(f.key)}
            >
              {f.icon}
              <Text flex="1" textAlign="start">
                {f.label}
              </Text>
              {f.count && (
                <Badge size="sm" variant="solid" colorPalette={folder === f.key ? 'blue' : 'gray'} rounded="full">
                  {formatNumber(f.count)}
                </Badge>
              )}
            </HStack>
          ))}
          <Text fontSize="xs" fontWeight="semibold" color="fg.subtle" px="3" mt="5" mb="1">
            برچسب‌ها
          </Text>
          {labels.map((l) => (
            <HStack key={l.name} px="3" py="1.5" fontSize="sm" color="fg.muted">
              <Box boxSize="2.5" rounded="full" bg={`${l.color}.solid`} />
              {l.name}
            </HStack>
          ))}
        </Stack>

        <Stack w={{ base: 'full', lg: '96' }} gap="0" borderInlineEndWidth={{ lg: '1px' }} flexShrink={0}>
          <HStack p="3" borderBottomWidth="1px">
            <Checkbox.Root size="sm" aria-label="انتخاب همه">
              <Checkbox.HiddenInput />
              <Checkbox.Control />
            </Checkbox.Root>
            <InputGroup startElement={<LuSearch />} flex="1">
              <Input size="sm" placeholder="جستجو در نامه‌ها" />
            </InputGroup>
          </HStack>
          <Box overflowY="auto" maxH={{ lg: '70vh' }}>
            {mails.map((m) => (
              <HStack
                key={m.id}
                align="start"
                gap="3"
                p="3"
                borderBottomWidth="1px"
                cursor="pointer"
                bg={m.id === selectedId ? 'bg.muted' : m.unread ? 'bg.panel' : 'bg.subtle'}
                _hover={{ bg: 'bg.muted' }}
                onClick={() => setSelectedId(m.id)}
              >
                <Avatar.Root size="sm">
                  <Avatar.Fallback name={m.from} />
                </Avatar.Root>
                <Stack gap="0.5" flex="1" minW="0">
                  <HStack justify="space-between">
                    <Text fontSize="sm" fontWeight={m.unread ? 'bold' : 'medium'} truncate>
                      {m.from}
                    </Text>
                    <Text fontSize="xs" color="fg.muted" flexShrink={0}>
                      {m.time}
                    </Text>
                  </HStack>
                  <Text fontSize="sm" fontWeight={m.unread ? 'semibold' : 'normal'} truncate>
                    {m.subject}
                  </Text>
                  <Text fontSize="xs" color="fg.muted" lineClamp={1}>
                    {m.preview}
                  </Text>
                  <HStack mt="1" gap="1.5">
                    {m.label && (
                      <Badge size="xs" colorPalette={labelColor[m.label]}>
                        {m.label}
                      </Badge>
                    )}
                    {m.starred && <LuStar size="12" fill="var(--chakra-colors-yellow-400)" color="var(--chakra-colors-yellow-400)" />}
                  </HStack>
                </Stack>
              </HStack>
            ))}
          </Box>
        </Stack>

        <Stack flex="1" minW="0" p={{ base: '4', md: '6' }} gap="5" hideBelow="lg">
          <HStack justify="space-between" wrap="wrap" gap="2">
            <Heading size="lg">{selected.subject}</Heading>
            <HStack gap="1">
              {[
                { icon: <LuArchive />, l: 'بایگانی' },
                { icon: <LuStar />, l: 'ستاره' },
                { icon: <LuTrash2 />, l: 'حذف' },
              ].map((a) => (
                <Tooltip key={a.l} content={a.l}>
                  <IconButton variant="ghost" size="sm" aria-label={a.l}>
                    {a.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </HStack>
          </HStack>
          <HStack gap="3">
            <Avatar.Root>
              <Avatar.Fallback name={selected.from} />
            </Avatar.Root>
            <Box flex="1">
              <Text fontWeight="semibold">{selected.from}</Text>
              <Text fontSize="xs" color="fg.muted">
                به: من · {selected.time}
              </Text>
            </Box>
          </HStack>
          <Separator />
          <Stack gap="4" fontSize="sm" lineHeight="tall">
            <Text>سلام،</Text>
            <Text>{selected.preview}</Text>
            <Text>
              لطفاً اگر نکته‌ای درباره‌ی موارد بالا دارید تا پایان روز اطلاع دهید تا بتوانیم برنامه را نهایی کنیم. فایل‌های مرتبط هم پیوست شده است.
            </Text>
            <Text>با احترام،</Text>
            <Text fontWeight="medium">{selected.from}</Text>
          </Stack>
          <HStack gap="3" wrap="wrap">
            {['طرح-نهایی.fig', 'گزارش.pdf'].map((f) => (
              <HStack key={f} borderWidth="1px" rounded="md" px="3" py="2" fontSize="sm">
                <LuPaperclip /> <Text dir="ltr">{f}</Text>
              </HStack>
            ))}
          </HStack>
          <Box mt="auto" borderWidth="1px" rounded="lg" p="3">
            <Textarea variant="flushed" placeholder="پاسخ خود را بنویسید…" rows={3} border="none" />
            <HStack justify="space-between" mt="2">
              <IconButton variant="ghost" size="sm" aria-label="پیوست">
                <LuPaperclip />
              </IconButton>
              <HStack>
                <Button size="sm" variant="outline">
                  <LuForward /> ارسال به دیگری
                </Button>
                <Button size="sm" colorPalette="blue">
                  <LuReply /> پاسخ
                </Button>
              </HStack>
            </HStack>
          </Box>
        </Stack>
      </Flex>
    </Card.Root>
  )
}
