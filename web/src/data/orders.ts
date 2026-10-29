export type OrderStatus = 'paid' | 'shipped' | 'cancelled' | 'processing'

export type Order = {
  id: number
  code: string
  customer: string
  city: string
  amount: number
  status: OrderStatus
  date: string
}

export const orderStatusMeta: Record<OrderStatus, { label: string; color: string }> = {
  processing: { label: 'در حال پردازش', color: 'blue' },
  paid: { label: 'پرداخت شده', color: 'green' },
  shipped: { label: 'ارسال شده', color: 'purple' },
  cancelled: { label: 'لغو شده', color: 'red' },
}

const customers = ['علی احمدی', 'مریم رضایی', 'رضا محمدی', 'سارا کریمی', 'محمد حسینی', 'زهرا موسوی', 'نگار صادقی']
const cities = ['تهران', 'اصفهان', 'شیراز', 'مشهد', 'تبریز', 'رشت']
const statuses: OrderStatus[] = ['paid', 'shipped', 'processing', 'paid', 'cancelled']

export const sampleOrders: Order[] = Array.from({ length: 87 }, (_, i) => ({
  id: i + 1,
  code: `ORD-${String(1000 + i)}`,
  customer: customers[(i * 5) % customers.length],
  city: cities[(i * 3) % cities.length],
  amount: ((i * 7919) % 90 + 5) * 100_000,
  status: statuses[i % statuses.length],
  date: new Date(Date.UTC(2026, 9, 28) - i * 86_400_000 * 1.5).toISOString(),
}))
