import { Avatar, AvatarGroup, Badge, Float, HStack, Kbd, Stack, Status, Tag, Text } from '@chakra-ui/react'
import { LuCheck, LuCircleAlert, LuStar, LuUser } from 'react-icons/lu'
import { PageHeader } from '@/components/PageHeader'
import { DemoRow, DemoSection } from '@/components/Showcase'
import { demoColors } from '@/data/demo'

const names = ['علی احمدی', 'مریم رضایی', 'رضا محمدی', 'سارا کریمی', 'محمد حسینی', 'زهرا موسوی']
const avatarColors = ['blue', 'green', 'purple', 'orange', 'pink', 'teal']

export function BadgesPage() {
  return (
    <>
      <PageHeader title="نشان، تگ و آواتار" description="Badge، Tag، Avatar، Status و Kbd" />
      <Stack gap="6">
        <DemoSection title="نشان (Badge)">
          {(['solid', 'subtle', 'surface', 'outline'] as const).map((v) => (
            <DemoRow key={v} label={v}>
              {demoColors.map((c) => (
                <Badge key={c} variant={v} colorPalette={c}>
                  {c}
                </Badge>
              ))}
            </DemoRow>
          ))}
          <DemoRow label="اندازه‌ها و آیکون">
            {(['xs', 'sm', 'md', 'lg'] as const).map((s) => (
              <Badge key={s} size={s} colorPalette="green">
                <LuCheck /> تأیید شده
              </Badge>
            ))}
            <Badge colorPalette="red" variant="solid" rounded="full">
              ۹۹+
            </Badge>
            <Badge colorPalette="yellow">
              <LuStar /> ویژه
            </Badge>
          </DemoRow>
        </DemoSection>

        <DemoSection title="تگ (Tag)">
          {(['subtle', 'solid', 'outline', 'surface'] as const).map((v) => (
            <DemoRow key={v} label={v}>
              {['react', 'chakra', 'typescript', 'vite'].map((t, i) => (
                <Tag.Root key={t} variant={v} colorPalette={['blue', 'teal', 'purple', 'orange'][i]}>
                  <Tag.Label>{t}</Tag.Label>
                </Tag.Root>
              ))}
            </DemoRow>
          ))}
          <DemoRow label="قابل حذف و با آیکون">
            {['طراحی', 'توسعه', 'بازاریابی'].map((t) => (
              <Tag.Root key={t} size="lg" colorPalette="blue">
                <Tag.StartElement>
                  <LuUser />
                </Tag.StartElement>
                <Tag.Label>{t}</Tag.Label>
                <Tag.EndElement>
                  <Tag.CloseTrigger />
                </Tag.EndElement>
              </Tag.Root>
            ))}
          </DemoRow>
          <DemoRow label="اندازه‌ها">
            {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
              <Tag.Root key={s} size={s}>
                <Tag.Label>اندازه {s}</Tag.Label>
              </Tag.Root>
            ))}
          </DemoRow>
        </DemoSection>

        <DemoSection title="آواتار">
          <DemoRow label="اندازه‌ها">
            {(['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((s, i) => (
              <Avatar.Root key={s} size={s} colorPalette={avatarColors[i % avatarColors.length]}>
                <Avatar.Fallback name={names[i % names.length]} />
              </Avatar.Root>
            ))}
          </DemoRow>
          <DemoRow label="انواع و شکل‌ها">
            {(['solid', 'subtle', 'outline'] as const).map((v) => (
              <Avatar.Root key={v} variant={v} colorPalette="purple">
                <Avatar.Fallback name="نگار صادقی" />
              </Avatar.Root>
            ))}
            <Avatar.Root shape="rounded" colorPalette="teal">
              <Avatar.Fallback name="امیر جعفری" />
            </Avatar.Root>
            <Avatar.Root shape="square" colorPalette="orange">
              <Avatar.Fallback name="فاطمه کریمی" />
            </Avatar.Root>
            <Avatar.Root>
              <Avatar.Fallback />
            </Avatar.Root>
          </DemoRow>
          <DemoRow label="با وضعیت">
            {[
              { color: 'green', label: 'آنلاین' },
              { color: 'orange', label: 'مشغول' },
              { color: 'gray', label: 'آفلاین' },
            ].map((s, i) => (
              <Avatar.Root key={s.label} size="lg" colorPalette={avatarColors[i]}>
                <Avatar.Fallback name={names[i]} />
                <Float placement="bottom-start" offsetX="1" offsetY="1">
                  <Status.Root size="md" colorPalette={s.color} aria-label={s.label}>
                    <Status.Indicator boxSize="3" outline="2px solid" outlineColor="bg" />
                  </Status.Root>
                </Float>
              </Avatar.Root>
            ))}
          </DemoRow>
          <DemoRow label="گروه آواتار">
            <AvatarGroup size="md" stacking="last-on-top">
              {names.slice(0, 4).map((n, i) => (
                <Avatar.Root key={n} colorPalette={avatarColors[i]}>
                  <Avatar.Fallback name={n} />
                </Avatar.Root>
              ))}
              <Avatar.Root variant="solid">
                <Avatar.Fallback>+۵</Avatar.Fallback>
              </Avatar.Root>
            </AvatarGroup>
          </DemoRow>
        </DemoSection>

        <DemoSection title="وضعیت و کلید">
          <DemoRow label="Status">
            {[
              { c: 'green', t: 'فعال' },
              { c: 'orange', t: 'در انتظار' },
              { c: 'red', t: 'خطا' },
              { c: 'blue', t: 'در حال اجرا' },
              { c: 'gray', t: 'غیرفعال' },
            ].map((s) => (
              <Status.Root key={s.t} colorPalette={s.c}>
                <Status.Indicator />
                {s.t}
              </Status.Root>
            ))}
          </DemoRow>
          <DemoRow label="Kbd">
            <HStack dir="ltr">
              <Kbd>Ctrl</Kbd>+<Kbd>K</Kbd>
            </HStack>
            <HStack dir="ltr">
              <Kbd>⌘</Kbd>
              <Kbd>Shift</Kbd>
              <Kbd>P</Kbd>
            </HStack>
            <Text fontSize="sm">
              برای ذخیره <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd> را بزنید
            </Text>
          </DemoRow>
          <DemoRow label="نشان روی آیکون">
            <HStack position="relative" p="2">
              <LuCircleAlert size="24" />
              <Float>
                <Badge size="xs" variant="solid" colorPalette="red" rounded="full">
                  ۳
                </Badge>
              </Float>
            </HStack>
          </DemoRow>
        </DemoSection>
      </Stack>
    </>
  )
}
