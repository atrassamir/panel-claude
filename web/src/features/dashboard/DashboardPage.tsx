import { Card, Col, Row, Statistic, Table, Tag } from 'antd'
import { CheckCircleOutlined, CrownOutlined, TeamOutlined } from '@ant-design/icons'
import { PageHeader } from '@/components/PageHeader'
import { formatDate, formatNumber } from '@/lib/format'
import { useUserStats } from '@/features/users/api'
import { roleLabels, type User } from '@/features/users/types'

export function DashboardPage() {
  const { data, isLoading } = useUserStats()

  const cards = [
    { title: 'کل کاربران', value: data?.total, icon: <TeamOutlined /> },
    { title: 'کاربران فعال', value: data?.active, icon: <CheckCircleOutlined /> },
    { title: 'مدیران', value: data?.admins, icon: <CrownOutlined /> },
  ]

  return (
    <>
      <PageHeader title="داشبورد" subtitle="نمای کلی وضعیت سیستم" />
      <Row gutter={[16, 16]}>
        {cards.map((c) => (
          <Col key={c.title} xs={24} sm={12} lg={8}>
            <Card loading={isLoading}>
              <Statistic title={c.title} value={c.value} prefix={c.icon} formatter={(v) => formatNumber(Number(v))} />
            </Card>
          </Col>
        ))}
        <Col span={24}>
          <Card title="آخرین کاربران">
            <Table<User>
              rowKey="id"
              loading={isLoading}
              dataSource={data?.recent}
              pagination={false}
              scroll={{ x: true }}
              columns={[
                { title: 'نام', dataIndex: 'name' },
                { title: 'ایمیل', dataIndex: 'email' },
                { title: 'نقش', dataIndex: 'role', render: (r: User['role']) => <Tag>{roleLabels[r]}</Tag> },
                { title: 'تاریخ عضویت', dataIndex: 'createdAt', render: formatDate },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}
