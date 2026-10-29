import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ListParams } from '@/lib/types'
import { usersMock } from '@/mocks/users'
import type { UserInput } from './types'

const keys = {
  all: ['users'] as const,
  list: (params: ListParams) => [...keys.all, 'list', params] as const,
  stats: () => [...keys.all, 'stats'] as const,
}

export const useUsers = (params: ListParams) =>
  useQuery({ queryKey: keys.list(params), queryFn: () => usersMock.list(params), placeholderData: keepPreviousData })

export const useUserStats = () => useQuery({ queryKey: keys.stats(), queryFn: usersMock.stats })

export function useSaveUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id?: number; input: UserInput }) =>
      id ? usersMock.update(id, input) : usersMock.create(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  })
}

export function useDeleteUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: usersMock.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  })
}
