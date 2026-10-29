import { lazy, type ComponentType, type ReactNode } from 'react'
import {
  LuBell,
  LuBlocks,
  LuCalendarDays,
  LuChartPie,
  LuCircleAlert,
  LuCircleHelp,
  LuColumns3,
  LuCreditCard,
  LuFileText,
  LuFolderOpen,
  LuLayers,
  LuLayoutDashboard,
  LuLayoutTemplate,
  LuListPlus,
  LuLogIn,
  LuMail,
  LuMessageCircle,
  LuMousePointerClick,
  LuNavigation,
  LuPalette,
  LuReceipt,
  LuServerCrash,
  LuSettings,
  LuShoppingBag,
  LuSlidersHorizontal,
  LuSquareCheck,
  LuTable,
  LuTableProperties,
  LuTag,
  LuTrendingUp,
  LuUser,
  LuWorkflow,
  LuWrench,
  LuKeyRound,
  LuSearchX,
  LuPanelsTopLeft,
  LuTable2,
  LuTextCursorInput,
} from 'react-icons/lu'

export type NavItem = {
  path: string
  label: string
  icon: ReactNode
  page: ComponentType
  /** Rendered full-screen, outside the admin layout (auth and error pages). */
  standalone?: boolean
}

export type NavGroup = { key: string; title?: string; icon?: ReactNode; items: NavItem[] }

const page = <T,>(load: () => Promise<T>, name: keyof T) =>
  lazy(() => load().then((m) => ({ default: m[name] as ComponentType })))

/**
 * Single source for routes, the sidebar, the top nav, breadcrumbs and the
 * command palette. Adding a page means adding one item here.
 */
export const navigation: NavGroup[] = [
  {
    key: 'dashboards',
    title: 'داشبوردها',
    icon: <LuLayoutDashboard />,
    items: [
      { path: '/', label: 'داشبورد اصلی', icon: <LuLayoutDashboard />, page: page(() => import('@/features/dashboard/DashboardPage'), 'DashboardPage') },
      { path: '/dashboards/analytics', label: 'تحلیلی', icon: <LuTrendingUp />, page: page(() => import('@/features/dashboards/AnalyticsPage'), 'AnalyticsPage') },
      { path: '/dashboards/ecommerce', label: 'فروشگاه', icon: <LuShoppingBag />, page: page(() => import('@/features/dashboards/EcommercePage'), 'EcommercePage') },
    ],
  },
  {
    key: 'components',
    title: 'کامپوننت‌ها',
    icon: <LuBlocks />,
    items: [
      { path: '/components/foundations', label: 'رنگ و تایپوگرافی', icon: <LuPalette />, page: page(() => import('@/features/components/FoundationsPage'), 'FoundationsPage') },
      { path: '/components/buttons', label: 'دکمه‌ها', icon: <LuMousePointerClick />, page: page(() => import('@/features/components/ButtonsPage'), 'ButtonsPage') },
      { path: '/components/badges', label: 'نشان، تگ و آواتار', icon: <LuTag />, page: page(() => import('@/features/components/BadgesPage'), 'BadgesPage') },
      { path: '/components/feedback', label: 'بازخورد و وضعیت', icon: <LuBell />, page: page(() => import('@/features/components/FeedbackPage'), 'FeedbackPage') },
      { path: '/components/overlays', label: 'پنجره‌ها و منوها', icon: <LuLayers />, page: page(() => import('@/features/components/OverlaysPage'), 'OverlaysPage') },
      { path: '/components/navigation', label: 'ناوبری', icon: <LuNavigation />, page: page(() => import('@/features/components/NavigationPage'), 'NavigationPage') },
      { path: '/components/data-display', label: 'نمایش داده', icon: <LuPanelsTopLeft />, page: page(() => import('@/features/components/DataDisplayPage'), 'DataDisplayPage') },
      { path: '/components/charts', label: 'نمودارها', icon: <LuChartPie />, page: page(() => import('@/features/components/ChartsPage'), 'ChartsPage') },
    ],
  },
  {
    key: 'forms',
    title: 'فرم‌ها',
    icon: <LuTextCursorInput />,
    items: [
      { path: '/forms/basic', label: 'فرم پایه', icon: <LuFileText />, page: page(() => import('@/features/forms/BasicFormPage'), 'BasicFormPage') },
      { path: '/forms/advanced', label: 'فیلدهای پیشرفته', icon: <LuSlidersHorizontal />, page: page(() => import('@/features/forms/AdvancedInputsPage'), 'AdvancedInputsPage') },
      { path: '/forms/multi-step', label: 'فرم چندمرحله‌ای', icon: <LuWorkflow />, page: page(() => import('@/features/forms/MultiStepFormPage'), 'MultiStepFormPage') },
      { path: '/forms/dynamic', label: 'فرم پویا', icon: <LuListPlus />, page: page(() => import('@/features/forms/DynamicFormPage'), 'DynamicFormPage') },
    ],
  },
  {
    key: 'tables',
    title: 'جدول‌ها',
    icon: <LuTable2 />,
    items: [
      { path: '/tables/basic', label: 'جدول ساده', icon: <LuTable />, page: page(() => import('@/features/tables/BasicTablePage'), 'BasicTablePage') },
      { path: '/tables/data', label: 'جدول داده', icon: <LuTableProperties />, page: page(() => import('@/features/tables/DataTablePage'), 'DataTablePage') },
      { path: '/tables/selectable', label: 'جدول قابل انتخاب', icon: <LuSquareCheck />, page: page(() => import('@/features/tables/SelectableTablePage'), 'SelectableTablePage') },
    ],
  },
  {
    key: 'pages',
    title: 'صفحه‌ها',
    icon: <LuLayoutTemplate />,
    items: [
      { path: '/pages/profile', label: 'پروفایل', icon: <LuUser />, page: page(() => import('@/features/pages/ProfilePage'), 'ProfilePage') },
      { path: '/pages/settings', label: 'تنظیمات حساب', icon: <LuSettings />, page: page(() => import('@/features/pages/SettingsPage'), 'SettingsPage') },
      { path: '/pages/pricing', label: 'تعرفه‌ها', icon: <LuCreditCard />, page: page(() => import('@/features/pages/PricingPage'), 'PricingPage') },
      { path: '/pages/invoice', label: 'فاکتور', icon: <LuReceipt />, page: page(() => import('@/features/pages/InvoicePage'), 'InvoicePage') },
      { path: '/pages/inbox', label: 'صندوق پیام', icon: <LuMail />, page: page(() => import('@/features/pages/InboxPage'), 'InboxPage') },
      { path: '/pages/chat', label: 'گفتگو', icon: <LuMessageCircle />, page: page(() => import('@/features/pages/ChatPage'), 'ChatPage') },
      { path: '/pages/kanban', label: 'کانبان', icon: <LuColumns3 />, page: page(() => import('@/features/pages/KanbanPage'), 'KanbanPage') },
      { path: '/pages/calendar', label: 'تقویم', icon: <LuCalendarDays />, page: page(() => import('@/features/pages/CalendarPage'), 'CalendarPage') },
      { path: '/pages/files', label: 'مدیریت فایل', icon: <LuFolderOpen />, page: page(() => import('@/features/pages/FilesPage'), 'FilesPage') },
      { path: '/pages/faq', label: 'سوالات متداول', icon: <LuCircleHelp />, page: page(() => import('@/features/pages/FaqPage'), 'FaqPage') },
    ],
  },
  {
    key: 'standalone',
    title: 'ورود و خطا',
    icon: <LuCircleAlert />,
    items: [
      { path: '/auth/split', label: 'ورود دوستونه', icon: <LuLogIn />, standalone: true, page: page(() => import('@/features/standalone/SplitLoginPage'), 'SplitLoginPage') },
      { path: '/auth/minimal', label: 'ورود مینیمال', icon: <LuLogIn />, standalone: true, page: page(() => import('@/features/standalone/MinimalLoginPage'), 'MinimalLoginPage') },
      { path: '/auth/forgot-password', label: 'فراموشی رمز', icon: <LuKeyRound />, standalone: true, page: page(() => import('@/features/standalone/ForgotPasswordPage'), 'ForgotPasswordPage') },
      { path: '/errors/404', label: 'خطای ۴۰۴', icon: <LuSearchX />, standalone: true, page: page(() => import('@/features/standalone/ErrorPages'), 'NotFoundErrorPage') },
      { path: '/errors/500', label: 'خطای ۵۰۰', icon: <LuServerCrash />, standalone: true, page: page(() => import('@/features/standalone/ErrorPages'), 'ServerErrorPage') },
      { path: '/errors/maintenance', label: 'در حال تعمیر', icon: <LuWrench />, standalone: true, page: page(() => import('@/features/standalone/ErrorPages'), 'MaintenancePage') },
    ],
  },
]

export const navItems = navigation.flatMap((g) => g.items)

export function findNav(pathname: string) {
  for (const group of navigation) {
    const item = group.items.find((i) => i.path === pathname)
    if (item) return { group, item }
  }
  return null
}
