import { useState } from 'react'
import { Badge, Box, Button, Card, Heading, HStack, List, SegmentGroup, SimpleGrid, Stack, Table, Text } from '@chakra-ui/react'
import { LuCheck, LuMinus } from 'react-icons/lu'
import { PageHeader } from '@/components/PageHeader'
import { formatNumber } from '@/lib/format'

const plans = [
  { name: 'پایه', desc: 'برای شروع و پروژه‌های شخصی', monthly: 0, features: ['۱ کاربر', '۳ پروژه', '۱ گیگابایت فضا', 'پشتیبانی ایمیلی'] },
  { name: 'حرفه‌ای', desc: 'برای تیم‌های کوچک در حال رشد', monthly: 490, popular: true, features: ['تا ۲۰ کاربر', 'پروژه‌ی نامحدود', '۵۰ گیگابایت فضا', 'گزارش‌های پیشرفته', 'پشتیبانی تلفنی'] },
  { name: 'سازمانی', desc: 'برای سازمان‌ها با نیازهای ویژه', monthly: 1490, features: ['کاربر نامحدود', 'پروژه‌ی نامحدود', 'فضای نامحدود', 'ورود یکپارچه (SSO)', 'مدیر حساب اختصاصی'] },
]

const compare = [
  { f: 'تعداد کاربر', v: ['۱', '۲۰', 'نامحدود'] },
  { f: 'گزارش‌های پیشرفته', v: [false, true, true] },
  { f: 'دسترسی API', v: [false, true, true] },
  { f: 'ورود یکپارچه (SSO)', v: [false, false, true] },
  { f: 'تضمین دسترس‌پذیری', v: ['—', '۹۹٫۵٪', '۹۹٫۹٪'] },
]

export function PricingPage() {
  const [period, setPeriod] = useState<string | null>('monthly')
  const yearly = period === 'yearly'

  return (
    <>
      <PageHeader title="تعرفه‌ها" description="پلن مناسب تیم خود را انتخاب کنید" />
      <Stack align="center" mb="8" gap="3">
        <SegmentGroup.Root value={period} onValueChange={(e) => setPeriod(e.value)} size="md">
          <SegmentGroup.Indicator />
          <SegmentGroup.Items
            items={[
              { value: 'monthly', label: 'ماهانه' },
              { value: 'yearly', label: 'سالانه' },
            ]}
          />
        </SegmentGroup.Root>
        <Badge colorPalette="green" variant="subtle">
          پرداخت سالانه: ۲ ماه رایگان
        </Badge>
      </Stack>

      <SimpleGrid columns={{ base: 1, lg: 3 }} gap="6" maxW="6xl" mx="auto" mb="10">
        {plans.map((p) => {
          const price = yearly ? p.monthly * 10 : p.monthly
          return (
            <Card.Root
              key={p.name}
              variant={p.popular ? 'elevated' : 'outline'}
              borderColor={p.popular ? 'blue.solid' : undefined}
              borderWidth={p.popular ? '2px' : undefined}
              position="relative"
            >
              {p.popular && (
                <Badge position="absolute" top="-3" insetInlineStart="50%" transform="translateX(50%)" colorPalette="blue" variant="solid" px="3">
                  محبوب‌ترین
                </Badge>
              )}
              <Card.Body gap="6">
                <Stack gap="1">
                  <Heading size="lg">{p.name}</Heading>
                  <Text color="fg.muted" fontSize="sm">
                    {p.desc}
                  </Text>
                </Stack>
                <HStack align="baseline" gap="1">
                  <Text fontSize="4xl" fontWeight="bold">
                    {price === 0 ? 'رایگان' : formatNumber(price)}
                  </Text>
                  {price > 0 && (
                    <Text color="fg.muted" fontSize="sm">
                      هزار تومان / {yearly ? 'سال' : 'ماه'}
                    </Text>
                  )}
                </HStack>
                <Button colorPalette="blue" variant={p.popular ? 'solid' : 'outline'} w="full">
                  {price === 0 ? 'شروع رایگان' : 'انتخاب پلن'}
                </Button>
                <List.Root gap="3" variant="plain">
                  {p.features.map((f) => (
                    <List.Item key={f} fontSize="sm">
                      <List.Indicator asChild color="green.500">
                        <LuCheck />
                      </List.Indicator>
                      {f}
                    </List.Item>
                  ))}
                </List.Root>
              </Card.Body>
            </Card.Root>
          )
        })}
      </SimpleGrid>

      <Card.Root maxW="6xl" mx="auto">
        <Card.Header>
          <Card.Title>مقایسه‌ی امکانات</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table.ScrollArea>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>امکان</Table.ColumnHeader>
                  {plans.map((p) => (
                    <Table.ColumnHeader key={p.name} textAlign="center">
                      {p.name}
                    </Table.ColumnHeader>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {compare.map((row) => (
                  <Table.Row key={row.f}>
                    <Table.Cell>{row.f}</Table.Cell>
                    {row.v.map((v, i) => (
                      <Table.Cell key={i} textAlign="center">
                        <Box display="inline-flex" color={v === true ? 'green.500' : v === false ? 'fg.subtle' : undefined}>
                          {v === true ? <LuCheck /> : v === false ? <LuMinus /> : v}
                        </Box>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
        </Card.Body>
      </Card.Root>
    </>
  )
}
