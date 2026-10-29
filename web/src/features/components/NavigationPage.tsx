import { useState } from 'react'
import {
  Accordion,
  Box,
  Breadcrumb,
  Button,
  ButtonGroup,
  Collapsible,
  IconButton,
  Pagination,
  SegmentGroup,
  SimpleGrid,
  Stack,
  Steps,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { LuChevronLeft, LuChevronRight, LuFolder, LuHouse, LuSettings, LuSlash, LuUser, LuUsers } from 'react-icons/lu'
import { PageHeader } from '@/components/PageHeader'
import { DemoRow, DemoSection } from '@/components/Showcase'

const tabItems = [
  { value: 'members', label: 'اعضا', icon: <LuUser />, text: 'فهرست اعضای تیم و نقش هر کدام.' },
  { value: 'projects', label: 'پروژه‌ها', icon: <LuFolder />, text: 'پروژه‌های فعال و آرشیو شده.' },
  { value: 'settings', label: 'تنظیمات', icon: <LuSettings />, text: 'تنظیمات عمومی تیم.' },
]

const faq = [
  { q: 'چطور رمز عبور را تغییر دهم؟', a: 'از منوی کاربر وارد «تنظیمات حساب» شوید و در بخش امنیت رمز جدید را وارد کنید.' },
  { q: 'آیا می‌توانم چند کاربر اضافه کنم؟', a: 'بله، در پلن حرفه‌ای تا ۲۰ کاربر و در پلن سازمانی بدون محدودیت.' },
  { q: 'پشتیبانی چگونه است؟', a: 'پشتیبانی از طریق تیکت و ایمیل در روزهای کاری پاسخ داده می‌شود.' },
]

const steps = [
  { title: 'سبد خرید', description: 'بررسی اقلام' },
  { title: 'ارسال', description: 'آدرس و زمان' },
  { title: 'پرداخت', description: 'درگاه بانکی' },
  { title: 'تأیید', description: 'رسید نهایی' },
]

function TabsDemo({ variant }: { variant: Tabs.RootProps['variant'] }) {
  return (
    <Tabs.Root defaultValue="members" variant={variant}>
      <Tabs.List>
        {tabItems.map((t) => (
          <Tabs.Trigger key={t.value} value={t.value}>
            {t.icon}
            {t.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabItems.map((t) => (
        <Tabs.Content key={t.value} value={t.value}>
          <Text color="fg.muted" fontSize="sm">
            {t.text}
          </Text>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}

export function NavigationPage() {
  const [page, setPage] = useState(3)
  const [view, setView] = useState<string | null>('list')

  return (
    <>
      <PageHeader title="ناوبری" description="Tabs، Accordion، Breadcrumb، Steps، Pagination و Collapsible" />
      <Stack gap="6">
        <DemoSection title="تب‌ها (Tabs)">
          {(['line', 'subtle', 'enclosed', 'outline', 'plain'] as const).map((v) => (
            <Stack key={v} gap="2">
              <Text fontSize="xs" color="fg.muted">
                {v}
              </Text>
              <TabsDemo variant={v} />
            </Stack>
          ))}
          <Stack gap="2">
            <Text fontSize="xs" color="fg.muted">
              عمودی
            </Text>
            <Tabs.Root defaultValue="members" orientation="vertical" variant="subtle">
              <Tabs.List>
                {tabItems.map((t) => (
                  <Tabs.Trigger key={t.value} value={t.value}>
                    {t.icon}
                    {t.label}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
              {tabItems.map((t) => (
                <Tabs.Content key={t.value} value={t.value} px="4">
                  <Text color="fg.muted" fontSize="sm">
                    {t.text}
                  </Text>
                </Tabs.Content>
              ))}
            </Tabs.Root>
          </Stack>
        </DemoSection>

        <DemoSection title="آکاردئون (Accordion)">
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
            {(['outline', 'subtle', 'enclosed', 'plain'] as const).map((v) => (
              <Stack key={v} gap="2">
                <Text fontSize="xs" color="fg.muted">
                  {v}
                </Text>
                <Accordion.Root collapsible defaultValue={['0']} variant={v}>
                  {faq.map((f, i) => (
                    <Accordion.Item key={f.q} value={String(i)}>
                      <Accordion.ItemTrigger>
                        <Text flex="1" fontSize="sm">
                          {f.q}
                        </Text>
                        <Accordion.ItemIndicator />
                      </Accordion.ItemTrigger>
                      <Accordion.ItemContent>
                        <Accordion.ItemBody fontSize="sm" color="fg.muted">
                          {f.a}
                        </Accordion.ItemBody>
                      </Accordion.ItemContent>
                    </Accordion.Item>
                  ))}
                </Accordion.Root>
              </Stack>
            ))}
          </SimpleGrid>
        </DemoSection>

        <DemoSection title="مسیر صفحه (Breadcrumb)">
          {(['plain', 'underline'] as const).map((variant) => (
            <Breadcrumb.Root key={variant} variant={variant}>
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">
                    <LuHouse /> خانه
                  </Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">
                    <LuUsers /> کاربران
                  </Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.CurrentLink>ویرایش</Breadcrumb.CurrentLink>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          ))}
          <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="#">خانه</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator>
                <LuSlash />
              </Breadcrumb.Separator>
              <Breadcrumb.Item>
                <Breadcrumb.Ellipsis />
              </Breadcrumb.Item>
              <Breadcrumb.Separator>
                <LuSlash />
              </Breadcrumb.Separator>
              <Breadcrumb.Item>
                <Breadcrumb.CurrentLink>جزئیات سفارش</Breadcrumb.CurrentLink>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </DemoSection>

        <DemoSection title="مراحل (Steps)">
          {(['solid', 'subtle'] as const).map((variant) => (
            <Box key={variant} overflowX="auto" pb="2">
            <Steps.Root defaultStep={2} count={steps.length} variant={variant} colorPalette="blue" minW="xl">
              <Steps.List>
                {steps.map((s, i) => (
                  <Steps.Item key={s.title} index={i}>
                    <Steps.Indicator />
                    <Box>
                      <Steps.Title>{s.title}</Steps.Title>
                      <Steps.Description>{s.description}</Steps.Description>
                    </Box>
                    <Steps.Separator />
                  </Steps.Item>
                ))}
              </Steps.List>
            </Steps.Root>
            </Box>
          ))}
          <Steps.Root defaultStep={1} count={3} orientation="vertical" colorPalette="green" size="sm" h="56">
            <Steps.List>
              {['ثبت سفارش', 'آماده‌سازی', 'تحویل به پست'].map((t, i) => (
                <Steps.Item key={t} index={i}>
                  <Steps.Indicator />
                  <Steps.Title>{t}</Steps.Title>
                  <Steps.Separator />
                </Steps.Item>
              ))}
            </Steps.List>
          </Steps.Root>
        </DemoSection>

        <DemoSection title="صفحه‌بندی و انتخاب حالت">
          <DemoRow label="Pagination">
            {(['ghost', 'outline', 'subtle'] as const).map((variant) => (
              <Box key={variant} maxW="full" overflowX="auto">
              <Pagination.Root
                count={120}
                pageSize={10}
                page={page}
                onPageChange={(e) => setPage(e.page)}
                siblingCount={1}
              >
                <ButtonGroup variant={variant} size="sm">
                  <Pagination.PrevTrigger asChild>
                    <IconButton aria-label="قبلی">
                      <LuChevronRight />
                    </IconButton>
                  </Pagination.PrevTrigger>
                  <Pagination.Items
                    render={(p) => <IconButton variant={{ base: variant, _selected: 'solid' }}>{p.value}</IconButton>}
                  />
                  <Pagination.NextTrigger asChild>
                    <IconButton aria-label="بعدی">
                      <LuChevronLeft />
                    </IconButton>
                  </Pagination.NextTrigger>
                </ButtonGroup>
              </Pagination.Root>
              </Box>
            ))}
          </DemoRow>
          <DemoRow label="SegmentGroup">
            <SegmentGroup.Root value={view} onValueChange={(e) => setView(e.value)}>
              <SegmentGroup.Indicator />
              <SegmentGroup.Items
                items={[
                  { value: 'list', label: 'لیست' },
                  { value: 'grid', label: 'شبکه' },
                  { value: 'board', label: 'برد' },
                ]}
              />
            </SegmentGroup.Root>
          </DemoRow>
        </DemoSection>

        <DemoSection title="بخش جمع‌شونده (Collapsible)">
          <Collapsible.Root>
            <Collapsible.Trigger asChild>
              <Button variant="outline" size="sm">
                نمایش جزئیات بیشتر
              </Button>
            </Collapsible.Trigger>
            <Collapsible.Content>
              <Box mt="3" p="4" borderWidth="1px" rounded="md" fontSize="sm" color="fg.muted">
                این محتوا به‌صورت پیش‌فرض پنهان است و با کلیک روی دکمه باز و بسته می‌شود.
              </Box>
            </Collapsible.Content>
          </Collapsible.Root>
        </DemoSection>
      </Stack>
    </>
  )
}
