import { lazy, type ComponentType, type ReactNode } from 'react'
import { LuFileText, LuLayoutDashboard, LuListPlus, LuSquareCheck, LuTable, LuTableProperties, LuWorkflow } from 'react-icons/lu'

export type NavItem = {
  path: string
  label: string
  icon: ReactNode
  page: ComponentType
}

export type NavGroup = { title?: string; items: NavItem[] }

const page = <T,>(load: () => Promise<T>, name: keyof T) =>
  lazy(() => load().then((m) => ({ default: m[name] as ComponentType })))

/**
 * Single source for routes and the sidebar: adding a page means adding one
 * item here. Pages are lazy-loaded, so each one ships as its own chunk.
 */
export const navigation: NavGroup[] = [
  {
    items: [
      {
        path: '/',
        label: 'داشبورد',
        icon: <LuLayoutDashboard />,
        page: page(() => import('@/features/dashboard/DashboardPage'), 'DashboardPage'),
      },
    ],
  },
  {
    title: 'فرم‌ها',
    items: [
      {
        path: '/forms/basic',
        label: 'فرم پایه',
        icon: <LuFileText />,
        page: page(() => import('@/features/forms/BasicFormPage'), 'BasicFormPage'),
      },
      {
        path: '/forms/multi-step',
        label: 'فرم چندمرحله‌ای',
        icon: <LuWorkflow />,
        page: page(() => import('@/features/forms/MultiStepFormPage'), 'MultiStepFormPage'),
      },
      {
        path: '/forms/dynamic',
        label: 'فرم پویا',
        icon: <LuListPlus />,
        page: page(() => import('@/features/forms/DynamicFormPage'), 'DynamicFormPage'),
      },
    ],
  },
  {
    title: 'جدول‌ها',
    items: [
      {
        path: '/tables/basic',
        label: 'جدول ساده',
        icon: <LuTable />,
        page: page(() => import('@/features/tables/BasicTablePage'), 'BasicTablePage'),
      },
      {
        path: '/tables/data',
        label: 'جدول داده',
        icon: <LuTableProperties />,
        page: page(() => import('@/features/tables/DataTablePage'), 'DataTablePage'),
      },
      {
        path: '/tables/selectable',
        label: 'جدول قابل انتخاب',
        icon: <LuSquareCheck />,
        page: page(() => import('@/features/tables/SelectableTablePage'), 'SelectableTablePage'),
      },
    ],
  },
]

export const navItems = navigation.flatMap((g) => g.items)
