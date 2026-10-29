import { Avatar, Badge, Box, Button, Card, Grid, HStack, Progress, SimpleGrid, Stack, Tabs, Tag, Text, Timeline } from '@chakra-ui/react'
import { LuBriefcase, LuCalendar, LuGlobe, LuMail, LuMapPin, LuMessageSquare, LuPencil, LuPhone, LuUserPlus } from 'react-icons/lu'
import { useAuthStore } from '@/stores/auth'
import { formatNumber } from '@/lib/format'

const activity = [
  { t: 'پروژه‌ی «بازطراحی داشبورد» را تکمیل کرد', d: '۲ ساعت پیش', c: 'green' },
  { t: 'روی تسک «صفحه‌ی پرداخت» نظر گذاشت', d: 'دیروز', c: 'blue' },
  { t: 'به تیم «طراحی محصول» پیوست', d: '۳ روز پیش', c: 'purple' },
  { t: 'فایل «راهنمای برند.pdf» را آپلود کرد', d: 'هفته‌ی پیش', c: 'orange' },
]

const projects = [
  { name: 'بازطراحی داشبورد', progress: 100, color: 'green', team: 4 },
  { name: 'اپلیکیشن موبایل', progress: 68, color: 'blue', team: 6 },
  { name: 'سیستم طراحی', progress: 42, color: 'purple', team: 3 },
  { name: 'وب‌سایت شرکتی', progress: 15, color: 'orange', team: 2 },
]

export function ProfilePage() {
  const user = useAuthStore((s) => s.user)
  const name = user?.name ?? 'کاربر'

  return (
    <Stack gap="6">
      <Card.Root overflow="hidden">
        <Box h={{ base: '28', md: '40' }} bgGradient="to-l" gradientFrom="blue.500" gradientVia="purple.500" gradientTo="pink.400" />
        <Card.Body pt="0">
          <HStack align="end" gap="5" mt={{ base: '-10', md: '-14' }} wrap="wrap">
            <Avatar.Root size="2xl" boxSize={{ base: '20', md: '28' }} colorPalette="blue" outline="4px solid" outlineColor="bg.panel">
              <Avatar.Fallback name={name} fontSize="3xl" />
            </Avatar.Root>
            <Stack gap="1" flex="1" minW="48" pb="1">
              <HStack>
                <Text fontSize="2xl" fontWeight="bold">
                  {name}
                </Text>
                <Badge colorPalette="blue">مدیر</Badge>
              </HStack>
              <HStack gap="4" color="fg.muted" fontSize="sm" wrap="wrap">
                <HStack gap="1">
                  <LuBriefcase /> طراح ارشد محصول
                </HStack>
                <HStack gap="1">
                  <LuMapPin /> تهران
                </HStack>
                <HStack gap="1">
                  <LuCalendar /> عضو از مهر ۱۴۰۲
                </HStack>
              </HStack>
            </Stack>
            <HStack pb="1">
              <Button variant="outline" size="sm">
                <LuMessageSquare /> پیام
              </Button>
              <Button colorPalette="blue" size="sm">
                <LuUserPlus /> دنبال کردن
              </Button>
            </HStack>
          </HStack>
        </Card.Body>
      </Card.Root>

      <Grid templateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(0, 1fr) minmax(0, 2fr)' }} gap="6" alignItems="start">
        <Stack gap="6">
          <Card.Root>
            <Card.Body>
              <SimpleGrid columns={3} textAlign="center">
                {[
                  ['۱۲۸', 'پروژه'],
                  ['۲٫۴ هزار', 'دنبال‌کننده'],
                  ['۳۱۲', 'دنبال‌شونده'],
                ].map(([v, l]) => (
                  <Stack key={l} gap="0">
                    <Text fontSize="xl" fontWeight="bold">
                      {v}
                    </Text>
                    <Text fontSize="xs" color="fg.muted">
                      {l}
                    </Text>
                  </Stack>
                ))}
              </SimpleGrid>
            </Card.Body>
          </Card.Root>
          <Card.Root>
            <Card.Header>
              <HStack justify="space-between">
                <Card.Title>درباره</Card.Title>
                <Button size="xs" variant="ghost">
                  <LuPencil /> ویرایش
                </Button>
              </HStack>
            </Card.Header>
            <Card.Body>
              <Stack gap="4" fontSize="sm">
                <Text color="fg.muted">
                  طراح محصول با ۸ سال تجربه در طراحی رابط کاربری پنل‌های سازمانی و سیستم‌های طراحی. علاقه‌مند به تایپوگرافی فارسی.
                </Text>
                {[
                  { icon: <LuMail />, v: user?.email ?? 'user@example.com' },
                  { icon: <LuPhone />, v: '۰۹۱۲ ۳۴۵ ۶۷۸۹' },
                  { icon: <LuGlobe />, v: 'example.com' },
                ].map((i) => (
                  <HStack key={i.v} gap="3" color="fg.muted">
                    {i.icon}
                    <Text color="fg">{i.v}</Text>
                  </HStack>
                ))}
              </Stack>
            </Card.Body>
          </Card.Root>
          <Card.Root>
            <Card.Header>
              <Card.Title>مهارت‌ها</Card.Title>
            </Card.Header>
            <Card.Body>
              <HStack wrap="wrap" gap="2">
                {['Figma', 'React', 'طراحی تعامل', 'تحقیق کاربر', 'Design System', 'تایپوگرافی', 'پروتوتایپ'].map((s) => (
                  <Tag.Root key={s} variant="surface">
                    <Tag.Label>{s}</Tag.Label>
                  </Tag.Root>
                ))}
              </HStack>
            </Card.Body>
          </Card.Root>
        </Stack>

        <Card.Root>
          <Card.Body>
            <Tabs.Root defaultValue="activity" variant="line">
              <Tabs.List>
                <Tabs.Trigger value="activity">فعالیت‌ها</Tabs.Trigger>
                <Tabs.Trigger value="projects">پروژه‌ها</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="activity" pt="6">
                <Timeline.Root size="sm">
                  {activity.map((a) => (
                    <Timeline.Item key={a.t}>
                      <Timeline.Connector>
                        <Timeline.Separator />
                        <Timeline.Indicator colorPalette={a.c} bg="colorPalette.solid" />
                      </Timeline.Connector>
                      <Timeline.Content>
                        <Timeline.Title>{a.t}</Timeline.Title>
                        <Timeline.Description>{a.d}</Timeline.Description>
                      </Timeline.Content>
                    </Timeline.Item>
                  ))}
                </Timeline.Root>
              </Tabs.Content>
              <Tabs.Content value="projects" pt="6">
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                  {projects.map((p) => (
                    <Card.Root key={p.name} variant="outline" size="sm">
                      <Card.Body gap="3">
                        <HStack justify="space-between">
                          <Text fontWeight="semibold">{p.name}</Text>
                          <Badge colorPalette={p.color}>{p.progress === 100 ? 'تکمیل' : 'در حال انجام'}</Badge>
                        </HStack>
                        <Progress.Root value={p.progress} size="xs" colorPalette={p.color}>
                          <Progress.Track>
                            <Progress.Range />
                          </Progress.Track>
                        </Progress.Root>
                        <Text fontSize="xs" color="fg.muted">
                          {formatNumber(p.team)} نفر در تیم · {formatNumber(p.progress)}٪ پیشرفت
                        </Text>
                      </Card.Body>
                    </Card.Root>
                  ))}
                </SimpleGrid>
              </Tabs.Content>
            </Tabs.Root>
          </Card.Body>
        </Card.Root>
      </Grid>
    </Stack>
  )
}
