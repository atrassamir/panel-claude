import type { ListParams, Paginated } from '@/lib/types'
import type { User, UserInput } from '@/features/users/types'
import { delay } from './delay'

const firstNames = ['علی', 'مریم', 'رضا', 'سارا', 'محمد', 'زهرا', 'حسین', 'نگار', 'امیر', 'فاطمه']
const lastNames = ['احمدی', 'رضایی', 'محمدی', 'کریمی', 'حسینی', 'موسوی', 'جعفری', 'صادقی']
const roles: User['role'][] = ['admin', 'editor', 'viewer']

let users: User[] = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
  email: `user${i + 1}@example.com`,
  role: roles[i % roles.length],
  active: i % 5 !== 0,
  createdAt: new Date(Date.now() - i * 86_400_000 * 3).toISOString(),
}))
let nextId = users.length + 1

export const usersMock = {
  async list({ page, pageSize, search }: ListParams): Promise<Paginated<User>> {
    await delay()
    const q = search?.trim().toLowerCase()
    const filtered = q
      ? users.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      : users
    const start = (page - 1) * pageSize
    return { items: filtered.slice(start, start + pageSize), total: filtered.length }
  },

  async create(input: UserInput): Promise<User> {
    await delay()
    const user: User = { ...input, id: nextId++, createdAt: new Date().toISOString() }
    users = [user, ...users]
    return user
  },

  async update(id: number, input: UserInput): Promise<User> {
    await delay()
    const existing = users.find((u) => u.id === id)
    if (!existing) throw new Error('کاربر پیدا نشد')
    const updated = { ...existing, ...input }
    users = users.map((u) => (u.id === id ? updated : u))
    return updated
  },

  async remove(id: number): Promise<void> {
    await delay()
    users = users.filter((u) => u.id !== id)
  },

  async stats() {
    await delay()
    return {
      total: users.length,
      active: users.filter((u) => u.active).length,
      admins: users.filter((u) => u.role === 'admin').length,
      recent: users.slice(0, 5),
    }
  },
}
