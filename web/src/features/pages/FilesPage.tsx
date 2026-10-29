import { useState, type ReactNode } from 'react'
import {
  Box,
  Breadcrumb,
  Button,
  Card,
  Center,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Menu,
  Portal,
  Progress,
  SegmentGroup,
  SimpleGrid,
  Stack,
  Table,
  Text,
} from '@chakra-ui/react'
import {
  LuCloudUpload,
  LuEllipsisVertical,
  LuFile,
  LuFileImage,
  LuFileSpreadsheet,
  LuFileText,
  LuFileVideo,
  LuFolder,
  LuFolderPlus,
  LuLayoutGrid,
  LuList,
  LuSearch,
} from 'react-icons/lu'
import { PageHeader } from '@/components/PageHeader'

const folders = [
  { name: 'اسناد', count: 128, size: '۲٫۴ گیگ', color: 'blue' },
  { name: 'تصاویر', count: 842, size: '۸٫۱ گیگ', color: 'purple' },
  { name: 'ویدیوها', count: 36, size: '۱۲٫۶ گیگ', color: 'red' },
  { name: 'پروژه‌ها', count: 54, size: '۴٫۳ گیگ', color: 'green' },
]

const files = [
  { name: 'گزارش-مالی-۱۴۰۵.xlsx', type: 'sheet', size: '۲٫۱ مگ', date: '۷ آبان ۱۴۰۵', owner: 'علی احمدی' },
  { name: 'طرح-داشبورد.png', type: 'image', size: '۴٫۸ مگ', date: '۶ آبان ۱۴۰۵', owner: 'مریم رضایی' },
  { name: 'قرارداد-همکاری.pdf', type: 'doc', size: '۸۲۰ ک', date: '۵ آبان ۱۴۰۵', owner: 'رضا محمدی' },
  { name: 'معرفی-محصول.mp4', type: 'video', size: '۱۲۴ مگ', date: '۳ آبان ۱۴۰۵', owner: 'سارا کریمی' },
  { name: 'یادداشت-جلسه.docx', type: 'doc', size: '۴۵ ک', date: '۱ آبان ۱۴۰۵', owner: 'محمد حسینی' },
  { name: 'لوگو-نهایی.svg', type: 'image', size: '۱۲ ک', date: '۲۸ مهر ۱۴۰۵', owner: 'نگار صادقی' },
  { name: 'پشتیبان.zip', type: 'other', size: '۱٫۲ گیگ', date: '۲۵ مهر ۱۴۰۵', owner: 'سیستم' },
  { name: 'لیست-مشتریان.csv', type: 'sheet', size: '۳۱۰ ک', date: '۲۰ مهر ۱۴۰۵', owner: 'علی احمدی' },
]

const typeMeta: Record<string, { icon: ReactNode; color: string }> = {
  sheet: { icon: <LuFileSpreadsheet />, color: 'green' },
  image: { icon: <LuFileImage />, color: 'purple' },
  doc: { icon: <LuFileText />, color: 'blue' },
  video: { icon: <LuFileVideo />, color: 'red' },
  other: { icon: <LuFile />, color: 'gray' },
}

function FileMenu() {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton variant="ghost" size="xs" aria-label="گزینه‌ها">
          <LuEllipsisVertical />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="open">باز کردن</Menu.Item>
            <Menu.Item value="share">اشتراک‌گذاری</Menu.Item>
            <Menu.Item value="rename">تغییر نام</Menu.Item>
            <Menu.Separator />
            <Menu.Item value="delete" color="fg.error">
              حذف
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export function FilesPage() {
  const [view, setView] = useState<string | null>('list')

  return (
    <>
      <PageHeader
        title="مدیریت فایل"
        description="۲۷٫۴ گیگابایت از ۵۰ گیگابایت استفاده شده"
        actions={
          <HStack>
            <Button variant="outline" size="sm">
              <LuFolderPlus /> پوشه‌ی جدید
            </Button>
            <Button colorPalette="blue" size="sm">
              <LuCloudUpload /> آپلود
            </Button>
          </HStack>
        }
      />
      <Progress.Root value={55} size="sm" colorPalette="blue" mb="6">
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>

      <SimpleGrid columns={{ base: 2, md: 4 }} gap="4" mb="6">
        {folders.map((f) => (
          <Card.Root key={f.name} size="sm" cursor="pointer" _hover={{ shadow: 'md' }} transition="box-shadow 0.15s">
            <Card.Body gap="3">
              <HStack justify="space-between">
                <Center boxSize="10" rounded="lg" bg={`${f.color}.subtle`} color={`${f.color}.fg`} fontSize="xl">
                  <LuFolder />
                </Center>
                <FileMenu />
              </HStack>
              <Box>
                <Text fontWeight="semibold">{f.name}</Text>
                <Text fontSize="xs" color="fg.muted">
                  {f.count} فایل · {f.size}
                </Text>
              </Box>
            </Card.Body>
          </Card.Root>
        ))}
      </SimpleGrid>

      <Card.Root>
        <Card.Header>
          <Flex justify="space-between" wrap="wrap" gap="3">
            <Breadcrumb.Root>
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">فایل‌های من</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.CurrentLink>اخیر</Breadcrumb.CurrentLink>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
            <HStack>
              <InputGroup startElement={<LuSearch />} maxW="56">
                <Input size="sm" placeholder="جستجوی فایل" />
              </InputGroup>
              <SegmentGroup.Root size="sm" value={view} onValueChange={(e) => setView(e.value)}>
                <SegmentGroup.Indicator />
                <SegmentGroup.Items
                  items={[
                    { value: 'list', label: <LuList aria-label="لیست" /> },
                    { value: 'grid', label: <LuLayoutGrid aria-label="شبکه" /> },
                  ]}
                />
              </SegmentGroup.Root>
            </HStack>
          </Flex>
        </Card.Header>
        <Card.Body>
          {view === 'grid' ? (
            <SimpleGrid columns={{ base: 2, sm: 3, lg: 4, xl: 6 }} gap="4">
              {files.map((f) => (
                <Stack key={f.name} borderWidth="1px" rounded="lg" p="3" gap="3" _hover={{ bg: 'bg.subtle' }}>
                  <Center h="20" rounded="md" bg={`${typeMeta[f.type].color}.subtle`} color={`${typeMeta[f.type].color}.fg`} fontSize="3xl">
                    {typeMeta[f.type].icon}
                  </Center>
                  <Box minW="0">
                    <Text fontSize="sm" fontWeight="medium" truncate>
                      {f.name}
                    </Text>
                    <Text fontSize="xs" color="fg.muted">
                      {f.size}
                    </Text>
                  </Box>
                </Stack>
              ))}
            </SimpleGrid>
          ) : (
            <Table.ScrollArea>
              <Table.Root size="sm" interactive>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>نام</Table.ColumnHeader>
                    <Table.ColumnHeader>مالک</Table.ColumnHeader>
                    <Table.ColumnHeader>تاریخ تغییر</Table.ColumnHeader>
                    <Table.ColumnHeader>حجم</Table.ColumnHeader>
                    <Table.ColumnHeader w="10" />
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {files.map((f) => (
                    <Table.Row key={f.name}>
                      <Table.Cell>
                        <HStack>
                          <Box color={`${typeMeta[f.type].color}.fg`} fontSize="lg">
                            {typeMeta[f.type].icon}
                          </Box>
                          <Text fontWeight="medium">{f.name}</Text>
                        </HStack>
                      </Table.Cell>
                      <Table.Cell color="fg.muted">{f.owner}</Table.Cell>
                      <Table.Cell color="fg.muted">{f.date}</Table.Cell>
                      <Table.Cell color="fg.muted">{f.size}</Table.Cell>
                      <Table.Cell>
                        <FileMenu />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Table.ScrollArea>
          )}
        </Card.Body>
      </Card.Root>
    </>
  )
}
