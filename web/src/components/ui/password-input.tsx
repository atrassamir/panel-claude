import { useState, type ComponentProps } from 'react'
import { IconButton, Input, InputGroup } from '@chakra-ui/react'
import { LuEye, LuEyeOff } from 'react-icons/lu'

export function PasswordInput(props: ComponentProps<typeof Input>) {
  const [visible, setVisible] = useState(false)
  return (
    <InputGroup
      endElement={
        <IconButton
          variant="ghost"
          size="xs"
          aria-label={visible ? 'پنهان کردن رمز' : 'نمایش رمز'}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <LuEyeOff /> : <LuEye />}
        </IconButton>
      }
    >
      <Input {...props} type={visible ? 'text' : 'password'} dir="ltr" />
    </InputGroup>
  )
}
