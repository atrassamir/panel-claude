import { useMemo, useState } from 'react'
import { Badge, Card, EmptyState, Flex, Input, InputGroup, NativeSelect, Table } from '@chakra-ui/react'
import { LuSearch, LuSearchX } from 'react-icons/lu'
import { PageHeader } from '@/components/PageHeader'
import { SortableHeader } from '@/components/table/SortableHeader'
import { sortRows, type SortState } from '@/lib/sort'
import { TablePagination } from '@/components/table/TablePagination'
import { orderStatusMeta, sampleOrders, type Order, type OrderStatus } from '@/data/orders'
import { formatDate, formatPrice } from '@/lib/format'

type SortKey = 'code' | 'customer' | 'city' | 'amount' | 'date'

export function DataTablePage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<OrderStatus | ''>('')
  const [sort, setSort] = useState<SortState<SortKey>>({ key: 'date', direction: 'desc' })
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase()
    const filtered = sampleOrders.filter(
      (o) =>
        (!status || o.status === status) &&
        (!q || o.code.toLowerCase().includes(q) || o.customer.includes(q) || o.city.includes(q)),
    )
    return sortRows<Order, SortKey>(filtered, sort)
  }, [search, status, sort])

  const pageRows = rows.slice((page - 1) * pageSize, page * pageSize)

  // Any filter change should start from the first page.
  const resetPage = <T,>(set: (v: T) => void) => (v: T) => {
    set(v)
    setPage(1)
  }

  const header = (key: SortKey, label: string, textAlign?: 'end') => (
    <SortableHeader sortKey={key} sort={sort} onSort={resetPage(setSort)} textAlign={textAlign}>
      {label}
    </SortableHeader>
  )

  return (
    <>
      <PageHeader title="جدول داده" description="جستجو، فیلتر، مرتب‌سازی و صفحه‌بندی" />
      <Card.Root>
        <Card.Body>
          <Flex gap="3" mb="4" wrap="wrap">
            <InputGroup startElement={<LuSearch />} maxW="xs">
              <Input
                placeholder="جستجوی کد، مشتری یا شهر"
                value={search}
                onChange={(e) => resetPage(setSearch)(e.currentTarget.value)}
              />
            </InputGroup>
            <NativeSelect.Root maxW="48">
              <NativeSelect.Field
                aria-label="فیلتر وضعیت"
                value={status}
                onChange={(e) => resetPage(setStatus)(e.currentTarget.value as OrderStatus | '')}
              >
                <option value="">همه وضعیت‌ها</option>
                {Object.entries(orderStatusMeta).map(([value, meta]) => (
                  <option key={value} value={value}>
                    {meta.label}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Flex>

          <Table.ScrollArea borderWidth="1px" rounded="md">
            <Table.Root stickyHeader interactive>
              <Table.Header>
                <Table.Row bg="bg.subtle">
                  {header('code', 'کد سفارش')}
                  {header('customer', 'مشتری')}
                  {header('city', 'شهر')}
                  {header('amount', 'مبلغ', 'end')}
                  <Table.ColumnHeader>وضعیت</Table.ColumnHeader>
                  {header('date', 'تاریخ')}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {pageRows.map((o) => (
                  <Table.Row key={o.id}>
                    <Table.Cell dir="ltr" textAlign="end" fontFamily="mono" fontSize="xs">
                      {o.code}
                    </Table.Cell>
                    <Table.Cell>{o.customer}</Table.Cell>
                    <Table.Cell>{o.city}</Table.Cell>
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

          {rows.length === 0 && (
            <EmptyState.Root size="sm">
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <LuSearchX />
                </EmptyState.Indicator>
                <EmptyState.Title>نتیجه‌ای پیدا نشد</EmptyState.Title>
              </EmptyState.Content>
            </EmptyState.Root>
          )}

          <TablePagination
            total={rows.length}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={resetPage(setPageSize)}
          />
        </Card.Body>
      </Card.Root>
    </>
  )
}
