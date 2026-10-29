import type { ReactNode } from 'react'
import { Field, Fieldset } from '@chakra-ui/react'

type Props = {
  label: string
  error?: string
  helper?: string
  required?: boolean
  children: ReactNode
}

/** Label + control + error/helper text, wired to Chakra's Field for accessibility. */
export function FormField({ label, error, helper, required, children }: Props) {
  return (
    <Field.Root invalid={!!error} required={required}>
      <Field.Label>
        {label}
        <Field.RequiredIndicator />
      </Field.Label>
      {children}
      {error ? <Field.ErrorText>{error}</Field.ErrorText> : helper && <Field.HelperText>{helper}</Field.HelperText>}
    </Field.Root>
  )
}

/**
 * Same as FormField but for groups of controls (radio/checkbox groups).
 * Field.Root would give every control in the group the same id, so groups
 * use Fieldset instead.
 */
export function FormFieldGroup({ label, error, helper, children }: Omit<Props, 'required'>) {
  return (
    <Fieldset.Root invalid={!!error}>
      <Fieldset.Legend fontSize="sm" fontWeight="medium" color="fg">
        {label}
      </Fieldset.Legend>
      {children}
      {error ? <Fieldset.ErrorText>{error}</Fieldset.ErrorText> : helper && <Fieldset.HelperText>{helper}</Fieldset.HelperText>}
    </Fieldset.Root>
  )
}
