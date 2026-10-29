export type UserRole = 'admin' | 'editor' | 'viewer'

export type User = {
  id: number
  name: string
  email: string
  role: UserRole
  active: boolean
  createdAt: string
}

export type UserInput = Omit<User, 'id' | 'createdAt'>

export const roleLabels: Record<UserRole, string> = {
  admin: 'مدیر',
  editor: 'ویرایشگر',
  viewer: 'بازدیدکننده',
}
