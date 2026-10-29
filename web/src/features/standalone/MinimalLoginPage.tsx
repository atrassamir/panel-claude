import { Button, Center, Heading, Input, Link as ChakraLink, Stack, Text } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import { PasswordInput } from '@/components/ui/password-input'

export function MinimalLoginPage() {
  const navigate = useNavigate()
  return (
    <Center minH="100vh" p="6">
      <Stack
        as="form"
        gap="6"
        w="full"
        maxW="xs"
        textAlign="center"
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/')
        }}
      >
        <Center>
          <Logo compact />
        </Center>
        <Heading size="xl">ورود</Heading>
        <Stack gap="3">
          <Input variant="subtle" size="lg" placeholder="ایمیل" dir="ltr" textAlign="center" />
          <PasswordInput variant="subtle" size="lg" placeholder="رمز عبور" textAlign="center" />
        </Stack>
        <Button type="submit" size="lg" rounded="full" colorPalette="gray" variant="solid">
          ادامه
        </Button>
        <Text fontSize="sm" color="fg.muted">
          <ChakraLink asChild>
            <Link to="/auth/forgot-password">رمز را فراموش کرده‌اید؟</Link>
          </ChakraLink>
        </Text>
      </Stack>
    </Center>
  )
}
