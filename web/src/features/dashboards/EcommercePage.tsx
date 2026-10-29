import { Avatar, Badge, Box, Button, Card, Center, Grid, HStack, Progress, SimpleGrid, Stack, Table, Text } from '@chakra-ui/react'
import { LuBox, LuChevronLeft, LuDollarSign, LuShoppingCart, LuStar, LuUsers } from 'react-icons/lu'
import { PageHeader } from '@/components/PageHeader'
import { StatCard } from '@/components/StatCard'
import { SalesLineChart } from '@/components/charts/DemoCharts'
import { orderStatusMeta, sampleOrders } from '@/data/orders'
import { sampleProducts } from '@/data/products'
import { formatNumber, formatPrice } from '@/lib/format'

const productColors = ['blue', 'purple', 'teal', 'orange', 'pink', 'green']

export function EcommercePage() {
  return (
    <>
      <PageHeader
        title="داشبورد فروشگاه"
        description="عملکرد فروش، سفارش‌ها و محصولات"
        actions={
          <Button colorPalette="blue" size="sm">
            گزارش کامل
          </Button>
        }
      />
      <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} gap="4" mb="6">
        <StatCard label="فروش امروز" value="۱۸٫۴ م" icon={<LuDollarSign />} color="green" change="۱۵٪" help="نسبت به دیروز" />
        <StatCard label="سفارش‌ها" value="۳۲۸" icon={<LuShoppingCart />} color="blue" change="۴٪" help="نسبت به دیروز" />
        <StatCard label="مشتریان جدید" value="۴۶" icon={<LuUsers />} color="purple" change="۳٪" up={false} help="نسبت به دیروز" />
        <StatCard label="محصولات فعال" value="۱٬۲۰۴" icon={<LuBox />} color="orange" />
      </SimpleGrid>

      <Grid templateColumns={{ base: 'minmax(0, 1fr)', xl: 'minmax(0, 2fr) minmax(0, 1fr)' }} gap="6" mb="6">
        <Card.Root>
          <Card.Header>
            <Card.Title>فروش و هزینه</Card.Title>
          </Card.Header>
          <Card.Body>
            <SalesLineChart />
          </Card.Body>
        </Card.Root>
        <Card.Root>
          <Card.Header>
            <Card.Title>هدف فروش ماهانه</Card.Title>
          </Card.Header>
          <Card.Body>
            <Stack gap="5">
              <Box>
                <Text fontSize="3xl" fontWeight="bold">
                  ۷۲٪
                </Text>
                <Text color="fg.muted" fontSize="sm">
                  ۳۶۰ از ۵۰۰ میلیون تومان
                </Text>
              </Box>
              <Progress.Root value={72} size="lg" colorPalette="green" striped>
                <Progress.Track>
                  <Progress.Range />
                </Progress.Track>
              </Progress.Root>
              {[
                { t: 'فروش آنلاین', v: 82, c: 'blue' },
                { t: 'فروش حضوری', v: 54, c: 'purple' },
                { t: 'عمده‌فروشی', v: 38, c: 'orange' },
              ].map((g) => (
                <Progress.Root key={g.t} value={g.v} size="xs" colorPalette={g.c}>
                  <HStack justify="space-between" mb="1">
                    <Progress.Label fontSize="sm">{g.t}</Progress.Label>
                    <Text fontSize="xs">{formatNumber(g.v)}٪</Text>
                  </HStack>
                  <Progress.Track>
                    <Progress.Range />
                  </Progress.Track>
                </Progress.Root>
              ))}
            </Stack>
          </Card.Body>
        </Card.Root>
      </Grid>

      <Grid templateColumns={{ base: 'minmax(0, 1fr)', xl: 'minmax(0, 2fr) minmax(0, 1fr)' }} gap="6">
        <Card.Root>
          <Card.Header>
            <HStack justify="space-between">
              <Card.Title>آخرین سفارش‌ها</Card.Title>
              <Button size="xs" variant="ghost">
                همه <LuChevronLeft />
              </Button>
            </HStack>
          </Card.Header>
          <Card.Body>
            <Table.ScrollArea>
              <Table.Root size="sm" interactive>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>مشتری</Table.ColumnHeader>
                    <Table.ColumnHeader>شهر</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">مبلغ</Table.ColumnHeader>
                    <Table.ColumnHeader>وضعیت</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {sampleOrders.slice(0, 7).map((o) => (
                    <Table.Row key={o.id}>
                      <Table.Cell>
                        <HStack>
                          <Avatar.Root size="xs">
                            <Avatar.Fallback name={o.customer} />
                          </Avatar.Root>
                          {o.customer}
                        </HStack>
                      </Table.Cell>
                      <Table.Cell>{o.city}</Table.Cell>
                      <Table.Cell textAlign="end">{formatPrice(o.amount)}</Table.Cell>
                      <Table.Cell>
                        <Badge colorPalette={orderStatusMeta[o.status].color}>{orderStatusMeta[o.status].label}</Badge>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Table.ScrollArea>
          </Card.Body>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Title>محصولات پرفروش</Card.Title>
          </Card.Header>
          <Card.Body>
            <Stack gap="4">
              {sampleProducts.slice(0, 5).map((p, i) => (
                <HStack key={p.id} gap="3">
                  <Center boxSize="11" rounded="lg" bg={`${productColors[i]}.subtle`} color={`${productColors[i]}.fg`} flexShrink={0}>
                    <LuBox />
                  </Center>
                  <Stack gap="0" flex="1" minW="0">
                    <Text fontWeight="medium" truncate>
                      {p.name}
                    </Text>
                    <HStack gap="1" fontSize="xs" color="fg.muted">
                      <LuStar fill="currentColor" color="var(--chakra-colors-yellow-400)" />
                      {formatNumber(4.2 + i / 10)} · {formatNumber(120 - i * 17)} فروش
                    </HStack>
                  </Stack>
                  <Text fontSize="sm" fontWeight="semibold" whiteSpace="nowrap">
                    {formatPrice(p.price)}
                  </Text>
                </HStack>
              ))}
            </Stack>
          </Card.Body>
        </Card.Root>
      </Grid>
    </>
  )
}
