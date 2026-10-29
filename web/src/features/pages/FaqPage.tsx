import { Accordion, Box, Button, Card, Center, Heading, Input, InputGroup, SimpleGrid, Stack, Tabs, Text } from '@chakra-ui/react'
import { LuCreditCard, LuHeadphones, LuSearch, LuShield, LuUser } from 'react-icons/lu'

const groups = [
  {
    key: 'account',
    label: 'حساب کاربری',
    icon: <LuUser />,
    items: [
      { q: 'چطور حساب کاربری بسازم؟', a: 'از صفحه‌ی ورود روی «ثبت نام کنید» کلیک کنید و فرم را تکمیل کنید.' },
      { q: 'ایمیل حساب را چطور تغییر دهم؟', a: 'در بخش تنظیمات حساب، ایمیل جدید را وارد کرده و ذخیره کنید.' },
      { q: 'آیا می‌توانم حسابم را حذف کنم؟', a: 'بله، از تب امنیت در تنظیمات حساب، گزینه‌ی حذف حساب را انتخاب کنید.' },
    ],
  },
  {
    key: 'billing',
    label: 'پرداخت',
    icon: <LuCreditCard />,
    items: [
      { q: 'چه روش‌های پرداختی پشتیبانی می‌شود؟', a: 'پرداخت با همه‌ی کارت‌های عضو شتاب از طریق درگاه بانکی.' },
      { q: 'آیا فاکتور رسمی صادر می‌شود؟', a: 'بله، برای هر پرداخت فاکتور رسمی با مشخصات شرکت شما صادر می‌شود.' },
    ],
  },
  {
    key: 'security',
    label: 'امنیت',
    icon: <LuShield />,
    items: [
      { q: 'اطلاعات من کجا نگهداری می‌شود؟', a: 'تمام اطلاعات روی سرورهای داخل کشور با رمزنگاری نگهداری می‌شوند.' },
      { q: 'ورود دومرحله‌ای دارید؟', a: 'بله، از تنظیمات امنیت می‌توانید ورود دومرحله‌ای پیامکی را فعال کنید.' },
    ],
  },
]

export function FaqPage() {
  return (
    <Stack gap="8" maxW="4xl" mx="auto">
      <Stack align="center" textAlign="center" gap="4" py="6">
        <Heading size="3xl">چطور می‌توانیم کمک کنیم؟</Heading>
        <Text color="fg.muted">پاسخ رایج‌ترین سوالات را اینجا پیدا کنید.</Text>
        <InputGroup startElement={<LuSearch />} maxW="md" w="full">
          <Input size="lg" placeholder="جستجو در سوالات…" bg="bg.panel" />
        </InputGroup>
      </Stack>

      <Tabs.Root defaultValue="account" variant="enclosed" fitted>
        <Tabs.List>
          {groups.map((g) => (
            <Tabs.Trigger key={g.key} value={g.key}>
              {g.icon}
              {g.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {groups.map((g) => (
          <Tabs.Content key={g.key} value={g.key}>
            <Accordion.Root collapsible defaultValue={['0']} variant="enclosed">
              {g.items.map((item, i) => (
                <Accordion.Item key={item.q} value={String(i)}>
                  <Accordion.ItemTrigger>
                    <Text flex="1" fontWeight="medium">
                      {item.q}
                    </Text>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody color="fg.muted">{item.a}</Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </Tabs.Content>
        ))}
      </Tabs.Root>

      <Card.Root variant="subtle">
        <Card.Body>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="6" alignItems="center">
            <Stack direction="row" gap="4" align="center">
              <Center boxSize="12" rounded="full" bg="blue.solid" color="blue.contrast" flexShrink={0}>
                <LuHeadphones />
              </Center>
              <Box>
                <Text fontWeight="semibold">پاسخ سوالتان را پیدا نکردید؟</Text>
                <Text color="fg.muted" fontSize="sm">
                  تیم پشتیبانی در روزهای کاری پاسخگوی شماست.
                </Text>
              </Box>
            </Stack>
            <Button colorPalette="blue" justifySelf={{ md: 'end' }}>
              ارسال تیکت
            </Button>
          </SimpleGrid>
        </Card.Body>
      </Card.Root>
    </Stack>
  )
}
