const dateFormatter = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium' })
const numberFormatter = new Intl.NumberFormat('fa-IR')

/** Formats an ISO date as a Jalali (Persian calendar) date. */
export const formatDate = (iso: string) => dateFormatter.format(new Date(iso))

export const formatNumber = (n: number) => numberFormatter.format(n)
