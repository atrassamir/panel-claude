import type { ReactNode } from 'react'
import { Card, Flex, Stack, Text } from '@chakra-ui/react'

/** A titled card that frames one component demo. */
export function DemoSection({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
        {description && <Card.Description>{description}</Card.Description>}
      </Card.Header>
      <Card.Body>
        <Stack gap="5">{children}</Stack>
      </Card.Body>
    </Card.Root>
  )
}

/** A labelled, wrapping row of variants inside a DemoSection. */
export function DemoRow({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <Stack gap="2">
      {label && (
        <Text fontSize="xs" color="fg.muted" fontWeight="medium">
          {label}
        </Text>
      )}
      <Flex gap="3" wrap="wrap" align="center">
        {children}
      </Flex>
    </Stack>
  )
}
