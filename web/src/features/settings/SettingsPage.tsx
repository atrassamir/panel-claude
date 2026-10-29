import { App, Button, Card, Form, Input, Segmented } from 'antd'
import { PageHeader } from '@/components/PageHeader'
import { useUiStore } from '@/stores/ui'

type GeneralSettings = { siteName: string; supportEmail: string }

export function SettingsPage() {
  const { message } = App.useApp()
  const { themeMode, setThemeMode } = useUiStore()

  return (
    <>
      <PageHeader title="تنظیمات" subtitle="تنظیمات عمومی پنل" />
      <Card title="عمومی" style={{ maxWidth: 640, marginBottom: 16 }}>
        <Form<GeneralSettings>
          layout="vertical"
          initialValues={{ siteName: 'پنل مدیریت', supportEmail: 'support@example.com' }}
          // TODO: persist through the settings API once the backend exists.
          onFinish={() => message.success('تنظیمات ذخیره شد')}
        >
          <Form.Item name="siteName" label="نام سایت" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="supportEmail" label="ایمیل پشتیبانی" rules={[{ type: 'email' }]}>
            <Input dir="ltr" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            ذخیره
          </Button>
        </Form>
      </Card>
      <Card title="ظاهر" style={{ maxWidth: 640 }}>
        <Segmented
          value={themeMode}
          onChange={setThemeMode}
          options={[
            { label: 'روشن', value: 'light' },
            { label: 'تیره', value: 'dark' },
          ]}
        />
      </Card>
    </>
  )
}
