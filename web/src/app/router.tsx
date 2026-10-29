import { createBrowserRouter } from 'react-router-dom'
import { AdminLayout } from '@/layouts/AdminLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { LoginPage } from '@/features/auth/LoginPage'
import { RegisterPage } from '@/features/auth/RegisterPage'
import { NotFoundPage } from '@/components/NotFoundPage'
import { GuestOnly, RequireAuth } from './guards'
import { navItems } from './navigation'

export const router = createBrowserRouter([
  {
    element: <GuestOnly />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/register', element: <RegisterPage /> },
        ],
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          ...navItems.map(({ path, page: Page }) => ({ path, element: <Page /> })),
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
])
