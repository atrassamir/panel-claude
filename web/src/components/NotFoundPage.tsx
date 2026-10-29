import { Button, EmptyState, VStack } from '@chakra-ui/react'
import { LuSearchX } from 'react-icons/lu'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <LuSearchX />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>صفحه پیدا نشد</EmptyState.Title>
          <EmptyState.Description>صفحه‌ای که دنبالش هستید وجود ندارد.</EmptyState.Description>
        </VStack>
        <Button asChild>
          <Link to="/">بازگشت به داشبورد</Link>
        </Button>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}
