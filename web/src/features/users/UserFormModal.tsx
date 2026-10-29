import { useEffect } from 'react'
import { App, Form, Input, Modal, Select, Switch } from 'antd'
import { useSaveUser } from './api'
import { roleLabels, type User, type UserInput } from './types'

type Props = {
  open: boolean
  /** User being edited; `null` means create. */
  user: User | null
  onClose: () => void
}

const roleOptions = Object.entries(roleLabels).map(([value, label]) => ({ value, label }))

export function UserFormModal({ open, user, onClose }: Props) {
  const [form] = Form.useForm<UserInput>()
  const { message } = App.useApp()
  const save = useSaveUser()

  useEffect(() => {
    if (!open) return
    form.resetFields()
    if (user) form.setFieldsValue(user)
  }, [open, user, form])

  const onSubmit = async () => {
    const input = await form.validateFields()
    await save.mutateAsync({ id: user?.id, input })
    message.success(user ? 'کاربر ویرایش شد' : 'کاربر ایجاد شد')
    onClose()
  }

  return (
    <Modal
      open={open}
      title={user ? 'ویرایش کاربر' : 'کاربر جدید'}
      okText="ذخیره"
      cancelText="انصراف"
      onOk={onSubmit}
      onCancel={onClose}
      confirmLoading={save.isPending}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" initialValues={{ role: 'viewer', active: true }}>
        <Form.Item name="name" label="نام" rules={[{ required: true, message: 'نام را وارد کنید' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="ایمیل"
          rules={[
            { required: true, message: 'ایمیل را وارد کنید' },
            { type: 'email', message: 'ایمیل معتبر نیست' },
          ]}
        >
          <Input dir="ltr" />
        </Form.Item>
        <Form.Item name="role" label="نقش" rules={[{ required: true }]}>
          <Select options={roleOptions} />
        </Form.Item>
        <Form.Item name="active" label="فعال" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  )
}
