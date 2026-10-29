import { useState } from 'react'
import { Button, Card, DataList, HStack, Input, NativeSelect, SimpleGrid, Stack, Steps, Text, Textarea } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type FieldPath } from 'react-hook-form'
import { LuCheck } from 'react-icons/lu'
import { z } from 'zod'
import { FormField } from '@/components/FormField'
import { PageHeader } from '@/components/PageHeader'
import { toaster } from '@/components/ui/toaster-store'

const plans = [
  { value: 'basic', label: 'پایه' },
  { value: 'pro', label: 'حرفه‌ای' },
  { value: 'enterprise', label: 'سازمانی' },
]

const schema = z.object({
  fullName: z.string().trim().min(2, 'نام را وارد کنید'),
  email: z.email('ایمیل معتبر نیست'),
  company: z.string().optional(),
  province: z.string().trim().min(2, 'استان را وارد کنید'),
  city: z.string().trim().min(2, 'شهر را وارد کنید'),
  postalCode: z.string().regex(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد'),
  address: z.string().trim().min(10, 'آدرس را کامل وارد کنید'),
  plan: z.string().min(1, 'پلن را انتخاب کنید'),
  notes: z.string().optional(),
})

type Values = z.infer<typeof schema>

const steps: { title: string; description: string; fields: FieldPath<Values>[] }[] = [
  { title: 'اطلاعات حساب', description: 'نام و ایمیل', fields: ['fullName', 'email', 'company'] },
  { title: 'آدرس', description: 'محل ارسال', fields: ['province', 'city', 'postalCode', 'address'] },
  { title: 'پلن و تأیید', description: 'بررسی نهایی', fields: ['plan', 'notes'] },
]

const fieldLabels: Record<keyof Values, string> = {
  fullName: 'نام',
  email: 'ایمیل',
  company: 'شرکت',
  province: 'استان',
  city: 'شهر',
  postalCode: 'کد پستی',
  address: 'آدرس',
  plan: 'پلن',
  notes: 'توضیحات',
}

export function MultiStepFormPage() {
  const [step, setStep] = useState(0)
  const {
    register,
    trigger,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { plan: '' } })

  const next = async () => {
    // Validate only the current step's fields before moving on.
    if (await trigger(steps[step].fields)) setStep((s) => s + 1)
  }

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600))
    toaster.create({ type: 'success', title: 'ثبت‌نام کامل شد' })
    setStep(steps.length)
  }

  const isLast = step === steps.length - 1

  return (
    <>
      <PageHeader title="فرم چندمرحله‌ای" description="فرم مرحله‌به‌مرحله با اعتبارسنجی هر مرحله" />
      <Card.Root maxW="3xl">
        <Card.Body>
          <Steps.Root step={step} count={steps.length} colorPalette="blue">
            <Steps.List mb="8">
              {steps.map((s, i) => (
                <Steps.Item key={s.title} index={i}>
                  <Steps.Indicator>
                    <Steps.Status complete={<LuCheck />} incomplete={<Steps.Number />} />
                  </Steps.Indicator>
                  <Stack gap="0" hideBelow="md">
                    <Steps.Title>{s.title}</Steps.Title>
                    <Steps.Description>{s.description}</Steps.Description>
                  </Stack>
                  <Steps.Separator />
                </Steps.Item>
              ))}
            </Steps.List>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Steps.Content index={0}>
                <Stack gap="4">
                  <FormField label="نام و نام خانوادگی" error={errors.fullName?.message} required>
                    <Input {...register('fullName')} />
                  </FormField>
                  <FormField label="ایمیل" error={errors.email?.message} required>
                    <Input type="email" dir="ltr" {...register('email')} />
                  </FormField>
                  <FormField label="نام شرکت" helper="اختیاری">
                    <Input {...register('company')} />
                  </FormField>
                </Stack>
              </Steps.Content>

              <Steps.Content index={1}>
                <Stack gap="4">
                  <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
                    <FormField label="استان" error={errors.province?.message} required>
                      <Input {...register('province')} />
                    </FormField>
                    <FormField label="شهر" error={errors.city?.message} required>
                      <Input {...register('city')} />
                    </FormField>
                    <FormField label="کد پستی" error={errors.postalCode?.message} required>
                      <Input dir="ltr" inputMode="numeric" {...register('postalCode')} />
                    </FormField>
                  </SimpleGrid>
                  <FormField label="آدرس" error={errors.address?.message} required>
                    <Textarea rows={3} {...register('address')} />
                  </FormField>
                </Stack>
              </Steps.Content>

              <Steps.Content index={2}>
                <Stack gap="4">
                  <FormField label="پلن" error={errors.plan?.message} required>
                    <NativeSelect.Root>
                      <NativeSelect.Field placeholder="انتخاب کنید" {...register('plan')}>
                        {plans.map((p) => (
                          <option key={p.value} value={p.value}>
                            {p.label}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </FormField>
                  <FormField label="توضیحات" helper="اختیاری">
                    <Textarea rows={3} {...register('notes')} />
                  </FormField>
                </Stack>
              </Steps.Content>

              <Steps.CompletedContent>
                <Stack gap="4">
                  <Text fontWeight="medium" color="fg.success">
                    اطلاعات با موفقیت ثبت شد.
                  </Text>
                  <DataList.Root orientation="horizontal">
                    {(Object.keys(fieldLabels) as (keyof Values)[]).map((key) => (
                      <DataList.Item key={key}>
                        <DataList.ItemLabel>{fieldLabels[key]}</DataList.ItemLabel>
                        <DataList.ItemValue>
                          {key === 'plan'
                            ? plans.find((p) => p.value === getValues('plan'))?.label
                            : getValues(key) || '—'}
                        </DataList.ItemValue>
                      </DataList.Item>
                    ))}
                  </DataList.Root>
                  <Button
                    alignSelf="start"
                    variant="outline"
                    onClick={() => {
                      reset()
                      setStep(0)
                    }}
                  >
                    شروع دوباره
                  </Button>
                </Stack>
              </Steps.CompletedContent>

              {step < steps.length && (
                <HStack mt="8" justify="space-between">
                  <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
                    قبلی
                  </Button>
                  {isLast ? (
                    <Button type="submit" colorPalette="blue" loading={isSubmitting}>
                      ثبت نهایی
                    </Button>
                  ) : (
                    <Button colorPalette="blue" onClick={next}>
                      بعدی
                    </Button>
                  )}
                </HStack>
              )}
            </form>
          </Steps.Root>
        </Card.Body>
      </Card.Root>
    </>
  )
}
