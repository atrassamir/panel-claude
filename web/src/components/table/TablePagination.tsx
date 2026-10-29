import { ButtonGroup, Flex, HStack, IconButton, NativeSelect, Pagination, Text } from '@chakra-ui/react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { formatNumber } from '@/lib/format'

type Props = {
  total: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  pageSizeOptions?: number[]
}

export function TablePagination({
  total,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
}: Props) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  return (
    <Flex justify="space-between" align="center" wrap="wrap" gap="3" mt="4">
      <HStack gap="3">
        <Text fontSize="sm" color="fg.muted">
          {formatNumber(from)} تا {formatNumber(to)} از {formatNumber(total)}
        </Text>
        {onPageSizeChange && (
          <NativeSelect.Root size="sm" width="24">
            <NativeSelect.Field
              aria-label="تعداد در هر صفحه"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.currentTarget.value))}
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {formatNumber(n)} ردیف
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        )}
      </HStack>

      <Pagination.Root
        count={total}
        pageSize={pageSize}
        page={page}
        onPageChange={(e) => onPageChange(e.page)}
        translations={{ itemLabel: ({ page }) => `صفحه ${formatNumber(page)}` }}
      >
        <ButtonGroup variant="ghost" size="sm">
          {/* RTL: "previous" sits on the right, so it points right. */}
          <Pagination.PrevTrigger asChild>
            <IconButton aria-label="صفحه قبل">
              <LuChevronRight />
            </IconButton>
          </Pagination.PrevTrigger>
          <Pagination.Items
            render={(item) => (
              <IconButton variant={{ base: 'ghost', _selected: 'outline' }}>{formatNumber(item.value)}</IconButton>
            )}
          />
          <Pagination.NextTrigger asChild>
            <IconButton aria-label="صفحه بعد">
              <LuChevronLeft />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Flex>
  )
}
