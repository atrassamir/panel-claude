export type UserRole = 'admin' | 'editor' | 'viewer'
export type UserStatus = 'active' | 'inactive' | 'pending'

export type User = {
  id: number
  name: string
  email: string
  role: UserRole
  status: UserStatus
  createdAt: string
}

export const roleLabels: Record<UserRole, string> = {
  admin: 'مدیر',
  editor: 'ویرایشگر',
  viewer: 'بازدیدکننده',
}

export const statusMeta: Record<UserStatus, { label: string; color: string }> = {
  active: { label: 'فعال', color: 'green' },
  inactive: { label: 'غیرفعال', color: 'gray' },
  pending: { label: 'در انتظار', color: 'orange' },
}

const firstNames = ['علی', 'مریم', 'رضا', 'سارا', 'محمد', 'زهرا', 'حسین', 'نگار', 'امیر', 'فاطمه']
const lastNames = ['احمدی', 'رضایی', 'محمدی', 'کریمی', 'حسینی', 'موسوی', 'جعفری', 'صادقی']
const roles: UserRole[] = ['admin', 'editor', 'viewer', 'viewer']
const statuses: UserStatus[] = ['active', 'active', 'inactive', 'pending']

export const sampleUsers: User[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: `${firstNames[i % firstNames.length]} ${lastNames[(i * 3) % lastNames.length]}`,
  email: `user${i + 1}@example.com`,
  role: roles[i % roles.length],
  status: statuses[(i * 7) % statuses.length],
  createdAt: new Date(Date.UTC(2026, 9, 28) - i * 86_400_000 * 4).toISOString(),
}))
