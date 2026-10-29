import { Box, Grid, Heading, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { PageHeader } from '@/components/PageHeader'
import { DemoSection } from '@/components/Showcase'
import { demoColors } from '@/data/demo'

const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
const semantic = [
  { token: 'bg', label: 'پس‌زمینه' },
  { token: 'bg.subtle', label: 'پس‌زمینه ملایم' },
  { token: 'bg.muted', label: 'پس‌زمینه کم‌رنگ' },
  { token: 'bg.emphasized', label: 'پس‌زمینه پررنگ' },
  { token: 'bg.panel', label: 'پنل' },
  { token: 'bg.inverted', label: 'معکوس' },
  { token: 'bg.error', label: 'خطا' },
  { token: 'bg.warning', label: 'هشدار' },
  { token: 'bg.success', label: 'موفق' },
  { token: 'bg.info', label: 'اطلاعات' },
]
const fgTokens = ['fg', 'fg.muted', 'fg.subtle', 'fg.error', 'fg.warning', 'fg.success', 'fg.info']
const headingSizes = ['6xl', '5xl', '4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'sm'] as const
const textSizes = ['xl', 'lg', 'md', 'sm', 'xs'] as const
const weights = [
  { w: 'normal', label: 'معمولی' },
  { w: 'medium', label: 'متوسط' },
  { w: 'semibold', label: 'نیمه‌ضخیم' },
  { w: 'bold', label: 'ضخیم' },
] as const
const radii = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full']
const shadows = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']

export function FoundationsPage() {
  return (
    <>
      <PageHeader title="رنگ و تایپوگرافی" description="پایه‌های ظاهری: پالت رنگ، توکن‌های معنایی، تایپوگرافی، گردی و سایه" />
      <Stack gap="6">
        <DemoSection title="پالت رنگ" description="ده رنگ پایه، هر کدام در ۱۱ درجه">
          <Box overflowX="auto">
            <Grid templateColumns={`5rem repeat(${shades.length}, minmax(3rem, 1fr))`} gap="1.5" minW="2xl">
              <Box />
              {shades.map((s) => (
                <Text key={s} fontSize="xs" color="fg.muted" textAlign="center" dir="ltr">
                  {s}
                </Text>
              ))}
              {demoColors.map((c) => (
                <Box key={c} display="contents">
                  <Text fontSize="sm" alignSelf="center" dir="ltr" textAlign="end">
                    {c}
                  </Text>
                  {shades.map((s) => (
                    <Box key={s} h="10" rounded="md" bg={`${c}.${s}`} borderWidth={s === '50' ? '1px' : undefined} />
                  ))}
                </Box>
              ))}
            </Grid>
          </Box>
        </DemoSection>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
          <DemoSection title="توکن‌های پس‌زمینه" description="در حالت روشن و تیره خودکار تغییر می‌کنند">
            <SimpleGrid columns={{ base: 2, sm: 3 }} gap="3">
              {semantic.map((t) => (
                <Stack key={t.token} gap="1">
                  <Box h="12" rounded="md" bg={t.token} borderWidth="1px" />
                  <Text fontSize="xs">{t.label}</Text>
                  <Text fontSize="xs" color="fg.muted" dir="ltr" textAlign="end">
                    {t.token}
                  </Text>
                </Stack>
              ))}
            </SimpleGrid>
          </DemoSection>
          <DemoSection title="توکن‌های متن">
            <Stack gap="3">
              {fgTokens.map((t) => (
                <HStack key={t} justify="space-between" borderBottomWidth="1px" pb="2">
                  <Text color={t}>این یک متن نمونه است</Text>
                  <Text fontSize="xs" color="fg.muted" dir="ltr">
                    {t}
                  </Text>
                </HStack>
              ))}
            </Stack>
          </DemoSection>
        </SimpleGrid>

        <DemoSection title="تیترها" description="اندازه‌های Heading">
          <Stack gap="3">
            {headingSizes.map((size) => (
              <HStack key={size} gap="6" align="baseline">
                <Text w="10" fontSize="xs" color="fg.muted" dir="ltr" flexShrink={0}>
                  {size}
                </Text>
                <Heading size={size} lineClamp={1}>
                  طراحی خوب دیده نمی‌شود
                </Heading>
              </HStack>
            ))}
          </Stack>
        </DemoSection>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
          <DemoSection title="متن">
            <Stack gap="3">
              {textSizes.map((size) => (
                <HStack key={size} gap="6" align="baseline">
                  <Text w="10" fontSize="xs" color="fg.muted" dir="ltr" flexShrink={0}>
                    {size}
                  </Text>
                  <Text fontSize={size}>پنل مدیریت با رابط کاربری فارسی و راست‌به‌چپ</Text>
                </HStack>
              ))}
            </Stack>
          </DemoSection>
          <DemoSection title="وزن فونت">
            <Stack gap="3">
              {weights.map(({ w, label }) => (
                <HStack key={w} justify="space-between">
                  <Text fontSize="lg" fontWeight={w}>
                    وزیرمتن — {label}
                  </Text>
                  <Text fontSize="xs" color="fg.muted" dir="ltr">
                    {w}
                  </Text>
                </HStack>
              ))}
            </Stack>
          </DemoSection>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
          <DemoSection title="گردی گوشه‌ها">
            <SimpleGrid columns={{ base: 3, sm: 5 }} gap="4">
              {radii.map((r) => (
                <Stack key={r} align="center" gap="1">
                  <Box boxSize="14" bg="blue.subtle" borderWidth="2px" borderColor="blue.solid" rounded={r} />
                  <Text fontSize="xs" color="fg.muted" dir="ltr">
                    {r}
                  </Text>
                </Stack>
              ))}
            </SimpleGrid>
          </DemoSection>
          <DemoSection title="سایه‌ها">
            <SimpleGrid columns={{ base: 2, sm: 3 }} gap="5">
              {shadows.map((s) => (
                <Stack key={s} align="center" gap="2">
                  <Box w="full" h="16" bg="bg.panel" rounded="lg" shadow={s} />
                  <Text fontSize="xs" color="fg.muted" dir="ltr">
                    {s}
                  </Text>
                </Stack>
              ))}
            </SimpleGrid>
          </DemoSection>
        </SimpleGrid>
      </Stack>
    </>
  )
}
