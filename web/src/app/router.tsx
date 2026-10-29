import { createBrowserRouter, createHashRouter } from 'react-router-dom'
import { AdminLayout } from '@/layouts/AdminLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { StandaloneLayout } from '@/layouts/StandaloneLayout'
import { LoginPage } from '@/features/auth/LoginPage'
import { RegisterPage } from '@/features/auth/RegisterPage'
import { NotFoundPage } from '@/components/NotFoundPage'
import { GuestOnly, RequireAuth } from './guards'
import { navItems } from './navigation'

// Static hosts without SPA fallback (e.g. a single-file preview) need hash URLs.
const createRouter = import.meta.env.VITE_ROUTER === 'hash' ? createHashRouter : createBrowserRouter

const toRoute = ({ path, page: Page }: (typeof navItems)[number]) => ({ path, element: <Page /> })

export const router = createRouter([
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
  // Auth and error page variants are demos, so they stay reachable while signed in.
  { element: <StandaloneLayout />, children: navItems.filter((i) => i.standalone).map(toRoute) },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AdminLayout />,
        children: [...navItems.filter((i) => !i.standalone).map(toRoute), { path: '*', element: <NotFoundPage /> }],
      },
    ],
  },
])
