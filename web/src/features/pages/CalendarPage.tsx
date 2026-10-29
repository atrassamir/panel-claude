import { useState } from 'react'
import { Badge, Box, Button, ButtonGroup, Card, Grid, HStack, IconButton, Stack, Text } from '@chakra-ui/react'
import { LuChevronLeft, LuChevronRight, LuPlus } from 'react-icons/lu'
import { PageHeader } from '@/components/PageHeader'
import { formatNumber } from '@/lib/format'

const persian = new Intl.DateTimeFormat('en-US-u-ca-persian', { year: 'numeric', month: 'numeric', day: 'numeric' })
const monthName = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { month: 'long', year: 'numeric' })
const weekDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه']
const DAY = 86_400_000

function jalaliParts(date: Date) {
  const parts = Object.fromEntries(persian.formatToParts(date).map((p) => [p.type, p.value]))
  return { year: Number(parts.year), month: Number(parts.month), day: Number(parts.day) }
}

/** Days of the Jalali month containing `anchor`, with leading blanks so weeks start on Saturday. */
function monthGrid(anchor: Date) {
  const first = firstOfMonth(anchor)
  const { month } = jalaliParts(first)
  const days: Date[] = []
  for (let d = first; jalaliParts(d).month === month; d = new Date(d.getTime() + DAY)) days.push(d)
  const lead = (first.getDay() + 1) % 7 // JS Sunday=0 → Saturday-first index
  return { first, days, lead }
}

const firstOfMonth = (d: Date) => new Date(d.getTime() - (jalaliParts(d).day - 1) * DAY)

/** Moves `count` Jalali months from `date`, landing on the first day of the target month. */
function shiftMonths(date: Date, count: number) {
  // Work at noon so daylight-saving shifts never cross a day boundary.
  const noon = new Date(date)
  noon.setHours(12, 0, 0, 0)
  let d = firstOfMonth(noon)
  for (let i = 0; i < Math.abs(count); i++) {
    // From the 1st, +32 days is always inside the next month and -1 day inside the previous one.
    d = firstOfMonth(new Date(d.getTime() + (count > 0 ? 32 : -1) * DAY))
  }
  return d
}

const events: Record<number, { title: string; color: string }[]> = {
  3: [{ title: 'جلسه‌ی تیم', color: 'blue' }],
  7: [
    { title: 'تحویل فاز ۱', color: 'green' },
    { title: 'دمو برای مشتری', color: 'purple' },
  ],
  12: [{ title: 'بازبینی طراحی', color: 'orange' }],
  15: [{ title: 'تعطیلات', color: 'red' }],
  21: [{ title: 'کارگاه آموزشی', color: 'teal' }],
  26: [
    { title: 'جلسه‌ی ماهانه', color: 'blue' },
    { title: 'انتشار نسخه', color: 'green' },
  ],
}

export function CalendarPage() {
  const [offset, setOffset] = useState(0)
  const [today] = useState(() => new Date())
  const anchor = shiftMonths(today, offset)
  const { first, days, lead } = monthGrid(anchor)
  const todayKey = today.toDateString()

  return (
    <>
      <PageHeader
        title="تقویم"
        description="نمای ماهانه با تقویم شمسی"
        actions={
          <Button colorPalette="blue" size="sm">
            <LuPlus /> رویداد جدید
          </Button>
        }
      />
      <Card.Root>
        <Card.Header>
          <HStack justify="space-between" wrap="wrap" gap="3">
            <HStack>
              <IconButton variant="outline" size="sm" aria-label="ماه قبل" onClick={() => setOffset((o) => o - 1)}>
                <LuChevronRight />
              </IconButton>
              <IconButton variant="outline" size="sm" aria-label="ماه بعد" onClick={() => setOffset((o) => o + 1)}>
                <LuChevronLeft />
              </IconButton>
              <Text fontSize="xl" fontWeight="bold" ms="2">
                {monthName.format(first)}
              </Text>
            </HStack>
            <HStack>
              <Button size="sm" variant="ghost" onClick={() => setOffset(0)}>
                امروز
              </Button>
              <ButtonGroup size="sm" variant="outline" attached>
                <Button variant="solid">ماه</Button>
                <Button>هفته</Button>
                <Button>روز</Button>
              </ButtonGroup>
            </HStack>
          </HStack>
        </Card.Header>
        <Card.Body>
          <Box overflowX="auto">
            <Grid templateColumns="repeat(7, minmax(6rem, 1fr))" borderTopWidth="1px" borderInlineStartWidth="1px" minW="2xl">
              {weekDays.map((d) => (
                <Box key={d} p="2" textAlign="center" fontSize="xs" fontWeight="semibold" color="fg.muted" bg="bg.subtle" borderBottomWidth="1px" borderInlineEndWidth="1px">
                  {d}
                </Box>
              ))}
              {Array.from({ length: lead }, (_, i) => (
                <Box key={`blank-${i}`} borderBottomWidth="1px" borderInlineEndWidth="1px" bg="bg.subtle" />
              ))}
              {days.map((d, i) => {
                const isToday = d.toDateString() === todayKey
                const dayEvents = events[i + 1] ?? []
                const isFriday = (lead + i) % 7 === 6
                return (
                  <Stack key={i} minH="24" p="1.5" gap="1" borderBottomWidth="1px" borderInlineEndWidth="1px" _hover={{ bg: 'bg.subtle' }}>
                    <Box
                      alignSelf="start"
                      fontSize="sm"
                      boxSize="7"
                      display="grid"
                      placeItems="center"
                      rounded="full"
                      bg={isToday ? 'blue.solid' : undefined}
                      color={isToday ? 'blue.contrast' : isFriday ? 'fg.error' : undefined}
                      fontWeight={isToday ? 'bold' : undefined}
                    >
                      {formatNumber(i + 1)}
                    </Box>
                    {dayEvents.map((e) => (
                      <Badge key={e.title} colorPalette={e.color} variant="subtle" size="sm" justifyContent="start" truncate>
                        {e.title}
                      </Badge>
                    ))}
                  </Stack>
                )
              })}
            </Grid>
          </Box>
        </Card.Body>
      </Card.Root>
    </>
  )
}
