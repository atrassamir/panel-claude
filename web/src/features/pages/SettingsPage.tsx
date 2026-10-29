import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Input,
  NativeSelect,
  Separator,
  SimpleGrid,
  Stack,
  Switch,
  Tabs,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { LuBell, LuCreditCard, LuLaptop, LuShield, LuSmartphone, LuUser } from 'react-icons/lu'
import { FormField } from '@/components/FormField'
import { PageHeader } from '@/components/PageHeader'
import { PasswordInput } from '@/components/ui/password-input'
import { toaster } from '@/components/ui/toaster-store'

function SettingRow({ title, description, defaultChecked }: { title: string; description: string; defaultChecked?: boolean }) {
  return (
    <Flex justify="space-between" align="center" gap="4" py="3">
      <Box>
        <Text fontWeight="medium" fontSize="sm">
          {title}
        </Text>
        <Text color="fg.muted" fontSize="sm">
          {description}
        </Text>
      </Box>
      <Switch.Root defaultChecked={defaultChecked} colorPalette="blue">
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Root>
    </Flex>
  )
}

const save = () => toaster.create({ type: 'success', title: 'تغییرات ذخیره شد' })

export function SettingsPage() {
  return (
    <>
      <PageHeader title="تنظیمات حساب" description="اطلاعات شخصی، اعلان‌ها، امنیت و صورت‌حساب" />
      <Tabs.Root defaultValue="account" orientation="vertical" variant="subtle" display={{ base: 'block', md: 'flex' }} gap="6">
        <Tabs.List minW={{ md: '52' }} maxW="full" mb={{ base: '4', md: 0 }} flexDirection={{ base: 'row', md: 'column' }} overflowX="auto">
          <Tabs.Trigger value="account">
            <LuUser /> حساب کاربری
          </Tabs.Trigger>
          <Tabs.Trigger value="notifications">
            <LuBell /> اعلان‌ها
          </Tabs.Trigger>
          <Tabs.Trigger value="security">
            <LuShield /> امنیت
          </Tabs.Trigger>
          <Tabs.Trigger value="billing">
            <LuCreditCard /> صورت‌حساب
          </Tabs.Trigger>
        </Tabs.List>

        <Box flex="1" minW="0">
          <Tabs.Content value="account" pt="0">
            <Card.Root>
              <Card.Header>
                <Card.Title>اطلاعات شخصی</Card.Title>
                <Card.Description>این اطلاعات در پروفایل عمومی شما نمایش داده می‌شود.</Card.Description>
              </Card.Header>
              <Card.Body>
                <Stack gap="5">
                  <HStack gap="4">
                    <Avatar.Root size="xl" colorPalette="blue">
                      <Avatar.Fallback name="مدیر سیستم" />
                    </Avatar.Root>
                    <Stack gap="2">
                      <HStack>
                        <Button size="sm" variant="outline">
                          تغییر تصویر
                        </Button>
                        <Button size="sm" variant="ghost" colorPalette="red">
                          حذف
                        </Button>
                      </HStack>
                      <Text fontSize="xs" color="fg.muted">
                        JPG یا PNG، حداکثر ۲ مگابایت
                      </Text>
                    </Stack>
                  </HStack>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                    <FormField label="نام">
                      <Input defaultValue="مدیر" />
                    </FormField>
                    <FormField label="نام خانوادگی">
                      <Input defaultValue="سیستم" />
                    </FormField>
                    <FormField label="ایمیل">
                      <Input dir="ltr" defaultValue="admin@example.com" />
                    </FormField>
                    <FormField label="زبان">
                      <NativeSelect.Root>
                        <NativeSelect.Field defaultValue="fa">
                          <option value="fa">فارسی</option>
                          <option value="en">English</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    </FormField>
                  </SimpleGrid>
                  <FormField label="بیوگرافی" helper="حداکثر ۲۰۰ کاراکتر">
                    <Textarea rows={3} defaultValue="طراح محصول و علاقه‌مند به سیستم‌های طراحی." />
                  </FormField>
                </Stack>
              </Card.Body>
              <Card.Footer justifyContent="flex-end">
                <Button variant="outline">انصراف</Button>
                <Button colorPalette="blue" onClick={save}>
                  ذخیره تغییرات
                </Button>
              </Card.Footer>
            </Card.Root>
          </Tabs.Content>

          <Tabs.Content value="notifications" pt="0">
            <Card.Root>
              <Card.Header>
                <Card.Title>اعلان‌ها</Card.Title>
                <Card.Description>انتخاب کنید درباره‌ی چه چیزهایی باخبر شوید.</Card.Description>
              </Card.Header>
              <Card.Body>
                <Stack separator={<Separator />} gap="0">
                  <SettingRow title="سفارش‌های جدید" description="با ثبت هر سفارش ایمیل دریافت کنید" defaultChecked />
                  <SettingRow title="نظرات" description="وقتی کسی روی کار شما نظر می‌دهد" defaultChecked />
                  <SettingRow title="گزارش هفتگی" description="خلاصه‌ی عملکرد هر شنبه" />
                  <SettingRow title="اخبار محصول" description="امکانات جدید و به‌روزرسانی‌ها" />
                  <SettingRow title="اعلان پیامکی" description="برای رویدادهای مهم امنیتی" defaultChecked />
                </Stack>
              </Card.Body>
            </Card.Root>
          </Tabs.Content>

          <Tabs.Content value="security" pt="0">
            <Stack gap="6">
              <Card.Root>
                <Card.Header>
                  <Card.Title>تغییر رمز عبور</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Stack gap="4" maxW="md">
                    <FormField label="رمز فعلی">
                      <PasswordInput />
                    </FormField>
                    <FormField label="رمز جدید" helper="حداقل ۸ کاراکتر">
                      <PasswordInput />
                    </FormField>
                    <FormField label="تکرار رمز جدید">
                      <PasswordInput />
                    </FormField>
                  </Stack>
                </Card.Body>
                <Card.Footer>
                  <Button colorPalette="blue" onClick={save}>
                    به‌روزرسانی رمز
                  </Button>
                </Card.Footer>
              </Card.Root>
              <Card.Root>
                <Card.Header>
                  <Card.Title>نشست‌های فعال</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Stack separator={<Separator />} gap="0">
                    {[
                      { icon: <LuLaptop />, d: 'Chrome روی Windows', l: 'تهران · همین حالا', current: true },
                      { icon: <LuSmartphone />, d: 'Safari روی iPhone', l: 'اصفهان · ۲ ساعت پیش' },
                      { icon: <LuLaptop />, d: 'Firefox روی Ubuntu', l: 'شیراز · ۳ روز پیش' },
                    ].map((s) => (
                      <HStack key={s.d} py="3" gap="4">
                        <Box fontSize="xl" color="fg.muted">
                          {s.icon}
                        </Box>
                        <Box flex="1">
                          <HStack>
                            <Text fontSize="sm" fontWeight="medium" dir="ltr">
                              {s.d}
                            </Text>
                            {s.current && <Badge colorPalette="green">دستگاه فعلی</Badge>}
                          </HStack>
                          <Text fontSize="xs" color="fg.muted">
                            {s.l}
                          </Text>
                        </Box>
                        {!s.current && (
                          <Button size="xs" variant="outline" colorPalette="red">
                            خروج
                          </Button>
                        )}
                      </HStack>
                    ))}
                  </Stack>
                </Card.Body>
              </Card.Root>
              <Card.Root borderColor="border.error">
                <Card.Header>
                  <Card.Title color="fg.error">منطقه‌ی خطر</Card.Title>
                  <Card.Description>حذف حساب قابل بازگشت نیست.</Card.Description>
                </Card.Header>
                <Card.Footer>
                  <Button colorPalette="red" variant="outline">
                    حذف حساب
                  </Button>
                </Card.Footer>
              </Card.Root>
            </Stack>
          </Tabs.Content>

          <Tabs.Content value="billing" pt="0">
            <Stack gap="6">
              <Card.Root>
                <Card.Body>
                  <Flex justify="space-between" align="center" wrap="wrap" gap="4">
                    <Box>
                      <HStack>
                        <Text fontWeight="bold" fontSize="lg">
                          پلن حرفه‌ای
                        </Text>
                        <Badge colorPalette="blue">فعال</Badge>
                      </HStack>
                      <Text color="fg.muted" fontSize="sm">
                        تمدید بعدی: ۱ آذر ۱۴۰۵ · ۴۹۰٬۰۰۰ تومان در ماه
                      </Text>
                    </Box>
                    <HStack>
                      <Button variant="outline">لغو اشتراک</Button>
                      <Button colorPalette="blue">ارتقا</Button>
                    </HStack>
                  </Flex>
                </Card.Body>
              </Card.Root>
              <Card.Root>
                <Card.Header>
                  <Card.Title>روش پرداخت</Card.Title>
                </Card.Header>
                <Card.Body>
                  <HStack borderWidth="1px" rounded="lg" p="4" gap="4">
                    <Box px="3" py="2" rounded="md" bg="bg.inverted" color="fg.inverted" fontWeight="bold" fontSize="xs">
                      کارت
                    </Box>
                    <Box flex="1">
                      <Text fontWeight="medium" dir="ltr" textAlign="end">
                        •••• •••• •••• 4821
                      </Text>
                      <Text fontSize="xs" color="fg.muted">
                        بانک ملت · انقضا ۰۴/۰۷
                      </Text>
                    </Box>
                    <Button size="sm" variant="ghost">
                      ویرایش
                    </Button>
                  </HStack>
                </Card.Body>
              </Card.Root>
            </Stack>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </>
  )
}
