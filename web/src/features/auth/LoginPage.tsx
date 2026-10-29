import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Alert, Button, Card, Flex, Form, Input, theme, Typography } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { authMock } from '@/mocks/auth'
import { useAuthStore } from '@/stores/auth'

type LoginForm = { username: string; password: string }

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { token, setSession } = useAuthStore()
  const { token: themeToken } = theme.useToken()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const from = (location.state as { from?: string } | null)?.from ?? '/'
  if (token) return <Navigate to={from} replace />

  const onFinish = async ({ username, password }: LoginForm) => {
    setLoading(true)
    setError(null)
    try {
      const res = await authMock.login(username, password)
      setSession(res.token, res.user)
      navigate(from, { replace: true })
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex align="center" justify="center" style={{ minHeight: '100vh', padding: 16, background: themeToken.colorBgLayout }}>
      <Card style={{ width: '100%', maxWidth: 380 }}>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
          ورود به پنل مدیریت
        </Typography.Title>
        {error && <Alert type="error" title={error} showIcon style={{ marginBottom: 16 }} />}
        <Form<LoginForm> layout="vertical" onFinish={onFinish} initialValues={{ username: 'admin' }}>
          <Form.Item name="username" label="نام کاربری" rules={[{ required: true, message: 'نام کاربری را وارد کنید' }]}>
            <Input prefix={<UserOutlined />} autoComplete="username" />
          </Form.Item>
          <Form.Item name="password" label="رمز عبور" rules={[{ required: true, message: 'رمز عبور را وارد کنید' }]}>
            <Input.Password prefix={<LockOutlined />} autoComplete="current-password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            ورود
          </Button>
        </Form>
        <Typography.Paragraph type="secondary" style={{ marginTop: 16, marginBottom: 0, textAlign: 'center' }}>
          حساب آزمایشی: admin / admin123
        </Typography.Paragraph>
      </Card>
    </Flex>
  )
}
