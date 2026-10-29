import { Button, ButtonGroup, CloseButton, Group, IconButton, Link, Stack, Toggle } from '@chakra-ui/react'
import {
  LuArrowLeft,
  LuBold,
  LuDownload,
  LuHeart,
  LuItalic,
  LuMail,
  LuPlus,
  LuSettings,
  LuShare2,
  LuTrash2,
  LuUnderline,
  LuChevronDown,
} from 'react-icons/lu'
import { PageHeader } from '@/components/PageHeader'
import { DemoRow, DemoSection } from '@/components/Showcase'
import { demoColors } from '@/data/demo'

const variants = ['solid', 'subtle', 'surface', 'outline', 'ghost', 'plain'] as const
const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

export function ButtonsPage() {
  return (
    <>
      <PageHeader title="دکمه‌ها" description="انواع، اندازه‌ها، رنگ‌ها و حالت‌های دکمه" />
      <Stack gap="6">
        <DemoSection title="انواع (Variant)">
          <DemoRow>
            {variants.map((v) => (
              <Button key={v} variant={v} colorPalette="blue">
                {v}
              </Button>
            ))}
          </DemoRow>
        </DemoSection>

        <DemoSection title="رنگ‌ها" description="هر رنگ در سه حالت solid، subtle و outline">
          {demoColors.map((c) => (
            <DemoRow key={c} label={c}>
              <Button colorPalette={c}>ذخیره</Button>
              <Button colorPalette={c} variant="subtle">
                ذخیره
              </Button>
              <Button colorPalette={c} variant="outline">
                ذخیره
              </Button>
            </DemoRow>
          ))}
        </DemoSection>

        <DemoSection title="اندازه‌ها">
          <DemoRow>
            {sizes.map((s) => (
              <Button key={s} size={s} colorPalette="blue">
                دکمه {s}
              </Button>
            ))}
          </DemoRow>
        </DemoSection>

        <DemoSection title="با آیکون و حالت‌ها">
          <DemoRow label="آیکون">
            <Button colorPalette="blue">
              <LuPlus /> افزودن
            </Button>
            <Button variant="outline">
              <LuDownload /> دانلود
            </Button>
            <Button variant="subtle" colorPalette="green">
              <LuMail /> ارسال ایمیل
            </Button>
            <Button variant="ghost" colorPalette="red">
              <LuTrash2 /> حذف
            </Button>
            <Button variant="outline">
              ادامه <LuArrowLeft />
            </Button>
          </DemoRow>
          <DemoRow label="در حال بارگذاری و غیرفعال">
            <Button loading colorPalette="blue">
              ذخیره
            </Button>
            <Button loading loadingText="در حال ارسال…" variant="outline">
              ارسال
            </Button>
            <Button disabled colorPalette="blue">
              غیرفعال
            </Button>
            <Button disabled variant="outline">
              غیرفعال
            </Button>
          </DemoRow>
          <DemoRow label="گرد و تمام‌عرض">
            <Button rounded="full" colorPalette="purple">
              گرد
            </Button>
            <Button rounded="full" variant="outline" colorPalette="purple">
              گرد
            </Button>
          </DemoRow>
          <Button w="full" colorPalette="blue">
            دکمه‌ی تمام‌عرض
          </Button>
        </DemoSection>

        <DemoSection title="دکمه‌ی آیکونی">
          <DemoRow label="انواع">
            {variants.map((v) => (
              <IconButton key={v} variant={v} colorPalette="blue" aria-label="پسندیدن">
                <LuHeart />
              </IconButton>
            ))}
          </DemoRow>
          <DemoRow label="اندازه‌ها و گرد">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
              <IconButton key={s} size={s} rounded="full" variant="subtle" aria-label="تنظیمات">
                <LuSettings />
              </IconButton>
            ))}
          </DemoRow>
          <DemoRow label="دکمه‌ی بستن">
            <CloseButton size="sm" />
            <CloseButton variant="outline" />
            <CloseButton variant="subtle" colorPalette="red" />
          </DemoRow>
        </DemoSection>

        <DemoSection title="گروه دکمه‌ها">
          <DemoRow label="کنار هم">
            <ButtonGroup variant="outline" size="sm">
              <Button>روز</Button>
              <Button>هفته</Button>
              <Button>ماه</Button>
            </ButtonGroup>
          </DemoRow>
          <DemoRow label="چسبیده">
            <Group attached>
              <Button variant="outline">کپی</Button>
              <Button variant="outline">ویرایش</Button>
              <Button variant="outline">حذف</Button>
            </Group>
            <Group attached>
              <Button colorPalette="blue">
                <LuShare2 /> انتشار
              </Button>
              <IconButton colorPalette="blue" aria-label="گزینه‌های بیشتر">
                <LuChevronDown />
              </IconButton>
            </Group>
          </DemoRow>
          <DemoRow label="دکمه‌ی دوحالته (Toggle)">
            <Group attached>
              {[
                { icon: <LuBold />, label: 'ضخیم' },
                { icon: <LuItalic />, label: 'کج' },
                { icon: <LuUnderline />, label: 'زیرخط' },
              ].map((t, i) => (
                <Toggle.Root key={t.label} asChild defaultPressed={i === 0}>
                  <IconButton variant={{ base: 'outline', _pressed: 'solid' }} aria-label={t.label}>
                    {t.icon}
                  </IconButton>
                </Toggle.Root>
              ))}
            </Group>
          </DemoRow>
        </DemoSection>

        <DemoSection title="لینک">
          <DemoRow>
            <Link href="#">لینک ساده</Link>
            <Link href="#" variant="underline">
              لینک زیرخط‌دار
            </Link>
            <Link href="#" colorPalette="blue" color="colorPalette.fg">
              لینک رنگی
            </Link>
          </DemoRow>
        </DemoSection>
      </Stack>
    </>
  )
}
