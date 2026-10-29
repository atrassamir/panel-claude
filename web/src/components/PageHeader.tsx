import type { ReactNode } from 'react'
import { Flex, Heading, Text } from '@chakra-ui/react'

type Props = { title: string; description?: string; actions?: ReactNode }

export function PageHeader({ title, description, actions }: Props) {
  return (
    <Flex justify="space-between" align="center" wrap="wrap" gap="3" mb="6">
      <div>
        <Heading size="xl">{title}</Heading>
        {description && (
          <Text color="fg.muted" mt="1">
            {description}
          </Text>
        )}
      </div>
      {actions}
    </Flex>
  )
}
