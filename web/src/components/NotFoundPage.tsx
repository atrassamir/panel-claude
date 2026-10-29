import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

export function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="۴۰۴"
      subTitle="صفحه‌ای که دنبالش هستید پیدا نشد."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          بازگشت به داشبورد
        </Button>
      }
    />
  )
}
