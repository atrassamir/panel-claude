export const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']

/** Monthly figures in millions of toman. */
export const monthlySales = months.map((month, i) => ({
  month,
  sales: Math.round(120 + i * 14 + Math.sin(i) * 35),
  expenses: Math.round(80 + i * 8 + Math.cos(i) * 20),
  profit: 0,
})).map((d) => ({ ...d, profit: d.sales - d.expenses }))

export const weeklyVisits = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'].map((day, i) => ({
  day,
  desktop: [420, 510, 480, 620, 590, 380, 260][i],
  mobile: [610, 700, 690, 820, 780, 640, 540][i],
}))

export const trafficSources = [
  { name: 'جستجوی گوگل', value: 4200, color: 'blue.solid' },
  { name: 'شبکه‌های اجتماعی', value: 2700, color: 'purple.solid' },
  { name: 'ورود مستقیم', value: 1800, color: 'teal.solid' },
  { name: 'ایمیل', value: 900, color: 'orange.solid' },
]

export const categorySales = [
  { name: 'الکترونیک', value: 1840 },
  { name: 'پوشاک', value: 1260 },
  { name: 'لوازم خانگی', value: 980 },
  { name: 'کتاب', value: 620 },
  { name: 'ورزشی', value: 410 },
]

export const skills = ['طراحی', 'سرعت', 'امنیت', 'پشتیبانی', 'قیمت', 'کیفیت'].map((name, i) => ({
  name,
  current: [86, 72, 90, 64, 70, 88][i],
  previous: [70, 60, 76, 70, 58, 74][i],
}))

export const sparkline = [12, 18, 14, 22, 19, 27, 24, 31, 29, 36].map((value, i) => ({ i, value }))
