import { Suspense } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Button, Dropdown, Flex, Layout, Menu, Space, Spin, theme, Typography } from 'antd'
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { modules } from '@/app/modules'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'

const { Header, Sider, Content } = Layout

const menuItems = modules
  .filter((m) => !m.hidden)
  .map((m) => ({ key: m.path, icon: m.icon, label: m.label }))

/** Longest module path that prefixes the current URL, so nested pages keep their menu item selected. */
function activeMenuKey(pathname: string) {
  return (
    modules
      .map((m) => m.path)
      .filter((p) => (p === '/' ? pathname === '/' : pathname === p || pathname.startsWith(`${p}/`)))
      .sort((a, b) => b.length - a.length)[0] ?? '/'
  )
}

export function AdminLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { token } = theme.useToken()
  const { sidebarCollapsed, toggleSidebar, themeMode, setThemeMode } = useUiStore()
  const { user, logout } = useAuthStore()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={sidebarCollapsed}
        trigger={null}
        breakpoint="lg"
        onBreakpoint={(broken) => broken !== sidebarCollapsed && toggleSidebar()}
        width={230}
        theme="light"
        style={{ background: token.colorBgContainer, borderInlineEnd: `1px solid ${token.colorBorderSecondary}` }}
      >
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 18,
            color: token.colorPrimary,
          }}
        >
          {sidebarCollapsed ? 'پ' : 'پنل مدیریت'}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[activeMenuKey(pathname)]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ borderInlineEnd: 'none' }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: token.colorBgContainer,
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <Button
            type="text"
            icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            aria-label="باز و بسته کردن منو"
          />
          <Space size="middle">
            <Button
              type="text"
              icon={themeMode === 'dark' ? <SunOutlined /> : <MoonOutlined />}
              onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
              aria-label="تغییر تم"
            />
            <Dropdown
              menu={{
                items: [{ key: 'logout', icon: <LogoutOutlined />, label: 'خروج', danger: true }],
                onClick: ({ key }) => {
                  if (key === 'logout') {
                    logout()
                    navigate('/login')
                  }
                },
              }}
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <Typography.Text>{user?.name}</Typography.Text>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content style={{ padding: 24 }}>
          <Suspense
            fallback={
              <Flex justify="center" style={{ padding: 48 }}>
                <Spin />
              </Flex>
            }
          >
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}
