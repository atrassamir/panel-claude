import {
  AspectRatio,
  Avatar,
  Badge,
  Blockquote,
  Box,
  Button,
  Card,
  Clipboard,
  Code,
  createTreeCollection,
  DataList,
  Heading,
  Highlight,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Kbd,
  List,
  Marquee,
  QrCode,
  Separator,
  SimpleGrid,
  Stack,
  Stat,
  Text,
  Timeline,
  TreeView,
} from '@chakra-ui/react'
import {
  LuCircleCheck,
  LuCircleX,
  LuFile,
  LuFolder,
  LuGitBranch,
  LuHeart,
  LuMessageSquare,
  LuPackage,
  LuShip,
  LuTruck,
  LuChevronLeft,
} from 'react-icons/lu'
import { PageHeader } from '@/components/PageHeader'
import { DemoSection } from '@/components/Showcase'

type Node = { id: string; name: string; children?: Node[] }

const tree = createTreeCollection<Node>({
  nodeToValue: (n) => n.id,
  nodeToString: (n) => n.name,
  rootNode: {
    id: 'root',
    name: '',
    children: [
      {
        id: 'src',
        name: 'src',
        children: [
          { id: 'app', name: 'app', children: [{ id: 'router', name: 'router.tsx' }, { id: 'nav', name: 'navigation.tsx' }] },
          { id: 'components', name: 'components', children: [{ id: 'button', name: 'Button.tsx' }] },
          { id: 'main', name: 'main.tsx' },
        ],
      },
      { id: 'pkg', name: 'package.json' },
      { id: 'readme', name: 'README.md' },
    ],
  },
})

const gradients = [
  { from: 'blue.400', to: 'purple.500' },
  { from: 'teal.300', to: 'green.500' },
  { from: 'orange.300', to: 'pink.500' },
]

export function DataDisplayPage() {
  return (
    <>
      <PageHeader title="نمایش داده" description="Card، Stat، DataList، List، Timeline، TreeView و موارد دیگر" />
      <Stack gap="6">
        <DemoSection title="کارت‌ها">
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
            {(['elevated', 'outline', 'subtle'] as const).map((variant, i) => (
              <Card.Root key={variant} variant={variant} overflow="hidden">
                <AspectRatio ratio={16 / 9}>
                  <Box bgGradient="to-br" gradientFrom={gradients[i].from} gradientTo={gradients[i].to} />
                </AspectRatio>
                <Card.Body gap="2">
                  <HStack justify="space-between">
                    <Card.Title>مقاله‌ی شماره {i + 1}</Card.Title>
                    <Badge colorPalette={['blue', 'green', 'orange'][i]}>{variant}</Badge>
                  </HStack>
                  <Card.Description>چند نکته‌ی کاربردی برای طراحی رابط کاربری پنل‌های مدیریتی.</Card.Description>
                </Card.Body>
                <Card.Footer justifyContent="space-between">
                  <HStack color="fg.muted" fontSize="sm" gap="3">
                    <HStack gap="1">
                      <LuHeart /> ۲۴
                    </HStack>
                    <HStack gap="1">
                      <LuMessageSquare /> ۸
                    </HStack>
                  </HStack>
                  <Button size="xs" variant="ghost">
                    ادامه <LuChevronLeft />
                  </Button>
                </Card.Footer>
              </Card.Root>
            ))}
          </SimpleGrid>
          <Card.Root flexDirection={{ base: 'column', sm: 'row' }} overflow="hidden">
            <Box bgGradient="to-br" gradientFrom="purple.400" gradientTo="pink.400" minW="48" minH="32" />
            <Box>
              <Card.Body>
                <Card.Title mb="2">کارت افقی</Card.Title>
                <Card.Description>برای فهرست محصولات یا مقالات که تصویر در کنار متن قرار می‌گیرد.</Card.Description>
              </Card.Body>
              <Card.Footer>
                <Button size="sm" colorPalette="purple">
                  خرید
                </Button>
              </Card.Footer>
            </Box>
          </Card.Root>
        </DemoSection>

        <DemoSection title="آمار (Stat)">
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="4">
            {[
              { label: 'درآمد', value: '۴۸٫۲ م', diff: '۱۲٪', up: true },
              { label: 'کاربران جدید', value: '۱٬۲۴۰', diff: '۸٪', up: true },
              { label: 'نرخ بازگشت', value: '۳٫۴٪', diff: '۰٫۶٪', up: false },
              { label: 'میانگین سبد', value: '۸۲۰ ه', diff: '۲٪', up: true },
            ].map((s) => (
              <Stat.Root key={s.label} borderWidth="1px" p="4" rounded="lg">
                <Stat.Label>{s.label}</Stat.Label>
                <HStack>
                  <Stat.ValueText>{s.value}</Stat.ValueText>
                  <Badge colorPalette={s.up ? 'green' : 'red'} gap="0">
                    {s.up ? <Stat.UpIndicator /> : <Stat.DownIndicator />}
                    {s.diff}
                  </Badge>
                </HStack>
                <Stat.HelpText>نسبت به ماه قبل</Stat.HelpText>
              </Stat.Root>
            ))}
          </SimpleGrid>
        </DemoSection>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
          <DemoSection title="فهرست داده (DataList)">
            <DataList.Root orientation="horizontal" divideY="1px">
              {[
                ['نام', 'شرکت نمونه'],
                ['شناسه ملی', '۱۰۱۰۲۳۴۵۶۷۸'],
                ['تلفن', '۰۲۱-۸۸۷۷۶۶۵۵'],
                ['وضعیت', 'فعال'],
                ['تاریخ ثبت', '۱۲ مهر ۱۴۰۳'],
              ].map(([k, v]) => (
                <DataList.Item key={k} pt="3">
                  <DataList.ItemLabel>{k}</DataList.ItemLabel>
                  <DataList.ItemValue>{v}</DataList.ItemValue>
                </DataList.Item>
              ))}
            </DataList.Root>
          </DemoSection>

          <DemoSection title="لیست">
            <List.Root gap="2" variant="plain" align="center">
              {[
                { ok: true, t: 'پشتیبانی از راست‌به‌چپ' },
                { ok: true, t: 'تم روشن و تیره' },
                { ok: true, t: 'طراحی واکنش‌گرا' },
                { ok: false, t: 'بک‌اند واقعی' },
              ].map((i) => (
                <List.Item key={i.t}>
                  <List.Indicator asChild color={i.ok ? 'green.500' : 'red.500'}>
                    {i.ok ? <LuCircleCheck /> : <LuCircleX />}
                  </List.Indicator>
                  {i.t}
                </List.Item>
              ))}
            </List.Root>
            <Separator />
            <List.Root as="ol" ps="5">
              <List.Item>نصب وابستگی‌ها</List.Item>
              <List.Item>اجرای سرور توسعه</List.Item>
              <List.Item>ورود با حساب آزمایشی</List.Item>
            </List.Root>
          </DemoSection>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
          <DemoSection title="خط زمانی (Timeline)">
            <Timeline.Root>
              {[
                { icon: <LuPackage />, t: 'سفارش ثبت شد', d: '۱۰ آبان، ۰۹:۱۲', c: 'blue' },
                { icon: <LuShip />, t: 'بسته‌بندی و آماده‌ی ارسال', d: '۱۰ آبان، ۱۴:۳۰', c: 'purple' },
                { icon: <LuTruck />, t: 'تحویل به پست', d: '۱۱ آبان، ۰۸:۰۰', c: 'orange' },
                { icon: <LuCircleCheck />, t: 'تحویل داده شد', d: '۱۳ آبان، ۱۱:۴۵', c: 'green' },
              ].map((e) => (
                <Timeline.Item key={e.t}>
                  <Timeline.Connector>
                    <Timeline.Separator />
                    <Timeline.Indicator colorPalette={e.c} bg="colorPalette.solid" color="colorPalette.contrast">
                      {e.icon}
                    </Timeline.Indicator>
                  </Timeline.Connector>
                  <Timeline.Content>
                    <Timeline.Title>{e.t}</Timeline.Title>
                    <Timeline.Description>{e.d}</Timeline.Description>
                  </Timeline.Content>
                </Timeline.Item>
              ))}
            </Timeline.Root>
          </DemoSection>

          <DemoSection title="درخت (TreeView)">
            <TreeView.Root collection={tree} defaultExpandedValue={['src', 'app']} dir="ltr">
              <TreeView.Tree>
                <TreeView.Node<Node>
                  indentGuide={<TreeView.BranchIndentGuide />}
                  render={({ node, nodeState }) =>
                    nodeState.isBranch ? (
                      <TreeView.BranchControl>
                        <LuFolder />
                        <TreeView.BranchText>{node.name}</TreeView.BranchText>
                      </TreeView.BranchControl>
                    ) : (
                      <TreeView.Item>
                        <LuFile />
                        <TreeView.ItemText>{node.name}</TreeView.ItemText>
                      </TreeView.Item>
                    )
                  }
                />
              </TreeView.Tree>
            </TreeView.Root>
          </DemoSection>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
          <DemoSection title="نقل‌قول و متن">
            <Blockquote.Root variant="solid" colorPalette="blue">
              <Blockquote.Content>طراحی فقط ظاهر نیست؛ طراحی یعنی چگونه کار می‌کند.</Blockquote.Content>
              <Blockquote.Caption>
                — <cite>استیو جابز</cite>
              </Blockquote.Caption>
            </Blockquote.Root>
            <Heading size="md" lineHeight="tall">
              <Highlight query={['سریع', 'زیبا']} styles={{ px: '1', bg: 'yellow.subtle', color: 'yellow.fg', rounded: 'sm' }}>
                یک پنل مدیریت سریع و زیبا برای تیم شما
              </Highlight>
            </Heading>
            <Text fontSize="sm">
              برای نصب دستور <Code>npm install</Code> را اجرا کنید و با <Kbd>Ctrl</Kbd>+<Kbd>C</Kbd> متوقف کنید.
            </Text>
            <HStack>
              {(['subtle', 'surface', 'outline', 'solid'] as const).map((v) => (
                <Code key={v} variant={v} colorPalette="purple">
                  {v}
                </Code>
              ))}
            </HStack>
          </DemoSection>

          <DemoSection title="کیوآر کد و کپی">
            <HStack gap="6" align="start" wrap="wrap">
              <QrCode.Root value="https://github.com/atrassamir/panel-claude" size="lg">
                <QrCode.Frame>
                  <QrCode.Pattern />
                </QrCode.Frame>
              </QrCode.Root>
              <Stack flex="1" minW="56" gap="4">
                <Clipboard.Root value="sk-demo-4f9a2c71e8">
                  <Clipboard.Label fontSize="sm" mb="1">
                    کلید API
                  </Clipboard.Label>
                  <InputGroup endElement={<Clipboard.Trigger asChild><IconButton variant="ghost" size="xs" aria-label="کپی"><Clipboard.Indicator /></IconButton></Clipboard.Trigger>}>
                    <Clipboard.Input asChild>
                      <Input dir="ltr" readOnly />
                    </Clipboard.Input>
                  </InputGroup>
                </Clipboard.Root>
                <Clipboard.Root value="https://panel.example.com/invite/7Q2X">
                  <Clipboard.Trigger asChild>
                    <Button variant="surface" size="sm">
                      <Clipboard.Indicator />
                      <Clipboard.CopyText />
                    </Button>
                  </Clipboard.Trigger>
                </Clipboard.Root>
              </Stack>
            </HStack>
          </DemoSection>
        </SimpleGrid>

        <DemoSection title="نوار متحرک (Marquee)" description="مناسب برای لوگوی مشتریان">
          <Marquee.Root autoFill pauseOnInteraction>
            <Marquee.Edge side="start" />
            <Marquee.Viewport>
              <Marquee.Content>
                {['آلفا', 'بتا', 'گاما', 'دلتا', 'اپسیلون', 'زتا'].map((n) => (
                  <Marquee.Item key={n} px="6">
                    <HStack color="fg.muted" fontWeight="bold" fontSize="lg">
                      <LuGitBranch /> شرکت {n}
                    </HStack>
                  </Marquee.Item>
                ))}
              </Marquee.Content>
            </Marquee.Viewport>
            <Marquee.Edge side="end" />
          </Marquee.Root>
        </DemoSection>

        <DemoSection title="ترکیب: کارت پروفایل">
          <Card.Root maxW="sm" variant="outline">
            <Box h="20" bgGradient="to-l" gradientFrom="blue.400" gradientTo="teal.400" />
            <Card.Body pt="0">
              <Box position="relative" mt="-10" mb="3">
                <Avatar.Root size="2xl" colorPalette="blue" outline="4px solid" outlineColor="bg.panel">
                  <Avatar.Fallback name="نگار صادقی" />
                </Avatar.Root>
              </Box>
              <Heading size="md">نگار صادقی</Heading>
              <Text color="fg.muted" fontSize="sm">
                مدیر محصول · تهران
              </Text>
              <HStack mt="4" gap="6" fontSize="sm">
                <Stack gap="0">
                  <Text fontWeight="bold">۱۲۸</Text>
                  <Text color="fg.muted">پروژه</Text>
                </Stack>
                <Stack gap="0">
                  <Text fontWeight="bold">۲٫۴ هزار</Text>
                  <Text color="fg.muted">دنبال‌کننده</Text>
                </Stack>
              </HStack>
            </Card.Body>
          </Card.Root>
        </DemoSection>
      </Stack>
    </>
  )
}
