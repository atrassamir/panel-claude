import { Card, SimpleGrid, Stack } from '@chakra-ui/react'
import {
  CategoryBarList,
  ProfitAreaChart,
  SalesLineChart,
  SkillsRadar,
  TrafficDonut,
  TrafficSegment,
  VisitsBarChart,
} from '@/components/charts/DemoCharts'
import { PageHeader } from '@/components/PageHeader'
import { DemoSection } from '@/components/Showcase'

export function ChartsPage() {
  return (
    <>
      <PageHeader title="نمودارها" description="نمودارهای خطی، ناحیه‌ای، میله‌ای، دایره‌ای، راداری و فهرست میله‌ای" />
      <Stack gap="6">
        <SimpleGrid columns={{ base: 1, xl: 2 }} gap="6">
          <DemoSection title="نمودار خطی" description="فروش و هزینه‌ی ماهانه (میلیون تومان)">
            <SalesLineChart />
          </DemoSection>
          <DemoSection title="نمودار ناحیه‌ای" description="سود ماهانه با گرادیان">
            <ProfitAreaChart />
          </DemoSection>
          <DemoSection title="نمودار میله‌ای" description="بازدید هفتگی به تفکیک دستگاه">
            <VisitsBarChart />
          </DemoSection>
          <DemoSection title="نمودار میله‌ای انباشته">
            <VisitsBarChart stacked />
          </DemoSection>
          <DemoSection title="نمودار دونات" description="منابع ورودی">
            <TrafficDonut />
          </DemoSection>
          <DemoSection title="نمودار راداری" description="رضایت مشتری در شش شاخص">
            <SkillsRadar />
          </DemoSection>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, xl: 2 }} gap="6">
          <DemoSection title="فهرست میله‌ای (BarList)" description="فروش هر دسته (میلیون تومان)">
            <CategoryBarList />
          </DemoSection>
          <Card.Root>
            <Card.Header>
              <Card.Title>میله‌ی بخش‌بندی (BarSegment)</Card.Title>
              <Card.Description>سهم هر منبع ورودی</Card.Description>
            </Card.Header>
            <Card.Body>
              <TrafficSegment />
            </Card.Body>
          </Card.Root>
        </SimpleGrid>
      </Stack>
    </>
  )
}
