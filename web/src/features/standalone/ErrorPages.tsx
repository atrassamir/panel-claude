import type { ReactNode } from 'react'
import { Button, Center, Heading, HStack, Progress, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { LuArrowRight, LuRefreshCw, LuWrench } from 'react-icons/lu'

function ErrorLayout({ code, title, text, actions, color }: { code: ReactNode; title: string; text: string; actions: ReactNode; color: string }) {
  return (
    <Center minH="100vh" p="6">
      <Stack gap="6" align="center" textAlign="center" maxW="lg">
        <Text
          fontSize={{ base: '7xl', md: '9xl' }}
          fontWeight="black"
          lineHeight="1"
          bgGradient="to-l"
          gradientFrom={`${color}.400`}
          gradientTo={`${color}.700`}
          bgClip="text"
          color="transparent"
        >
          {code}
        </Text>
        <Heading size="2xl">{title}</Heading>
        <Text color="fg.muted">{text}</Text>
        <HStack>{actions}</HStack>
      </Stack>
    </Center>
  )
}

const homeButton = (
  <Button asChild colorPalette="blue">
    <Link to="/">
      <LuArrowRight /> بازگشت به داشبورد
    </Link>
  </Button>
)

export function NotFoundErrorPage() {
  return (
    <ErrorLayout
      code="۴۰۴"
      color="blue"
      title="صفحه پیدا نشد"
      text="صفحه‌ای که دنبالش هستید وجود ندارد، جابه‌جا شده یا آدرس اشتباه وارد شده است."
      actions={homeButton}
    />
  )
}

export function ServerErrorPage() {
  return (
    <ErrorLayout
      code="۵۰۰"
      color="red"
      title="خطای سرور"
      text="مشکلی در سمت سرور پیش آمده است. تیم ما در حال بررسی است؛ لطفاً چند دقیقه‌ی دیگر دوباره تلاش کنید."
      actions={
        <>
          <Button variant="outline" onClick={() => window.location.reload()}>
            <LuRefreshCw /> تلاش دوباره
          </Button>
          {homeButton}
        </>
      }
    />
  )
}

export function MaintenancePage() {
  return (
    <ErrorLayout
      code={<LuWrench />}
      color="orange"
      title="در حال به‌روزرسانی هستیم"
      text="سامانه برای ارتقا موقتاً در دسترس نیست. زمان تقریبی بازگشت: ساعت ۱۴:۰۰."
      actions={
        <Stack w="64" gap="2">
          <Progress.Root value={65} striped animated colorPalette="orange">
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
          <Text fontSize="xs" color="fg.muted">
            ۶۵٪ انجام شده
          </Text>
        </Stack>
      }
    />
  )
}
