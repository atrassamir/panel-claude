import { useState } from 'react'
import { Button, Card, Center, Heading, Input, Link as ChakraLink, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { LuArrowRight, LuKeyRound, LuMailCheck } from 'react-icons/lu'
import { FormField } from '@/components/FormField'

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)

  return (
    <Center minH="100vh" p="4" bg="bg.subtle">
      <Card.Root w="full" maxW="md">
        <Card.Body>
          <Stack gap="6" align="center" textAlign="center">
            <Center boxSize="14" rounded="full" bg={sent ? 'green.subtle' : 'blue.subtle'} color={sent ? 'green.fg' : 'blue.fg'} fontSize="2xl">
              {sent ? <LuMailCheck /> : <LuKeyRound />}
            </Center>
            <Stack gap="2">
              <Heading size="xl">{sent ? 'ایمیل خود را بررسی کنید' : 'فراموشی رمز عبور'}</Heading>
              <Text color="fg.muted" fontSize="sm">
                {sent ? 'لینک بازیابی رمز به ایمیل شما ارسال شد. ممکن است چند دقیقه طول بکشد.' : 'ایمیل حساب خود را وارد کنید تا لینک بازیابی برایتان ارسال شود.'}
              </Text>
            </Stack>
            {sent ? (
              <Button variant="outline" w="full" onClick={() => setSent(false)}>
                ارسال دوباره
              </Button>
            ) : (
              <Stack
                as="form"
                gap="4"
                w="full"
                textAlign="start"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                <FormField label="ایمیل">
                  <Input type="email" dir="ltr" placeholder="name@example.com" required />
                </FormField>
                <Button type="submit" colorPalette="blue">
                  ارسال لینک بازیابی
                </Button>
              </Stack>
            )}
            <ChakraLink asChild fontSize="sm" color="fg.muted">
              <Link to="/login">
                <LuArrowRight /> بازگشت به ورود
              </Link>
            </ChakraLink>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Center>
  )
}
