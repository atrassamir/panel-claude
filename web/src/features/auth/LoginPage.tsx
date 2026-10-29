import { Alert, Button, Input, Link as ChakraLink, Stack, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FormField } from '@/components/FormField'
import { PasswordInput } from '@/components/ui/password-input'
import { useAuthStore } from '@/stores/auth'
import { loginSchema, type LoginValues } from './schemas'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((s) => s.login)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = ({ email, password }: LoginValues) => {
    try {
      login(email, password)
      navigate((location.state as { from?: string } | null)?.from ?? '/', { replace: true })
    } catch (e) {
      setError('root', { message: (e as Error).message })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack gap="4">
        <Text fontSize="xl" fontWeight="bold">
          ورود
        </Text>
        {errors.root && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Title>{errors.root.message}</Alert.Title>
          </Alert.Root>
        )}
        <FormField label="ایمیل" error={errors.email?.message}>
          <Input type="email" dir="ltr" autoComplete="email" {...register('email')} />
        </FormField>
        <FormField label="رمز عبور" error={errors.password?.message}>
          <PasswordInput autoComplete="current-password" {...register('password')} />
        </FormField>
        <Button type="submit" colorPalette="blue" loading={isSubmitting}>
          ورود
        </Button>
        <Text fontSize="sm" textAlign="center">
          حساب ندارید؟{' '}
          <ChakraLink asChild colorPalette="blue" color="colorPalette.fg">
            <Link to="/register">ثبت نام کنید</Link>
          </ChakraLink>
        </Text>
        <Text fontSize="xs" color="fg.muted" textAlign="center">
          حساب آزمایشی: admin@example.com / admin123
        </Text>
      </Stack>
    </form>
  )
}
