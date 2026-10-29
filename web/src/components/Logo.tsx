import { Center, HStack, Text } from '@chakra-ui/react'
import { LuHexagon } from 'react-icons/lu'

export function Logo({ compact }: { compact?: boolean }) {
  return (
    <HStack gap="2">
      <Center boxSize="8" rounded="lg" bg="blue.solid" color="blue.contrast" flexShrink={0}>
        <LuHexagon />
      </Center>
      {!compact && (
        <Text fontWeight="bold" fontSize="lg" whiteSpace="nowrap">
          پنل مدیریت
        </Text>
      )}
    </HStack>
  )
}
