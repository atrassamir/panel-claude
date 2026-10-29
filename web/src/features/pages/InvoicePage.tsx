import { Badge, Box, Button, Card, Flex, Heading, HStack, Separator, SimpleGrid, Stack, Table, Text } from '@chakra-ui/react'
import { LuDownload, LuSend } from 'react-icons/lu'
import { Logo } from '@/components/Logo'
import { PageHeader } from '@/components/PageHeader'
import { formatNumber, formatPrice } from '@/lib/format'

const items = [
  { title: 'طراحی رابط کاربری داشبورد', qty: 1, price: 18_000_000 },
  { title: 'پیاده‌سازی صفحات با React', qty: 12, price: 1_500_000 },
  { title: 'سیستم طراحی و کتابخانه‌ی کامپوننت', qty: 1, price: 9_500_000 },
  { title: 'پشتیبانی ماهانه', qty: 3, price: 2_000_000 },
]

export function InvoicePage() {
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0)
  const tax = Math.round(subtotal * 0.1)

  return (
    <>
      <PageHeader
        title="فاکتور"
        description="نمونه‌ی فاکتور فروش"
        actions={
          <HStack>
            <Button variant="outline" size="sm">
              <LuDownload /> دانلود PDF
            </Button>
            <Button colorPalette="blue" size="sm">
              <LuSend /> ارسال برای مشتری
            </Button>
          </HStack>
        }
      />
      <Card.Root maxW="4xl" mx="auto">
        <Card.Body p={{ base: '5', md: '10' }}>
          <Stack gap="8">
            <Flex justify="space-between" wrap="wrap" gap="6">
              <Stack gap="3">
                <Logo />
                <Text fontSize="sm" color="fg.muted">
                  تهران، خیابان ولیعصر، پلاک ۱۲۳
                  <br />
                  تلفن: ۰۲۱-۸۸۷۷۶۶۵۵
                </Text>
              </Stack>
              <Stack gap="1" textAlign="end">
                <Heading size="2xl">فاکتور</Heading>
                <Text color="fg.muted" fontSize="sm" dir="ltr">
                  INV-2026-0142
                </Text>
                <Badge colorPalette="orange" alignSelf="flex-end">
                  در انتظار پرداخت
                </Badge>
              </Stack>
            </Flex>

            <SimpleGrid columns={{ base: 1, sm: 3 }} gap="6" fontSize="sm">
              <Stack gap="1">
                <Text color="fg.muted" fontSize="xs">
                  صورت‌حساب برای
                </Text>
                <Text fontWeight="semibold">شرکت نوآوران پارس</Text>
                <Text color="fg.muted">اصفهان، خیابان چهارباغ</Text>
              </Stack>
              <Stack gap="1">
                <Text color="fg.muted" fontSize="xs">
                  تاریخ صدور
                </Text>
                <Text fontWeight="semibold">۷ آبان ۱۴۰۵</Text>
              </Stack>
              <Stack gap="1">
                <Text color="fg.muted" fontSize="xs">
                  مهلت پرداخت
                </Text>
                <Text fontWeight="semibold">۲۱ آبان ۱۴۰۵</Text>
              </Stack>
            </SimpleGrid>

            <Table.ScrollArea>
              <Table.Root>
                <Table.Header>
                  <Table.Row bg="bg.subtle">
                    <Table.ColumnHeader>#</Table.ColumnHeader>
                    <Table.ColumnHeader>شرح</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="center">تعداد</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">قیمت واحد</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">جمع</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {items.map((it, i) => (
                    <Table.Row key={it.title}>
                      <Table.Cell>{formatNumber(i + 1)}</Table.Cell>
                      <Table.Cell>{it.title}</Table.Cell>
                      <Table.Cell textAlign="center">{formatNumber(it.qty)}</Table.Cell>
                      <Table.Cell textAlign="end">{formatPrice(it.price)}</Table.Cell>
                      <Table.Cell textAlign="end">{formatPrice(it.qty * it.price)}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Table.ScrollArea>

            <Flex justify="flex-end">
              <Stack gap="2" w={{ base: 'full', sm: '80' }} fontSize="sm">
                <HStack justify="space-between">
                  <Text color="fg.muted">جمع کل</Text>
                  <Text>{formatPrice(subtotal)}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="fg.muted">مالیات بر ارزش افزوده (۱۰٪)</Text>
                  <Text>{formatPrice(tax)}</Text>
                </HStack>
                <Separator />
                <HStack justify="space-between" fontSize="lg" fontWeight="bold">
                  <Text>مبلغ قابل پرداخت</Text>
                  <Text color="blue.fg">{formatPrice(subtotal + tax)}</Text>
                </HStack>
              </Stack>
            </Flex>

            <Box p="4" rounded="md" bg="bg.subtle" fontSize="sm" color="fg.muted">
              لطفاً مبلغ را به شماره شبای IR12 0120 0000 0001 2345 6789 01 واریز کنید و رسید را ارسال نمایید. با تشکر از همکاری شما.
            </Box>
          </Stack>
        </Card.Body>
      </Card.Root>
    </>
  )
}
