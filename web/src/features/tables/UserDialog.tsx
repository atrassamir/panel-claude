import { useEffect } from 'react'
import { Button, CloseButton, Dialog, Input, NativeSelect, Portal, Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormField } from '@/components/FormField'
import { roleLabels, statusMeta, type User } from '@/data/users'

const schema = z.object({
  name: z.string().trim().min(2, 'نام را وارد کنید'),
  email: z.email('ایمیل معتبر نیست'),
  role: z.enum(['admin', 'editor', 'viewer']),
  status: z.enum(['active', 'inactive', 'pending']),
})

export type UserFormValues = z.infer<typeof schema>

type Props = {
  open: boolean
  /** User being edited; `null` creates a new one. */
  user: User | null
  onClose: () => void
  onSave: (values: UserFormValues) => void
}

const emptyValues: UserFormValues = { name: '', email: '', role: 'viewer', status: 'active' }

export function UserDialog({ open, user, onClose, onSave }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({ resolver: zodResolver(schema), defaultValues: emptyValues })

  useEffect(() => {
    if (open) reset(user ?? emptyValues)
  }, [open, user, reset])

  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <form onSubmit={handleSubmit(onSave)} noValidate>
              <Dialog.Header>
                <Dialog.Title>{user ? 'ویرایش کاربر' : 'کاربر جدید'}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap="4">
                  <FormField label="نام" error={errors.name?.message} required>
                    <Input {...register('name')} />
                  </FormField>
                  <FormField label="ایمیل" error={errors.email?.message} required>
                    <Input type="email" dir="ltr" {...register('email')} />
                  </FormField>
                  <FormField label="نقش">
                    <NativeSelect.Root>
                      <NativeSelect.Field {...register('role')}>
                        {Object.entries(roleLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </FormField>
                  <FormField label="وضعیت">
                    <NativeSelect.Root>
                      <NativeSelect.Field {...register('status')}>
                        {Object.entries(statusMeta).map(([value, meta]) => (
                          <option key={value} value={value}>
                            {meta.label}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </FormField>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="outline" onClick={onClose}>
                  انصراف
                </Button>
                <Button type="submit" colorPalette="blue">
                  ذخیره
                </Button>
              </Dialog.Footer>
            </form>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
