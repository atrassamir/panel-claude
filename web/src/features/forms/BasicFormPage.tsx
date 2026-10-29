import { useState } from 'react'
import {
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  Field,
  Fieldset,
  HStack,
  Input,
  NativeSelect,
  RadioGroup,
  SimpleGrid,
  Switch,
  Textarea,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormField, FormFieldGroup } from '@/components/FormField'
import { PageHeader } from '@/components/PageHeader'
import { toaster } from '@/components/ui/toaster-store'
import { SubmittedValues } from './SubmittedValues'

const cities = ['تهران', 'اصفهان', 'شیراز', 'مشهد', 'تبریز']
const interests = [
  { value: 'tech', label: 'تکنولوژی' },
  { value: 'sport', label: 'ورزش' },
  { value: 'art', label: 'هنر' },
  { value: 'travel', label: 'سفر' },
]

const schema = z.object({
  firstName: z.string().trim().min(2, 'نام را وارد کنید'),
  lastName: z.string().trim().min(2, 'نام خانوادگی را وارد کنید'),
  email: z.email('ایمیل معتبر نیست'),
  phone: z.string().regex(/^09\d{9}$/, 'شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود'),
  birthDate: z.string().min(1, 'تاریخ تولد را وارد کنید'),
  gender: z.enum(['male', 'female'], 'جنسیت را انتخاب کنید'),
  city: z.string().min(1, 'شهر را انتخاب کنید'),
  interests: z.array(z.string()).min(1, 'حداقل یک مورد را انتخاب کنید'),
  bio: z.string().max(300, 'حداکثر ۳۰۰ کاراکتر').optional(),
  newsletter: z.boolean(),
})

type Values = z.infer<typeof schema>

export function BasicFormPage() {
  const [submitted, setSubmitted] = useState<Values | null>(null)
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { interests: [], newsletter: true, city: '' },
  })

  const onSubmit = async (values: Values) => {
    await new Promise((r) => setTimeout(r, 500))
    setSubmitted(values)
    toaster.create({ type: 'success', title: 'اطلاعات ذخیره شد' })
  }

  return (
    <>
      <PageHeader title="فرم پایه" description="انواع فیلدهای ورودی با اعتبارسنجی" />
      <Card.Root maxW="4xl">
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Fieldset.Root>
              <Fieldset.Legend fontSize="md">اطلاعات شخصی</Fieldset.Legend>
              <Fieldset.Content>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                  <FormField label="نام" error={errors.firstName?.message} required>
                    <Input {...register('firstName')} />
                  </FormField>
                  <FormField label="نام خانوادگی" error={errors.lastName?.message} required>
                    <Input {...register('lastName')} />
                  </FormField>
                  <FormField label="ایمیل" error={errors.email?.message} required>
                    <Input type="email" dir="ltr" {...register('email')} />
                  </FormField>
                  <FormField label="موبایل" error={errors.phone?.message} helper="مثال: 09121234567" required>
                    <Input type="tel" dir="ltr" placeholder="09xxxxxxxxx" {...register('phone')} />
                  </FormField>
                  <FormField label="تاریخ تولد" error={errors.birthDate?.message} required>
                    <Input type="date" {...register('birthDate')} />
                  </FormField>
                  <FormField label="شهر" error={errors.city?.message} required>
                    <NativeSelect.Root>
                      <NativeSelect.Field placeholder="انتخاب کنید" {...register('city')}>
                        {cities.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </FormField>
                </SimpleGrid>

                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <FormFieldGroup label="جنسیت" error={errors.gender?.message}>
                      <RadioGroup.Root
                        name={field.name}
                        value={field.value ?? null}
                        onValueChange={(e) => field.onChange(e.value)}
                      >
                        <HStack gap="6">
                          {[
                            { value: 'male', label: 'مرد' },
                            { value: 'female', label: 'زن' },
                          ].map((o) => (
                            <RadioGroup.Item key={o.value} value={o.value}>
                              <RadioGroup.ItemHiddenInput onBlur={field.onBlur} />
                              <RadioGroup.ItemIndicator />
                              <RadioGroup.ItemText>{o.label}</RadioGroup.ItemText>
                            </RadioGroup.Item>
                          ))}
                        </HStack>
                      </RadioGroup.Root>
                    </FormFieldGroup>
                  )}
                />

                <Controller
                  control={control}
                  name="interests"
                  render={({ field }) => (
                    <FormFieldGroup label="علاقه‌مندی‌ها" error={errors.interests?.message}>
                      <CheckboxGroup value={field.value} onValueChange={field.onChange} name={field.name}>
                        <HStack gap="6" wrap="wrap">
                          {interests.map((o) => (
                            <Checkbox.Root key={o.value} value={o.value}>
                              <Checkbox.HiddenInput />
                              <Checkbox.Control />
                              <Checkbox.Label>{o.label}</Checkbox.Label>
                            </Checkbox.Root>
                          ))}
                        </HStack>
                      </CheckboxGroup>
                    </FormFieldGroup>
                  )}
                />

                <FormField label="درباره من" error={errors.bio?.message} helper="حداکثر ۳۰۰ کاراکتر">
                  <Textarea rows={4} {...register('bio')} />
                </FormField>

                <Controller
                  control={control}
                  name="newsletter"
                  render={({ field }) => (
                    <Field.Root>
                      <Switch.Root
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={(e) => field.onChange(e.checked)}
                      >
                        <Switch.HiddenInput onBlur={field.onBlur} />
                        <Switch.Control>
                          <Switch.Thumb />
                        </Switch.Control>
                        <Switch.Label>عضویت در خبرنامه</Switch.Label>
                      </Switch.Root>
                    </Field.Root>
                  )}
                />
              </Fieldset.Content>
            </Fieldset.Root>

            <HStack mt="8" gap="3">
              <Button type="submit" colorPalette="blue" loading={isSubmitting}>
                ذخیره
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  reset()
                  setSubmitted(null)
                }}
              >
                پاک کردن
              </Button>
            </HStack>
          </form>
        </Card.Body>
      </Card.Root>
      <SubmittedValues values={submitted} />
    </>
  )
}
