import { Card, Grid, GridItem, HStack, Progress, SimpleGrid, Stack, Table, Text } from '@chakra-ui/react'
import { LuClock, LuEye, LuMousePointerClick, LuUsers } from 'react-icons/lu'
import { PageHeader } from '@/components/PageHeader'
import { StatCard } from '@/components/StatCard'
import { CategoryBarList, ProfitAreaChart, TrafficDonut, VisitsBarChart } from '@/components/charts/DemoCharts'
import { formatNumber } from '@/lib/format'

const topPages = [
  { path: '/products', views: 12840, rate: 42 },
  { path: '/blog/design-tips', views: 9210, rate: 38 },
  { path: '/pricing', views: 7330, rate: 55 },
  { path: '/about', views: 4120, rate: 61 },
  { path: '/contact', views: 2980, rate: 47 },
]

const devices = [
  { name: 'موبایل', value: 64, color: 'purple' },
  { name: 'دسکتاپ', value: 29, color: 'blue' },
  { name: 'تبلت', value: 7, color: 'teal' },
]

export function AnalyticsPage() {
  return (
    <>
      <PageHeader title="داشبورد تحلیلی" description="آمار بازدید و رفتار کاربران در ۳۰ روز گذشته" />
      <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} gap="4" mb="6">
        <StatCard label="بازدید صفحه" value="۸۴٬۲۱۰" icon={<LuEye />} color="blue" change="۱۲٪" />
        <StatCard label="کاربران یکتا" value="۲۱٬۴۸۰" icon={<LuUsers />} color="purple" change="۸٪" />
        <StatCard label="نرخ کلیک" value="۴٫۸٪" icon={<LuMousePointerClick />} color="teal" change="۰٫۴٪" up={false} />
        <StatCard label="میانگین زمان" value="۳:۴۲" icon={<LuClock />} color="orange" change="۲۱ ثانیه" />
      </SimpleGrid>

      <Grid templateColumns={{ base: 'minmax(0, 1fr)', xl: 'minmax(0, 2fr) minmax(0, 1fr)' }} gap="6" mb="6">
        <Card.Root>
          <Card.Header>
            <Card.Title>روند سود</Card.Title>
            <Card.Description>میلیون تومان در ۱۲ ماه گذشته</Card.Description>
          </Card.Header>
          <Card.Body>
            <ProfitAreaChart />
          </Card.Body>
        </Card.Root>
        <Card.Root>
          <Card.Header>
            <Card.Title>منابع ورودی</Card.Title>
          </Card.Header>
          <Card.Body>
            <TrafficDonut />
          </Card.Body>
        </Card.Root>
      </Grid>

      <Grid templateColumns={{ base: 'minmax(0, 1fr)', xl: 'repeat(3, minmax(0, 1fr))' }} gap="6">
        <GridItem colSpan={{ base: 1, xl: 2 }}>
          <Card.Root h="full">
            <Card.Header>
              <Card.Title>بازدید هفتگی</Card.Title>
            </Card.Header>
            <Card.Body>
              <VisitsBarChart />
            </Card.Body>
          </Card.Root>
        </GridItem>
        <Card.Root>
          <Card.Header>
            <Card.Title>دستگاه کاربران</Card.Title>
          </Card.Header>
          <Card.Body>
            <Stack gap="5">
              {devices.map((d) => (
                <Progress.Root key={d.name} value={d.value} colorPalette={d.color} size="sm">
                  <HStack justify="space-between" mb="1.5">
                    <Progress.Label>{d.name}</Progress.Label>
                    <Text fontSize="sm" fontWeight="medium">
                      {formatNumber(d.value)}٪
                    </Text>
                  </HStack>
                  <Progress.Track>
                    <Progress.Range />
                  </Progress.Track>
                </Progress.Root>
              ))}
            </Stack>
          </Card.Body>
        </Card.Root>
        <GridItem colSpan={{ base: 1, xl: 2 }}>
          <Card.Root>
            <Card.Header>
              <Card.Title>پربازدیدترین صفحه‌ها</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table.ScrollArea>
                <Table.Root size="sm">
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader>آدرس</Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="end">بازدید</Table.ColumnHeader>
                      <Table.ColumnHeader>نرخ خروج</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {topPages.map((p) => (
                      <Table.Row key={p.path}>
                        <Table.Cell dir="ltr" textAlign="end" fontFamily="mono" fontSize="xs">
                          {p.path}
                        </Table.Cell>
                        <Table.Cell textAlign="end">{formatNumber(p.views)}</Table.Cell>
                        <Table.Cell minW="40">
                          <HStack>
                            <Progress.Root value={p.rate} size="xs" flex="1" colorPalette={p.rate > 50 ? 'orange' : 'green'}>
                              <Progress.Track>
                                <Progress.Range />
                              </Progress.Track>
                            </Progress.Root>
                            <Text fontSize="xs" w="8">
                              {formatNumber(p.rate)}٪
                            </Text>
                          </HStack>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Table.ScrollArea>
            </Card.Body>
          </Card.Root>
        </GridItem>
        <Card.Root>
          <Card.Header>
            <Card.Title>فروش هر دسته</Card.Title>
          </Card.Header>
          <Card.Body>
            <CategoryBarList />
          </Card.Body>
        </Card.Root>
      </Grid>
    </>
  )
}
