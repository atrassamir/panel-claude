import { Breadcrumb } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { LuHouse } from 'react-icons/lu'
import { findNav } from '@/app/navigation'

export function AppBreadcrumb() {
  const { pathname } = useLocation()
  const match = findNav(pathname)
  if (!match || pathname === '/') return null

  return (
    <Breadcrumb.Root size="sm" mb="4">
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link asChild>
            <Link to="/">
              <LuHouse /> خانه
            </Link>
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>{match.group.title}</Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.CurrentLink>{match.item.label}</Breadcrumb.CurrentLink>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}
