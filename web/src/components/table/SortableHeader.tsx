import type { ReactNode } from 'react'
import { HStack, Table } from '@chakra-ui/react'
import { LuArrowDown, LuArrowUp, LuArrowUpDown } from 'react-icons/lu'
import type { SortState } from '@/lib/sort'

type Props<K extends string> = {
  sortKey: K
  sort: SortState<K>
  onSort: (sort: SortState<K>) => void
  children: ReactNode
  textAlign?: 'start' | 'end'
}

/** Column header that cycles: ascending → descending → unsorted. */
export function SortableHeader<K extends string>({ sortKey, sort, onSort, children, textAlign }: Props<K>) {
  const direction = sort?.key === sortKey ? sort.direction : null
  const next: SortState<K> =
    direction === null ? { key: sortKey, direction: 'asc' } : direction === 'asc' ? { key: sortKey, direction: 'desc' } : null

  return (
    <Table.ColumnHeader
      textAlign={textAlign}
      cursor="pointer"
      userSelect="none"
      onClick={() => onSort(next)}
      aria-sort={direction === 'asc' ? 'ascending' : direction === 'desc' ? 'descending' : 'none'}
    >
      <HStack gap="1" display="inline-flex" color={direction ? 'fg' : undefined}>
        {children}
        {direction === 'asc' ? <LuArrowUp /> : direction === 'desc' ? <LuArrowDown /> : <LuArrowUpDown opacity={0.4} />}
      </HStack>
    </Table.ColumnHeader>
  )
}
