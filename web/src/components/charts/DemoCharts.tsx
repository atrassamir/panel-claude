import { BarList, BarSegment, Chart, useChart, type BarListData } from '@chakra-ui/charts'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { categorySales, monthlySales, skills, trafficSources, weeklyVisits } from '@/data/charts'
import { formatNumber } from '@/lib/format'

const fa = (v: number) => formatNumber(v)

export function SalesLineChart() {
  const chart = useChart({
    data: monthlySales,
    series: [
      { name: 'sales', color: 'blue.solid', label: 'فروش' },
      { name: 'expenses', color: 'orange.solid', label: 'هزینه' },
    ],
  })
  return (
    <Chart.Root maxH="xs" chart={chart} dir="ltr">
      <LineChart responsive data={chart.data} margin={{ left: 0, right: 0 }}>
        <CartesianGrid stroke={chart.color('border')} vertical={false} />
        <XAxis dataKey={chart.key('month')} reversed tickLine={false} axisLine={false} stroke={chart.color('border')} />
        <YAxis orientation="right" tickLine={false} axisLine={false} tickFormatter={fa} width={40} />
        <Tooltip animationDuration={100} cursor={false} content={<Chart.Tooltip />} />
        <Legend content={<Chart.Legend />} />
        {chart.series.map((s) => (
          <Line key={s.name} isAnimationActive={false} dataKey={chart.key(s.name)} stroke={chart.color(s.color)} strokeWidth={2} dot={false} />
        ))}
      </LineChart>
    </Chart.Root>
  )
}

export function ProfitAreaChart() {
  const chart = useChart({ data: monthlySales, series: [{ name: 'profit', color: 'teal.solid', label: 'سود' }] })
  return (
    <Chart.Root maxH="xs" chart={chart} dir="ltr">
      <AreaChart responsive data={chart.data}>
        <CartesianGrid stroke={chart.color('border')} vertical={false} />
        <XAxis dataKey={chart.key('month')} reversed tickLine={false} axisLine={false} />
        <YAxis orientation="right" tickLine={false} axisLine={false} tickFormatter={fa} width={40} />
        <Tooltip cursor={false} animationDuration={100} content={<Chart.Tooltip />} />
        {chart.series.map((s) => (
          <defs key={s.name}>
            <Chart.Gradient
              id={`${s.name}-gradient`}
              stops={[
                { offset: '0%', color: s.color, opacity: 0.35 },
                { offset: '100%', color: s.color, opacity: 0.02 },
              ]}
            />
          </defs>
        ))}
        {chart.series.map((s) => (
          <Area
            key={s.name}
            isAnimationActive={false}
            type="monotone"
            dataKey={chart.key(s.name)}
            fill={`url(#${s.name}-gradient)`}
            stroke={chart.color(s.color)}
            strokeWidth={2}
          />
        ))}
      </AreaChart>
    </Chart.Root>
  )
}

export function VisitsBarChart({ stacked }: { stacked?: boolean }) {
  const chart = useChart({
    data: weeklyVisits,
    series: [
      { name: 'mobile', color: 'purple.solid', label: 'موبایل', stackId: stacked ? 'a' : undefined },
      { name: 'desktop', color: 'blue.solid', label: 'دسکتاپ', stackId: stacked ? 'a' : undefined },
    ],
  })
  return (
    <Chart.Root maxH="xs" chart={chart} dir="ltr">
      <BarChart responsive data={chart.data}>
        <CartesianGrid stroke={chart.color('border')} vertical={false} />
        <XAxis dataKey={chart.key('day')} reversed tickLine={false} axisLine={false} />
        <YAxis orientation="right" tickLine={false} axisLine={false} tickFormatter={fa} width={40} />
        <Tooltip cursor={{ fill: chart.color('bg.muted') }} animationDuration={100} content={<Chart.Tooltip />} />
        <Legend content={<Chart.Legend />} />
        {chart.series.map((s) => (
          <Bar
            key={s.name}
            isAnimationActive={false}
            dataKey={chart.key(s.name)}
            fill={chart.color(s.color)}
            stackId={s.stackId}
            radius={stacked ? 0 : [4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </Chart.Root>
  )
}

export function TrafficDonut() {
  const chart = useChart({ data: trafficSources })
  return (
    <Chart.Root boxSize="64" mx="auto" chart={chart}>
      <PieChart responsive>
        <Tooltip cursor={false} animationDuration={100} content={<Chart.Tooltip hideLabel />} />
        <Legend content={<Chart.Legend />} />
        <Pie
          isAnimationActive={false}
          data={chart.data}
          dataKey={chart.key('value')}
          nameKey="name"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={3}
          stroke="none"
        >
          {chart.data.map((item) => (
            <Cell key={item.name} fill={chart.color(item.color)} />
          ))}
        </Pie>
      </PieChart>
    </Chart.Root>
  )
}

export function SkillsRadar() {
  const chart = useChart({
    data: skills,
    series: [
      { name: 'current', color: 'blue.solid', label: 'امسال' },
      { name: 'previous', color: 'gray.solid', label: 'پارسال' },
    ],
  })
  return (
    <Chart.Root maxH="xs" chart={chart} dir="ltr">
      <RadarChart responsive data={chart.data}>
        <PolarGrid stroke={chart.color('border')} />
        <PolarAngleAxis dataKey={chart.key('name')} />
        <Legend content={<Chart.Legend />} />
        {chart.series.map((s) => (
          <Radar
            key={s.name}
            isAnimationActive={false}
            dataKey={chart.key(s.name)}
            stroke={chart.color(s.color)}
            fill={chart.color(s.color)}
            fillOpacity={0.2}
          />
        ))}
      </RadarChart>
    </Chart.Root>
  )
}

export function CategoryBarList() {
  const chart = useChart<BarListData>({
    sort: { by: 'value', direction: 'desc' },
    data: categorySales,
    series: [{ name: 'name', color: 'teal.subtle' }],
  })
  return (
    <BarList.Root chart={chart}>
      <BarList.Content>
        <BarList.Bar />
        <BarList.Value valueFormatter={(v) => `${formatNumber(v)} م`} />
      </BarList.Content>
    </BarList.Root>
  )
}

export function TrafficSegment() {
  const chart = useChart({ data: trafficSources, sort: { by: 'value', direction: 'desc' } })
  return (
    <BarSegment.Root chart={chart}>
      <BarSegment.Content>
        <BarSegment.Bar />
      </BarSegment.Content>
      <BarSegment.Legend showPercent />
    </BarSegment.Root>
  )
}

