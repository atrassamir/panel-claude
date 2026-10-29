import type { ReactNode } from 'react'
import { Portal, Tooltip as ChakraTooltip } from '@chakra-ui/react'

type Props = ChakraTooltip.RootProps & {
  content: ReactNode
  children: ReactNode
  showArrow?: boolean
  disabled?: boolean
}

export function Tooltip({ content, children, showArrow, disabled, ...rest }: Props) {
  if (disabled) return children
  return (
    <ChakraTooltip.Root openDelay={200} {...rest}>
      <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
      <Portal>
        <ChakraTooltip.Positioner>
          <ChakraTooltip.Content>
            {showArrow && (
              <ChakraTooltip.Arrow>
                <ChakraTooltip.ArrowTip />
              </ChakraTooltip.Arrow>
            )}
            {content}
          </ChakraTooltip.Content>
        </ChakraTooltip.Positioner>
      </Portal>
    </ChakraTooltip.Root>
  )
}
