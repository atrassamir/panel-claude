import { useState } from 'react'
import { Badge, Card, Flex, HStack, SegmentGroup, Stack, Switch, Table, Text } from '@chakra-ui/react'
import { PageHeader } from '@/components/PageHeader'
import { sampleProducts } from '@/data/products'
import { formatNumber, formatPrice } from '@/lib/format'

type Variant = 'line' | 'outline'
type Size = 'sm' | 'md' | 'lg'

function ToggleSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <Switch.Root size="sm" checked={checked} onCheckedChange={(e) => onChange(e.checked)}>
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>{label}</Switch.Label>
    </Switch.Root>
  )
}

export function BasicTablePage() {
  const [variant, setVariant] = useState<Variant>('line')
  const [size, setSize] = useState<Size>('md')
  const [striped, setStriped] = useState(false)
  const [interactive, setInteractive] = useState(true)
  const [showColumnBorder, setShowColumnBorder] = useState(false)

  const totalStock = sampleProducts.reduce((s, p) => s + p.stock, 0)

  return (
    <>
      <PageHeader title="جدول ساده" description="جدول ثابت با تنظیمات ظاهری مختلف" />

      <Card.Root mb="6">
        <Card.Body>
          <Flex gap="6" wrap="wrap" align="center">
            <Stack gap="1">
              <Text fontSize="xs" color="fg.muted">
                نوع
              </Text>
              <SegmentGroup.Root size="sm" value={variant} onValueChange={(e) => e.value && setVariant(e.value as Variant)}>
                <SegmentGroup.Indicator />
                <SegmentGroup.Items
                  items={[
                    { value: 'line', label: 'خطی' },
                    { value: 'outline', label: 'حاشیه‌دار' },
                  ]}
                />
              </SegmentGroup.Root>
            </Stack>
            <Stack gap="1">
              <Text fontSize="xs" color="fg.muted">
                اندازه
              </Text>
              <SegmentGroup.Root size="sm" value={size} onValueChange={(e) => e.value && setSize(e.value as Size)}>
                <SegmentGroup.Indicator />
                <SegmentGroup.Items
                  items={[
                    { value: 'sm', label: 'کوچک' },
                    { value: 'md', label: 'متوسط' },
                    { value: 'lg', label: 'بزرگ' },
                  ]}
                />
              </SegmentGroup.Root>
            </Stack>
            <HStack gap="5" wrap="wrap">
              <ToggleSwitch label="راه‌راه" checked={striped} onChange={setStriped} />
              <ToggleSwitch label="هایلایت ردیف" checked={interactive} onChange={setInteractive} />
              <ToggleSwitch label="خط ستون‌ها" checked={showColumnBorder} onChange={setShowColumnBorder} />
            </HStack>
          </Flex>
        </Card.Body>
      </Card.Root>

      <Card.Root>
        <Card.Body>
          <Table.ScrollArea>
            <Table.Root
              variant={variant}
              size={size}
              striped={striped}
              interactive={interactive}
              showColumnBorder={showColumnBorder}
            >
              <Table.Caption captionSide="top" textAlign="start" mt="0" mb="3">
                فهرست محصولات انبار
              </Table.Caption>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>#</Table.ColumnHeader>
                  <Table.ColumnHeader>محصول</Table.ColumnHeader>
                  <Table.ColumnHeader>دسته‌بندی</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end">قیمت</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end">موجودی</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {sampleProducts.map((p) => (
                  <Table.Row key={p.id}>
                    <Table.Cell>{formatNumber(p.id)}</Table.Cell>
                    <Table.Cell fontWeight="medium">{p.name}</Table.Cell>
                    <Table.Cell>{p.category}</Table.Cell>
                    <Table.Cell textAlign="end">{formatPrice(p.price)}</Table.Cell>
                    <Table.Cell textAlign="end">
                      {p.stock === 0 ? <Badge colorPalette="red">ناموجود</Badge> : formatNumber(p.stock)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.Cell colSpan={4} fontWeight="bold">
                    جمع موجودی
                  </Table.Cell>
                  <Table.Cell textAlign="end" fontWeight="bold">
                    {formatNumber(totalStock)}
                  </Table.Cell>
                </Table.Row>
              </Table.Footer>
            </Table.Root>
          </Table.ScrollArea>
        </Card.Body>
      </Card.Root>
    </>
  )
}
