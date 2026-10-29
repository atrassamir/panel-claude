import { useState } from 'react'
import {
  Avatar,
  Button,
  CloseButton,
  Dialog,
  Drawer,
  HoverCard,
  HStack,
  Input,
  Link,
  Menu,
  Popover,
  Portal,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import {
  LuChevronLeft,
  LuCopy,
  LuEllipsis,
  LuFileText,
  LuFolderOpen,
  LuPencil,
  LuShare2,
  LuTrash2,
} from 'react-icons/lu'
import { FormField } from '@/components/FormField'
import { PageHeader } from '@/components/PageHeader'
import { DemoRow, DemoSection } from '@/components/Showcase'
import { Tooltip } from '@/components/ui/tooltip'

function DemoDialog({ size, label, placement }: { size?: Dialog.RootProps['size']; label: string; placement?: Dialog.RootProps['placement'] }) {
  return (
    <Dialog.Root size={size} placement={placement}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          {label}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>دعوت عضو جدید</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap="4">
                <Text color="fg.muted">ایمیل همکار خود را وارد کنید تا دعوت‌نامه برایش ارسال شود.</Text>
                <FormField label="ایمیل">
                  <Input dir="ltr" placeholder="name@example.com" />
                </FormField>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">انصراف</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="blue">ارسال دعوت</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

function DemoDrawer({ placement, label }: { placement: Drawer.RootProps['placement']; label: string }) {
  return (
    <Drawer.Root placement={placement}>
      <Drawer.Trigger asChild>
        <Button variant="outline" size="sm">
          {label}
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>فیلترها</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Stack gap="4">
                <FormField label="نام مشتری">
                  <Input />
                </FormField>
                <FormField label="توضیحات">
                  <Textarea />
                </FormField>
              </Stack>
            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.ActionTrigger asChild>
                <Button variant="outline">بستن</Button>
              </Drawer.ActionTrigger>
              <Button colorPalette="blue">اعمال</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

export function OverlaysPage() {
  const [columns, setColumns] = useState(['نام', 'ایمیل', 'نقش'])

  return (
    <>
      <PageHeader title="پنجره‌ها و منوها" description="Dialog، Drawer، Popover، Tooltip، HoverCard و Menu" />
      <Stack gap="6">
        <DemoSection title="پنجره (Dialog)">
          <DemoRow label="اندازه‌ها">
            {(['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((s) => (
              <DemoDialog key={s} size={s} label={s} />
            ))}
          </DemoRow>
          <DemoRow label="محل نمایش">
            <DemoDialog placement="top" label="بالا" />
            <DemoDialog placement="center" label="وسط" />
            <DemoDialog placement="bottom" label="پایین" />
          </DemoRow>
          <DemoRow label="پنجره‌ی تأیید">
            <Dialog.Root role="alertdialog" size="sm">
              <Dialog.Trigger asChild>
                <Button colorPalette="red" variant="subtle" size="sm">
                  <LuTrash2 /> حذف حساب
                </Button>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>حساب حذف شود؟</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                      <Text color="fg.muted">همه‌ی اطلاعات شما برای همیشه پاک می‌شود و قابل بازگشت نیست.</Text>
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.ActionTrigger asChild>
                        <Button variant="outline">انصراف</Button>
                      </Dialog.ActionTrigger>
                      <Button colorPalette="red">بله، حذف شود</Button>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          </DemoRow>
        </DemoSection>

        <DemoSection title="کشو (Drawer)">
          <DemoRow>
            <DemoDrawer placement="start" label="از راست" />
            <DemoDrawer placement="end" label="از چپ" />
            <DemoDrawer placement="top" label="از بالا" />
            <DemoDrawer placement="bottom" label="از پایین" />
          </DemoRow>
        </DemoSection>

        <DemoSection title="Popover و Tooltip">
          <DemoRow label="Popover">
            <Popover.Root>
              <Popover.Trigger asChild>
                <Button size="sm" variant="outline">
                  <LuShare2 /> اشتراک‌گذاری
                </Button>
              </Popover.Trigger>
              <Portal>
                <Popover.Positioner>
                  <Popover.Content>
                    <Popover.Arrow>
                      <Popover.ArrowTip />
                    </Popover.Arrow>
                    <Popover.Body>
                      <Popover.Title fontWeight="medium" mb="2">
                        لینک اشتراک‌گذاری
                      </Popover.Title>
                      <HStack>
                        <Input size="sm" dir="ltr" readOnly value="https://panel.example.com/r/42" />
                        <Button size="sm" colorPalette="blue">
                          <LuCopy />
                        </Button>
                      </HStack>
                    </Popover.Body>
                    <Popover.CloseTrigger asChild>
                      <CloseButton size="xs" />
                    </Popover.CloseTrigger>
                  </Popover.Content>
                </Popover.Positioner>
              </Portal>
            </Popover.Root>
          </DemoRow>
          <DemoRow label="Tooltip در چهار جهت">
            {(
              [
                { p: 'top', l: 'بالا' },
                { p: 'bottom', l: 'پایین' },
                { p: 'right', l: 'راست' },
                { p: 'left', l: 'چپ' },
              ] as const
            ).map((t) => (
              <Tooltip key={t.p} content={`راهنما در ${t.l}`} positioning={{ placement: t.p }} showArrow>
                <Button size="sm" variant="subtle">
                  {t.l}
                </Button>
              </Tooltip>
            ))}
          </DemoRow>
          <DemoRow label="کارت شناور (HoverCard)">
            <Text fontSize="sm">
              این مطلب توسط{' '}
              <HoverCard.Root>
                <HoverCard.Trigger asChild>
                  <Link href="#" colorPalette="blue" color="colorPalette.fg">
                    مریم رضایی
                  </Link>
                </HoverCard.Trigger>
                <Portal>
                  <HoverCard.Positioner>
                    <HoverCard.Content maxW="72">
                      <HoverCard.Arrow>
                        <HoverCard.ArrowTip />
                      </HoverCard.Arrow>
                      <Stack gap="3">
                        <HStack gap="3">
                          <Avatar.Root colorPalette="pink">
                            <Avatar.Fallback name="مریم رضایی" />
                          </Avatar.Root>
                          <Stack gap="0">
                            <Text fontWeight="semibold">مریم رضایی</Text>
                            <Text fontSize="xs" color="fg.muted">
                              طراح محصول
                            </Text>
                          </Stack>
                        </HStack>
                        <Text fontSize="sm" color="fg.muted">
                          طراحی رابط کاربری و سیستم‌های طراحی برای محصولات وب.
                        </Text>
                        <HStack fontSize="sm" gap="4">
                          <Text>
                            <b>۱۲۴</b> دنبال‌کننده
                          </Text>
                          <Text>
                            <b>۳۸</b> پروژه
                          </Text>
                        </HStack>
                      </Stack>
                    </HoverCard.Content>
                  </HoverCard.Positioner>
                </Portal>
              </HoverCard.Root>{' '}
              نوشته شده است.
            </Text>
          </DemoRow>
        </DemoSection>

        <DemoSection title="منو (Menu)">
          <DemoRow>
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button size="sm" variant="outline">
                  <LuEllipsis /> عملیات
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="edit">
                      <LuPencil /> ویرایش
                      <Menu.ItemCommand>Ctrl+E</Menu.ItemCommand>
                    </Menu.Item>
                    <Menu.Item value="copy">
                      <LuCopy /> کپی
                      <Menu.ItemCommand>Ctrl+C</Menu.ItemCommand>
                    </Menu.Item>
                    <Menu.Root positioning={{ placement: 'left-start', gutter: 2 }}>
                      <Menu.TriggerItem>
                        <LuFolderOpen /> انتقال به
                        <LuChevronLeft style={{ marginInlineStart: 'auto' }} />
                      </Menu.TriggerItem>
                      <Portal>
                        <Menu.Positioner>
                          <Menu.Content>
                            <Menu.Item value="docs">
                              <LuFileText /> اسناد
                            </Menu.Item>
                            <Menu.Item value="archive">
                              <LuFolderOpen /> بایگانی
                            </Menu.Item>
                          </Menu.Content>
                        </Menu.Positioner>
                      </Portal>
                    </Menu.Root>
                    <Menu.Separator />
                    <Menu.Item value="delete" color="fg.error">
                      <LuTrash2 /> حذف
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>

            <Menu.Root>
              <Menu.Trigger asChild>
                <Button size="sm" variant="outline">
                  ستون‌ها
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.ItemGroup>
                      <Menu.ItemGroupLabel>نمایش ستون‌ها</Menu.ItemGroupLabel>
                      {['نام', 'ایمیل', 'نقش', 'تاریخ'].map((c) => (
                        <Menu.CheckboxItem
                          key={c}
                          value={c}
                          checked={columns.includes(c)}
                          onCheckedChange={(on) => setColumns((cols) => (on ? [...cols, c] : cols.filter((x) => x !== c)))}
                        >
                          {c}
                          <Menu.ItemIndicator />
                        </Menu.CheckboxItem>
                      ))}
                    </Menu.ItemGroup>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>

            <Menu.Root>
              <Menu.ContextTrigger w="full" maxW="sm">
                <Stack p="6" borderWidth="1px" borderStyle="dashed" rounded="md" align="center" color="fg.muted" fontSize="sm">
                  اینجا راست‌کلیک کنید
                </Stack>
              </Menu.ContextTrigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="new">فایل جدید</Menu.Item>
                    <Menu.Item value="folder">پوشه‌ی جدید</Menu.Item>
                    <Menu.Item value="refresh">بازخوانی</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          </DemoRow>
        </DemoSection>
      </Stack>
    </>
  )
}
