import { Badge, Card, Heading, SimpleGrid, Stat, Table } from '@chakra-ui/react'
import { LuCircleDollarSign, LuClock, LuShoppingCart, LuUsers } from 'react-icons/lu'
import { PageHeader } from '@/components/PageHeader'
import { orderStatusMeta, sampleOrders } from '@/data/orders'
import { sampleUsers } from '@/data/users'
import { useAuthStore } from '@/stores/auth'
import { formatDate, formatNumber, formatPrice } from '@/lib/format'

export function DashboardPage() {
  const user = useAuthStore((s) => s.user)
  const revenue = sampleOrders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + o.amount, 0)

  const stats = [
    { label: 'کاربران', value: formatNumber(sampleUsers.length), icon: <LuUsers /> },
    { label: 'سفارش‌ها', value: formatNumber(sampleOrders.length), icon: <LuShoppingCart /> },
    { label: 'درآمد', value: formatPrice(revenue), icon: <LuCircleDollarSign /> },
    {
      label: 'در حال پردازش',
      value: formatNumber(sampleOrders.filter((o) => o.status === 'processing').length),
      icon: <LuClock />,
    },
  ]

  return (
    <>
      <PageHeader title="داشبورد" description={`خوش آمدید${user ? `، ${user.name}` : ''}`} />
      <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} gap="4" mb="6">
        {stats.map((s) => (
          <Card.Root key={s.label}>
            <Card.Body>
              <Stat.Root>
                <Stat.Label>
                  {s.icon} {s.label}
                </Stat.Label>
                <Stat.ValueText fontSize="xl">{s.value}</Stat.ValueText>
              </Stat.Root>
            </Card.Body>
          </Card.Root>
        ))}
      </SimpleGrid>

      <Card.Root>
        <Card.Header>
          <Heading size="md">آخرین سفارش‌ها</Heading>
        </Card.Header>
        <Card.Body>
          <Table.ScrollArea>
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>کد</Table.ColumnHeader>
                  <Table.ColumnHeader>مشتری</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end">مبلغ</Table.ColumnHeader>
                  <Table.ColumnHeader>وضعیت</Table.ColumnHeader>
                  <Table.ColumnHeader>تاریخ</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {sampleOrders.slice(0, 6).map((o) => (
                  <Table.Row key={o.id}>
                    <Table.Cell fontFamily="mono" fontSize="xs">
                      {o.code}
                    </Table.Cell>
                    <Table.Cell>{o.customer}</Table.Cell>
                    <Table.Cell textAlign="end">{formatPrice(o.amount)}</Table.Cell>
                    <Table.Cell>
                      <Badge colorPalette={orderStatusMeta[o.status].color}>{orderStatusMeta[o.status].label}</Badge>
                    </Table.Cell>
                    <Table.Cell>{formatDate(o.date)}</Table.Cell>
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
