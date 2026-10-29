import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  IconButton,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { LuPlus, LuTrash2 } from 'react-icons/lu'
import { z } from 'zod'
import { FormField } from '@/components/FormField'
import { PageHeader } from '@/components/PageHeader'
import { toaster } from '@/components/ui/toaster-store'
import { formatPrice } from '@/lib/format'
import { SubmittedValues } from './SubmittedValues'

const itemSchema = z.object({
  title: z.string().trim().min(1, 'عنوان را وارد کنید'),
  quantity: z.number('عدد وارد کنید').int('عدد صحیح').min(1, 'حداقل ۱'),
  price: z.number('عدد وارد کنید').min(0, 'نامعتبر'),
})

const schema = z.object({
  customer: z.string().trim().min(2, 'نام مشتری را وارد کنید'),
  invoiceDate: z.string().min(1, 'تاریخ را وارد کنید'),
  items: z.array(itemSchema).min(1, 'حداقل یک ردیف لازم است'),
  discount: z.number('عدد وارد کنید').min(0).max(100, 'حداکثر ۱۰۰'),
})

type Values = z.infer<typeof schema>

const emptyItem = { title: '', quantity: 1, price: 0 }

export function DynamicFormPage() {
  const [submitted, setSubmitted] = useState<Values | null>(null)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { customer: '', invoiceDate: '', items: [emptyItem], discount: 0 },
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'items' })

  const items = useWatch({ control, name: 'items' })
  const discount = useWatch({ control, name: 'discount' })
  const subtotal = items.reduce((sum, i) => sum + (Number(i.quantity) || 0) * (Number(i.price) || 0), 0)
  const total = subtotal * (1 - Math.min(Math.max(Number(discount) || 0, 0), 100) / 100)

  const onSubmit = async (values: Values) => {
    await new Promise((r) => setTimeout(r, 500))
    setSubmitted(values)
    toaster.create({ type: 'success', title: 'فاکتور ثبت شد' })
  }

  return (
    <>
      <PageHeader title="فرم پویا" description="افزودن و حذف ردیف‌ها با محاسبه‌ی خودکار جمع (فاکتور)" />
      <Card.Root maxW="5xl">
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack gap="6">
              <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                <FormField label="نام مشتری" error={errors.customer?.message} required>
                  <Input {...register('customer')} />
                </FormField>
                <FormField label="تاریخ فاکتور" error={errors.invoiceDate?.message} required>
                  <Input type="date" {...register('invoiceDate')} />
                </FormField>
              </SimpleGrid>

              <Box>
                <Flex justify="space-between" align="center" mb="3">
                  <Text fontWeight="medium">اقلام</Text>
                  <Button size="sm" variant="outline" onClick={() => append(emptyItem)}>
                    <LuPlus /> افزودن ردیف
                  </Button>
                </Flex>
                <Stack gap="3">
                  {fields.map((field, index) => {
                    const err = errors.items?.[index]
                    const row = items[index]
                    return (
                      <Flex
                        key={field.id}
                        gap="3"
                        align={{ base: 'stretch', md: 'flex-start' }}
                        direction={{ base: 'column', md: 'row' }}
                        p="3"
                        borderWidth="1px"
                        rounded="md"
                      >
                        <Box flex="3">
                          <FormField label="عنوان" error={err?.title?.message}>
                            <Input {...register(`items.${index}.title`)} />
                          </FormField>
                        </Box>
                        <Box flex="1">
                          <FormField label="تعداد" error={err?.quantity?.message}>
                            <Input type="number" min={1} {...register(`items.${index}.quantity`, { valueAsNumber: true })} />
                          </FormField>
                        </Box>
                        <Box flex="2">
                          <FormField label="قیمت واحد (تومان)" error={err?.price?.message}>
                            <Input type="number" min={0} step={1000} {...register(`items.${index}.price`, { valueAsNumber: true })} />
                          </FormField>
                        </Box>
                        <Box flex="2">
                          <Text fontSize="sm" fontWeight="medium" mb="1.5">
                            جمع ردیف
                          </Text>
                          <Text py="2">{formatPrice((Number(row?.quantity) || 0) * (Number(row?.price) || 0))}</Text>
                        </Box>
                        <IconButton
                          aria-label="حذف ردیف"
                          variant="ghost"
                          colorPalette="red"
                          alignSelf={{ base: 'flex-end', md: 'center' }}
                          disabled={fields.length === 1}
                          onClick={() => remove(index)}
                        >
                          <LuTrash2 />
                        </IconButton>
                      </Flex>
                    )
                  })}
                </Stack>
                {errors.items?.root?.message && (
                  <Text color="fg.error" fontSize="sm" mt="2">
                    {errors.items.root.message}
                  </Text>
                )}
              </Box>

              <Flex justify="space-between" align="flex-end" wrap="wrap" gap="4">
                <Box w="40">
                  <FormField label="تخفیف (٪)" error={errors.discount?.message}>
                    <Input type="number" min={0} max={100} {...register('discount', { valueAsNumber: true })} />
                  </FormField>
                </Box>
                <Stack gap="1" textAlign="end">
                  <Text color="fg.muted" fontSize="sm">
                    جمع: {formatPrice(subtotal)}
                  </Text>
                  <Text fontSize="lg" fontWeight="bold">
                    مبلغ نهایی: {formatPrice(Math.round(total))}
                  </Text>
                </Stack>
              </Flex>

              <HStack>
                <Button type="submit" colorPalette="blue" loading={isSubmitting}>
                  ثبت فاکتور
                </Button>
              </HStack>
            </Stack>
          </form>
        </Card.Body>
      </Card.Root>
      <SubmittedValues values={submitted} />
    </>
  )
}
