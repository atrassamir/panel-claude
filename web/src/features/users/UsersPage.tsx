import { useState } from 'react'
import { App, Badge, Button, Card, Input, Popconfirm, Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { PageHeader } from '@/components/PageHeader'
import { formatDate } from '@/lib/format'
import { useDeleteUser, useUsers } from './api'
import { roleLabels, type User } from './types'
import { UserFormModal } from './UserFormModal'

export function UsersPage() {
  const { message } = App.useApp()
  const [params, setParams] = useState({ page: 1, pageSize: 10, search: '' })
  const [modal, setModal] = useState<{ open: boolean; user: User | null }>({ open: false, user: null })
  const { data, isFetching } = useUsers(params)
  const remove = useDeleteUser()

  const columns: TableProps<User>['columns'] = [
    { title: 'نام', dataIndex: 'name' },
    { title: 'ایمیل', dataIndex: 'email' },
    { title: 'نقش', dataIndex: 'role', render: (r: User['role']) => <Tag color="blue">{roleLabels[r]}</Tag> },
    {
      title: 'وضعیت',
      dataIndex: 'active',
      render: (active: boolean) =>
        active ? <Badge status="success" text="فعال" /> : <Badge status="default" text="غیرفعال" />,
    },
    { title: 'تاریخ عضویت', dataIndex: 'createdAt', render: formatDate },
    {
      title: 'عملیات',
      key: 'actions',
      width: 120,
      render: (_, user) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            aria-label="ویرایش"
            onClick={() => setModal({ open: true, user })}
          />
          <Popconfirm
            title="این کاربر حذف شود؟"
            okText="حذف"
            cancelText="انصراف"
            okButtonProps={{ danger: true }}
            onConfirm={async () => {
              await remove.mutateAsync(user.id)
              message.success('کاربر حذف شد')
            }}
          >
            <Button type="text" danger icon={<DeleteOutlined />} aria-label="حذف" />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <>
      <PageHeader
        title="کاربران"
        subtitle="مدیریت کاربران سیستم"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setModal({ open: true, user: null })}>
            کاربر جدید
          </Button>
        }
      />
      <Card>
        <Input.Search
          placeholder="جستجو بر اساس نام یا ایمیل"
          allowClear
          onSearch={(search) => setParams((p) => ({ ...p, page: 1, search }))}
          style={{ maxWidth: 320, marginBottom: 16 }}
        />
        <Table<User>
          rowKey="id"
          columns={columns}
          dataSource={data?.items}
          loading={isFetching}
          scroll={{ x: true }}
          pagination={{
            current: params.page,
            pageSize: params.pageSize,
            total: data?.total,
            showSizeChanger: true,
            onChange: (page, pageSize) => setParams((p) => ({ ...p, page, pageSize })),
          }}
        />
      </Card>
      <UserFormModal open={modal.open} user={modal.user} onClose={() => setModal({ open: false, user: null })} />
    </>
  )
}
