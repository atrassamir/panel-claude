import { useState, type DragEvent } from 'react'
import { AvatarGroup, Avatar, Badge, Box, Button, Card, Flex, HStack, IconButton, Stack, Text } from '@chakra-ui/react'
import { LuCalendar, LuMessageSquare, LuPaperclip, LuPlus, LuEllipsis } from 'react-icons/lu'
import { formatNumber } from '@/lib/format'
import { PageHeader } from '@/components/PageHeader'

type Task = { id: number; title: string; tag: string; color: string; comments: number; files: number; due: string; people: string[] }
type Column = { key: string; title: string; color: string; tasks: Task[] }

const initial: Column[] = [
  {
    key: 'todo',
    title: 'برای انجام',
    color: 'gray',
    tasks: [
      { id: 1, title: 'طراحی صفحه‌ی ورود جدید', tag: 'طراحی', color: 'purple', comments: 3, files: 2, due: '۱۲ آبان', people: ['مریم رضایی', 'علی احمدی'] },
      { id: 2, title: 'نوشتن مستندات API', tag: 'مستندات', color: 'gray', comments: 0, files: 1, due: '۱۵ آبان', people: ['رضا محمدی'] },
      { id: 3, title: 'بررسی بازخورد کاربران', tag: 'تحقیق', color: 'teal', comments: 7, files: 0, due: '۱۸ آبان', people: ['سارا کریمی', 'نگار صادقی', 'امیر جعفری'] },
    ],
  },
  {
    key: 'doing',
    title: 'در حال انجام',
    color: 'blue',
    tasks: [
      { id: 4, title: 'پیاده‌سازی داشبورد تحلیلی', tag: 'توسعه', color: 'blue', comments: 5, files: 3, due: '۱۰ آبان', people: ['محمد حسینی', 'علی احمدی'] },
      { id: 5, title: 'بهینه‌سازی سرعت بارگذاری', tag: 'فنی', color: 'orange', comments: 2, files: 0, due: '۱۱ آبان', people: ['رضا محمدی'] },
    ],
  },
  {
    key: 'review',
    title: 'بازبینی',
    color: 'orange',
    tasks: [{ id: 6, title: 'تم تیره برای نمودارها', tag: 'طراحی', color: 'purple', comments: 4, files: 1, due: '۹ آبان', people: ['مریم رضایی'] }],
  },
  {
    key: 'done',
    title: 'انجام شده',
    color: 'green',
    tasks: [
      { id: 7, title: 'راه‌اندازی پروژه با Vite', tag: 'توسعه', color: 'blue', comments: 1, files: 0, due: '۱ آبان', people: ['علی احمدی'] },
      { id: 8, title: 'انتخاب فونت و پالت رنگ', tag: 'طراحی', color: 'purple', comments: 6, files: 4, due: '۳ آبان', people: ['مریم رضایی', 'نگار صادقی'] },
    ],
  },
]

export function KanbanPage() {
  const [columns, setColumns] = useState(initial)
  const [dragging, setDragging] = useState<number | null>(null)
  const [over, setOver] = useState<string | null>(null)

  const drop = (e: DragEvent, to: string) => {
    e.preventDefault()
    setOver(null)
    if (dragging === null) return
    setColumns((cols) => {
      const task = cols.flatMap((c) => c.tasks).find((t) => t.id === dragging)
      if (!task) return cols
      return cols.map((c) => ({
        ...c,
        tasks: c.key === to ? [...c.tasks.filter((t) => t.id !== dragging), task] : c.tasks.filter((t) => t.id !== dragging),
      }))
    })
    setDragging(null)
  }

  return (
    <>
      <PageHeader
        title="کانبان"
        description="کارت‌ها را بین ستون‌ها بکشید و رها کنید"
        actions={
          <Button colorPalette="blue" size="sm">
            <LuPlus /> تسک جدید
          </Button>
        }
      />
      <Flex gap="4" overflowX="auto" pb="4" align="start">
        {columns.map((col) => (
          <Stack
            key={col.key}
            flex="1"
            minW="64"
            bg={over === col.key ? 'blue.subtle' : 'bg.muted'}
            rounded="xl"
            p="3"
            gap="3"
            transition="background 0.15s"
            onDragOver={(e) => {
              e.preventDefault()
              setOver(col.key)
            }}
            onDragLeave={() => setOver(null)}
            onDrop={(e) => drop(e, col.key)}
          >
            <HStack justify="space-between" px="1">
              <HStack>
                <Box boxSize="2.5" rounded="full" bg={`${col.color}.solid`} />
                <Text fontWeight="semibold" fontSize="sm">
                  {col.title}
                </Text>
                <Badge size="sm" variant="surface">
                  {formatNumber(col.tasks.length)}
                </Badge>
              </HStack>
              <IconButton variant="ghost" size="xs" aria-label="گزینه‌ها">
                <LuEllipsis />
              </IconButton>
            </HStack>
            {col.tasks.map((t) => (
              <Card.Root
                key={t.id}
                size="sm"
                draggable
                cursor="grab"
                opacity={dragging === t.id ? 0.5 : 1}
                onDragStart={() => setDragging(t.id)}
                onDragEnd={() => {
                  setDragging(null)
                  setOver(null)
                }}
                _hover={{ shadow: 'md' }}
              >
                <Card.Body gap="3">
                  <Badge colorPalette={t.color} alignSelf="start">
                    {t.tag}
                  </Badge>
                  <Text fontSize="sm" fontWeight="medium">
                    {t.title}
                  </Text>
                  <HStack justify="space-between">
                    <HStack gap="3" color="fg.muted" fontSize="xs">
                      <HStack gap="1">
                        <LuCalendar /> {t.due}
                      </HStack>
                      {t.comments > 0 && (
                        <HStack gap="1">
                          <LuMessageSquare /> {formatNumber(t.comments)}
                        </HStack>
                      )}
                      {t.files > 0 && (
                        <HStack gap="1">
                          <LuPaperclip /> {formatNumber(t.files)}
                        </HStack>
                      )}
                    </HStack>
                    <AvatarGroup size="2xs" stacking="first-on-top">
                      {t.people.map((p) => (
                        <Avatar.Root key={p}>
                          <Avatar.Fallback name={p} />
                        </Avatar.Root>
                      ))}
                    </AvatarGroup>
                  </HStack>
                </Card.Body>
              </Card.Root>
            ))}
            <Button variant="ghost" size="sm" color="fg.muted" justifyContent="start">
              <LuPlus /> افزودن کارت
            </Button>
          </Stack>
        ))}
      </Flex>
    </>
  )
}
