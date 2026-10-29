export type SortState<K extends string> = { key: K; direction: 'asc' | 'desc' } | null

export function sortRows<T, K extends keyof T & string>(rows: T[], sort: SortState<K>) {
  if (!sort) return rows
  const factor = sort.direction === 'asc' ? 1 : -1
  return [...rows].sort((a, b) => {
    const av = a[sort.key]
    const bv = b[sort.key]
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * factor
    return String(av).localeCompare(String(bv), 'fa') * factor
  })
}
