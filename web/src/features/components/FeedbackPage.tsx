import {
  Alert,
  Box,
  Button,
  CloseButton,
  EmptyState,
  HStack,
  Progress,
  ProgressCircle,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spinner,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { LuInbox, LuPlus } from 'react-icons/lu'
import { PageHeader } from '@/components/PageHeader'
import { DemoRow, DemoSection } from '@/components/Showcase'
import { toaster } from '@/components/ui/toaster-store'

const statuses = [
  { status: 'info', title: 'نسخه‌ی جدید در دسترس است', desc: 'برای دریافت امکانات تازه صفحه را دوباره بارگذاری کنید.' },
  { status: 'success', title: 'تغییرات ذخیره شد', desc: 'تنظیمات شما با موفقیت به‌روز شد.' },
  { status: 'warning', title: 'فضای ذخیره‌سازی رو به اتمام است', desc: '۹۰٪ از فضای شما استفاده شده است.' },
  { status: 'error', title: 'پرداخت ناموفق بود', desc: 'اطلاعات کارت را بررسی کنید و دوباره تلاش کنید.' },
] as const

export function FeedbackPage() {
  const showPromise = () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 2000))
    toaster.promise(promise, {
      loading: { title: 'در حال آپلود…', description: 'لطفاً صبر کنید' },
      success: { title: 'آپلود کامل شد' },
      error: { title: 'آپلود ناموفق بود' },
    })
  }

  return (
    <>
      <PageHeader title="بازخورد و وضعیت" description="Alert، Toast، Progress، Spinner، Skeleton و Empty state" />
      <Stack gap="6">
        <DemoSection title="هشدار (Alert)">
          {(['subtle', 'surface', 'outline', 'solid'] as const).map((variant) => (
            <Stack key={variant} gap="3">
              {statuses.map((s) => (
                <Alert.Root key={s.status} status={s.status} variant={variant}>
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Title>{s.title}</Alert.Title>
                    <Alert.Description>{s.desc}</Alert.Description>
                  </Alert.Content>
                  <CloseButton pos="relative" top="-2" insetEnd="-2" size="sm" />
                </Alert.Root>
              ))}
            </Stack>
          ))}
          <Alert.Root status="info" variant="surface" alignItems="center">
            <Alert.Indicator />
            <Alert.Title flex="1">حساب شما هنوز تأیید نشده است.</Alert.Title>
            <Button size="xs" colorPalette="blue">
              تأیید ایمیل
            </Button>
          </Alert.Root>
        </DemoSection>

        <DemoSection title="اعلان (Toast)" description="روی هر دکمه کلیک کنید">
          <DemoRow>
            <Button variant="outline" colorPalette="green" onClick={() => toaster.create({ type: 'success', title: 'با موفقیت ذخیره شد' })}>
              موفق
            </Button>
            <Button
              variant="outline"
              colorPalette="red"
              onClick={() => toaster.create({ type: 'error', title: 'خطا در ارتباط', description: 'اتصال اینترنت را بررسی کنید', closable: true })}
            >
              خطا
            </Button>
            <Button variant="outline" colorPalette="orange" onClick={() => toaster.create({ type: 'warning', title: 'نشست شما به‌زودی منقضی می‌شود' })}>
              هشدار
            </Button>
            <Button variant="outline" colorPalette="blue" onClick={() => toaster.create({ type: 'info', title: 'یک پیام جدید دارید' })}>
              اطلاعات
            </Button>
            <Button variant="outline" onClick={showPromise}>
              بارگذاری → موفق
            </Button>
          </DemoRow>
        </DemoSection>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
          <DemoSection title="نوار پیشرفت">
            {[
              { v: 25, c: 'blue', label: 'آپلود فایل' },
              { v: 60, c: 'green', label: 'تکمیل پروفایل' },
              { v: 85, c: 'orange', label: 'فضای مصرفی' },
            ].map((p) => (
              <Progress.Root key={p.label} value={p.v} colorPalette={p.c}>
                <HStack justify="space-between" mb="1">
                  <Progress.Label>{p.label}</Progress.Label>
                  <Progress.ValueText />
                </HStack>
                <Progress.Track>
                  <Progress.Range />
                </Progress.Track>
              </Progress.Root>
            ))}
            <Progress.Root value={70} striped animated colorPalette="purple" size="lg">
              <Progress.Track>
                <Progress.Range />
              </Progress.Track>
            </Progress.Root>
            <Progress.Root value={null} size="xs" colorPalette="blue">
              <Progress.Track>
                <Progress.Range />
              </Progress.Track>
            </Progress.Root>
          </DemoSection>

          <DemoSection title="پیشرفت دایره‌ای و Spinner">
            <DemoRow label="ProgressCircle">
              {[
                { v: 30, c: 'red' },
                { v: 55, c: 'orange' },
                { v: 80, c: 'green' },
              ].map((p) => (
                <ProgressCircle.Root key={p.v} value={p.v} size="xl" colorPalette={p.c}>
                  <ProgressCircle.Circle>
                    <ProgressCircle.Track />
                    <ProgressCircle.Range strokeLinecap="round" />
                  </ProgressCircle.Circle>
                  <ProgressCircle.ValueText />
                </ProgressCircle.Root>
              ))}
              <ProgressCircle.Root value={null} size="md" colorPalette="blue">
                <ProgressCircle.Circle>
                  <ProgressCircle.Track />
                  <ProgressCircle.Range />
                </ProgressCircle.Circle>
              </ProgressCircle.Root>
            </DemoRow>
            <DemoRow label="Spinner">
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
                <Spinner key={s} size={s} color="blue.solid" />
              ))}
              <Spinner size="lg" color="purple.solid" borderWidth="4px" animationDuration="0.8s" />
              <VStack gap="1">
                <Spinner color="teal.solid" />
                <Box fontSize="xs" color="fg.muted">
                  در حال بارگذاری…
                </Box>
              </VStack>
            </DemoRow>
          </DemoSection>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
          <DemoSection title="اسکلت بارگذاری (Skeleton)">
            <HStack gap="4">
              <SkeletonCircle size="12" />
              <SkeletonText noOfLines={2} flex="1" />
            </HStack>
            <Skeleton h="32" rounded="lg" />
            <SkeletonText noOfLines={3} gap="3" />
          </DemoSection>

          <DemoSection title="حالت خالی (Empty state)">
            <EmptyState.Root>
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <LuInbox />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                  <EmptyState.Title>هنوز پروژه‌ای ندارید</EmptyState.Title>
                  <EmptyState.Description>اولین پروژه‌ی خود را بسازید تا اینجا نمایش داده شود.</EmptyState.Description>
                </VStack>
                <Button colorPalette="blue" size="sm">
                  <LuPlus /> پروژه‌ی جدید
                </Button>
              </EmptyState.Content>
            </EmptyState.Root>
          </DemoSection>
        </SimpleGrid>
      </Stack>
    </>
  )
}
