export type Paginated<T> = {
  items: T[]
  total: number
}

export type ListParams = {
  page: number
  pageSize: number
  search?: string
}
