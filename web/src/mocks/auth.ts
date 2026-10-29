import type { AuthUser } from '@/stores/auth'
import { delay } from './delay'

export const authMock = {
  async login(username: string, password: string): Promise<{ token: string; user: AuthUser }> {
    await delay(600)
    if (username !== 'admin' || password !== 'admin123') {
      throw new Error('نام کاربری یا رمز عبور اشتباه است')
    }
    return {
      token: 'mock-token',
      user: { id: 1, name: 'مدیر سیستم', email: 'admin@example.com', role: 'admin' },
    }
  },
}
