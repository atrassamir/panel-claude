import { Card, Code } from '@chakra-ui/react'

/** Shows what a demo form submitted, since there is no backend to send it to. */
export function SubmittedValues({ values }: { values: unknown }) {
  if (!values) return null
  return (
    <Card.Root mt="6">
      <Card.Header>
        <Card.Title>داده‌های ارسال شده</Card.Title>
      </Card.Header>
      <Card.Body>
        <Code as="pre" display="block" p="4" dir="ltr" whiteSpace="pre-wrap" fontSize="xs">
          {JSON.stringify(values, null, 2)}
        </Code>
      </Card.Body>
    </Card.Root>
  )
}
