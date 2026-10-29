import { Box, Button, Checkbox, Flex, Grid, Heading, HStack, Input, Link as ChakraLink, Separator, Stack, Text } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { LuGithub, LuQuote } from 'react-icons/lu'
import { FormField } from '@/components/FormField'
import { Logo } from '@/components/Logo'
import { PasswordInput } from '@/components/ui/password-input'

export function SplitLoginPage() {
  const navigate = useNavigate()
  return (
    <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} minH="100vh">
      <Flex align="center" justify="center" p={{ base: '6', md: '12' }}>
        <Stack gap="8" w="full" maxW="sm">
          <Logo />
          <Stack gap="2">
            <Heading size="2xl">خوش برگشتید</Heading>
            <Text color="fg.muted">برای ادامه وارد حساب خود شوید.</Text>
          </Stack>
          <Stack
            gap="4"
            as="form"
            onSubmit={(e) => {
              e.preventDefault()
              navigate('/')
            }}
          >
            <FormField label="ایمیل">
              <Input dir="ltr" defaultValue="admin@example.com" />
            </FormField>
            <FormField label="رمز عبور">
              <PasswordInput defaultValue="admin123" />
            </FormField>
            <HStack justify="space-between">
              <Checkbox.Root defaultChecked size="sm">
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>مرا به خاطر بسپار</Checkbox.Label>
              </Checkbox.Root>
              <ChakraLink asChild fontSize="sm" color="blue.fg">
                <Link to="/auth/forgot-password">فراموشی رمز؟</Link>
              </ChakraLink>
            </HStack>
            <Button type="submit" colorPalette="blue" size="lg">
              ورود
            </Button>
            <HStack>
              <Separator flex="1" />
              <Text fontSize="xs" color="fg.muted">
                یا
              </Text>
              <Separator flex="1" />
            </HStack>
            <Button variant="outline">
              <LuGithub /> ورود با گیت‌هاب
            </Button>
          </Stack>
          <Text fontSize="sm" color="fg.muted" textAlign="center">
            حساب ندارید؟{' '}
            <ChakraLink asChild color="blue.fg">
              <Link to="/register">ثبت نام</Link>
            </ChakraLink>
          </Text>
        </Stack>
      </Flex>
      <Flex
        hideBelow="lg"
        direction="column"
        justify="flex-end"
        p="12"
        bgGradient="to-br"
        gradientFrom="blue.600"
        gradientTo="purple.700"
        color="white"
        position="relative"
        overflow="hidden"
      >
        <Box position="absolute" top="-20" insetEnd="-20" boxSize="80" rounded="full" bg="whiteAlpha.200" />
        <Box position="absolute" top="40" insetStart="-16" boxSize="56" rounded="full" bg="whiteAlpha.100" />
        <Stack gap="6" maxW="md" position="relative">
          <LuQuote size="40" />
          <Text fontSize="2xl" fontWeight="medium" lineHeight="tall">
            این پنل زمان ساخت ابزارهای داخلی ما را نصف کرد. همه‌چیز آماده و یکدست است.
          </Text>
          <Box>
            <Text fontWeight="bold">نگار صادقی</Text>
            <Text opacity={0.8} fontSize="sm">
              مدیر محصول، شرکت نوآوران
            </Text>
          </Box>
        </Stack>
      </Flex>
    </Grid>
  )
}
