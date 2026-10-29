import type { ReactNode } from 'react'
import { Flex, Typography } from 'antd'

type Props = {
  title: string
  subtitle?: string
  extra?: ReactNode
}

export function PageHeader({ title, subtitle, extra }: Props) {
  return (
    <Flex justify="space-between" align="center" wrap gap={12} style={{ marginBottom: 24 }}>
      <div>
        <Typography.Title level={3} style={{ margin: 0 }}>
          {title}
        </Typography.Title>
        {subtitle && <Typography.Text type="secondary">{subtitle}</Typography.Text>}
      </div>
      {extra}
    </Flex>
  )
}
