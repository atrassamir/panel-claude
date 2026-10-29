export type Product = {
  id: number
  name: string
  category: string
  price: number
  stock: number
}

export const sampleProducts: Product[] = [
  { id: 1, name: 'لپ‌تاپ', category: 'الکترونیک', price: 45_000_000, stock: 12 },
  { id: 2, name: 'گوشی موبایل', category: 'الکترونیک', price: 28_000_000, stock: 34 },
  { id: 3, name: 'هدفون', category: 'لوازم جانبی', price: 3_500_000, stock: 0 },
  { id: 4, name: 'کیبورد', category: 'لوازم جانبی', price: 2_200_000, stock: 58 },
  { id: 5, name: 'مانیتور', category: 'الکترونیک', price: 12_000_000, stock: 7 },
  { id: 6, name: 'ماوس', category: 'لوازم جانبی', price: 900_000, stock: 120 },
]
