import { createBrowserRouter } from 'react-router-dom'
import { AdminLayout } from '@/layouts/AdminLayout'
import { LoginPage } from '@/features/auth/LoginPage'
import { NotFoundPage } from '@/components/NotFoundPage'
import { RequireAuth } from './RequireAuth'
import { modules } from './modules'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          ...modules.map(({ path, page: Page }) => ({ path, element: <Page /> })),
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
])
