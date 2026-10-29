import { lazy, type ComponentType, type ReactNode } from 'react'
import { DashboardOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'

/**
 * Single registry for panel sections. Each entry produces both a route and a
 * sidebar menu item, so adding a feature means adding one entry here.
 * Pages are lazy-loaded, so each feature ships as its own chunk.
 */
export type PanelModule = {
  key: string
  path: string
  label: string
  icon?: ReactNode
  page: ComponentType
  /** Hide from the sidebar but keep the route. */
  hidden?: boolean
}

export const modules: PanelModule[] = [
  {
    key: 'dashboard',
    path: '/',
    label: 'داشبورد',
    icon: <DashboardOutlined />,
    page: lazy(() => import('@/features/dashboard/DashboardPage').then((m) => ({ default: m.DashboardPage }))),
  },
  {
    key: 'users',
    path: '/users',
    label: 'کاربران',
    icon: <TeamOutlined />,
    page: lazy(() => import('@/features/users/UsersPage').then((m) => ({ default: m.UsersPage }))),
  },
  {
    key: 'settings',
    path: '/settings',
    label: 'تنظیمات',
    icon: <SettingOutlined />,
    page: lazy(() => import('@/features/settings/SettingsPage').then((m) => ({ default: m.SettingsPage }))),
  },
]
