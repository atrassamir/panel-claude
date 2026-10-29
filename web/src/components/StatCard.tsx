import type { ReactNode } from 'react'
import { Badge, Card, Center, HStack, Stat } from '@chakra-ui/react'

type Props = {
  label: string
  value: string
  icon: ReactNode
  color: string
  change?: string
  up?: boolean
  help?: string
}

export function StatCard({ label, value, icon, color, change, up = true, help = 'نسبت به ماه قبل' }: Props) {
  return (
    <Card.Root>
      <Card.Body>
        <HStack justify="space-between" align="start">
          <Stat.Root>
            <Stat.Label>{label}</Stat.Label>
            <Stat.ValueText fontSize="2xl">{value}</Stat.ValueText>
            {change && (
              <HStack gap="1">
                <Badge colorPalette={up ? 'green' : 'red'} variant="plain" px="0" gap="0">
                  {up ? <Stat.UpIndicator /> : <Stat.DownIndicator />}
                  {change}
                </Badge>
                <Stat.HelpText>{help}</Stat.HelpText>
              </HStack>
            )}
          </Stat.Root>
          <Center boxSize="10" rounded="lg" bg={`${color}.subtle`} color={`${color}.fg`} fontSize="lg" flexShrink={0}>
            {icon}
          </Center>
        </HStack>
      </Card.Body>
    </Card.Root>
  )
}
