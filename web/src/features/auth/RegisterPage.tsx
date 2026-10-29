import { Alert, Button, Checkbox, Field, Input, Link as ChakraLink, Stack, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FormField } from '@/components/FormField'
import { PasswordInput } from '@/components/ui/password-input'
import { toaster } from '@/components/ui/toaster-store'
import { useAuthStore } from '@/stores/auth'
import { registerSchema, type RegisterValues } from './schemas'

export function RegisterPage() {
  const navigate = useNavigate()
  const registerAccount = useAuthStore((s) => s.register)
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { acceptTerms: false },
  })

  const onSubmit = ({ name, email, password }: RegisterValues) => {
    try {
      registerAccount({ name, email, password })
      toaster.create({ type: 'success', title: 'ثبت نام با موفقیت انجام شد' })
      navigate('/', { replace: true })
    } catch (e) {
      setError('root', { message: (e as Error).message })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack gap="4">
        <Text fontSize="xl" fontWeight="bold">
          ثبت نام
        </Text>
        {errors.root && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Title>{errors.root.message}</Alert.Title>
          </Alert.Root>
        )}
        <FormField label="نام و نام خانوادگی" error={errors.name?.message} required>
          <Input autoComplete="name" {...register('name')} />
        </FormField>
        <FormField label="ایمیل" error={errors.email?.message} required>
          <Input type="email" dir="ltr" autoComplete="email" {...register('email')} />
        </FormField>
        <FormField label="رمز عبور" error={errors.password?.message} helper="حداقل ۸ کاراکتر" required>
          <PasswordInput autoComplete="new-password" {...register('password')} />
        </FormField>
        <FormField label="تکرار رمز عبور" error={errors.confirmPassword?.message} required>
          <PasswordInput autoComplete="new-password" {...register('confirmPassword')} />
        </FormField>
        <Controller
          control={control}
          name="acceptTerms"
          render={({ field }) => (
            <Field.Root invalid={!!errors.acceptTerms}>
              <Checkbox.Root
                checked={field.value}
                onCheckedChange={(e) => field.onChange(!!e.checked)}
                name={field.name}
              >
                <Checkbox.HiddenInput onBlur={field.onBlur} />
                <Checkbox.Control />
                <Checkbox.Label>قوانین و مقررات را می‌پذیرم</Checkbox.Label>
              </Checkbox.Root>
              <Field.ErrorText>{errors.acceptTerms?.message}</Field.ErrorText>
            </Field.Root>
          )}
        />
        <Button type="submit" colorPalette="blue" loading={isSubmitting}>
          ایجاد حساب
        </Button>
        <Text fontSize="sm" textAlign="center">
          قبلاً ثبت نام کرده‌اید؟{' '}
          <ChakraLink asChild colorPalette="blue" color="colorPalette.fg">
            <Link to="/login">وارد شوید</Link>
          </ChakraLink>
        </Text>
      </Stack>
    </form>
  )
}
