# پنل مدیریت

پنل ادمین فارسی (راست‌به‌چپ) با React و Chakra UI v3، **بدون بک‌اند**.

## اجرا

```bash
cd web
npm install
npm run dev
```

حساب آزمایشی: `admin@example.com` / `admin123` — یا از صفحه‌ی ثبت نام یک حساب جدید بسازید.

| دستور | کار |
| --- | --- |
| `npm run dev` | سرور توسعه |
| `npm run build` | بررسی تایپ‌ها و ساخت نسخه‌ی production |
| `npm run lint` | lint با oxlint |

## صفحه‌ها

**داشبوردها:** اصلی، تحلیلی (نمودار و جدول آمار)، فروشگاه

**کامپوننت‌ها**
| مسیر | محتوا |
| --- | --- |
| `/components/foundations` | پالت رنگ، توکن‌های معنایی، تایپوگرافی، گردی گوشه‌ها، سایه‌ها |
| `/components/buttons` | انواع و اندازه‌ها و رنگ‌های دکمه، دکمه‌ی آیکونی، گروه دکمه، Toggle، لینک |
| `/components/badges` | Badge، Tag، Avatar و AvatarGroup، Status، Kbd |
| `/components/feedback` | Alert، Toast، Progress، ProgressCircle، Spinner، Skeleton، Empty state |
| `/components/overlays` | Dialog، Drawer، Popover، Tooltip، HoverCard، Menu (زیرمنو، چک‌باکس، راست‌کلیک) |
| `/components/navigation` | Tabs، Accordion، Breadcrumb، Steps، Pagination، SegmentGroup، Collapsible |
| `/components/data-display` | Card، Stat، DataList، List، Timeline، TreeView، Blockquote، QR code، Clipboard، Marquee |
| `/components/charts` | نمودار خطی، ناحیه‌ای، میله‌ای، دونات، راداری، BarList، BarSegment |

**فرم‌ها:** فرم پایه، فیلدهای پیشرفته (Select، Combobox، تاریخ، رنگ، آپلود فایل، اسلایدر، امتیاز، کد تأیید، تگ‌ها، کارت انتخاب)، فرم چندمرحله‌ای، فرم پویا

**جدول‌ها:** جدول ساده، جدول داده (جستجو/فیلتر/مرتب‌سازی/صفحه‌بندی)، جدول قابل انتخاب

**صفحه‌ها:** پروفایل، تنظیمات حساب، تعرفه‌ها، فاکتور، صندوق پیام، گفتگو، کانبان (کشیدن و رها کردن)، تقویم شمسی، مدیریت فایل، سوالات متداول

**ورود و خطا (تمام‌صفحه):** ورود دوستونه، ورود مینیمال، فراموشی رمز، خطای ۴۰۴، خطای ۵۰۰، در حال تعمیر — به‌علاوه‌ی `/login` و `/register`

## چیدمان

- سایدبار با بخش‌های جمع‌شونده، و حالت فقط‌آیکون که هر بخش را در یک منوی کناری باز می‌کند
- حالت «منوی بالا» به‌جای سایدبار (از دکمه‌ی چیدمان در هدر؛ در مرورگر ذخیره می‌شود)
- مسیر صفحه (Breadcrumb)، منوی اعلان‌ها، منوی کاربر
- جستجوی سریع صفحه‌ها با <kbd>Ctrl</kbd>+<kbd>K</kbd>
- منوی کشویی در موبایل

## تکنولوژی‌ها

- **Vite + React 19 + TypeScript**
- **Chakra UI v3** با RTL، تم روشن/تیره (`next-themes`) و فونت وزیرمتن
- **React Router 7**
- **react-hook-form + zod** برای فرم‌ها و اعتبارسنجی
- **Zustand** برای state (حساب‌ها و نشست کاربر در localStorage)
- **@chakra-ui/charts + Recharts** برای نمودارها
- **react-icons** (مجموعه‌ی Lucide)

## احراز هویت

چون بک‌اند ندارد، حساب‌ها در `localStorage` مرورگر ذخیره می‌شوند (`src/stores/auth.ts`).
این فقط برای نمایش UI است و امن نیست (رمزها به‌صورت متن ساده ذخیره می‌شوند).

## ساختار

```
web/src/
├── app/            # router، guardها و navigation.tsx (منبع واحد منو، مسیرها، breadcrumb و جستجو)
├── layouts/        # لایوت پنل (سایدبار، منوی بالا، هدر، اعلان‌ها، جستجو) و لایوت‌های تمام‌صفحه
├── components/     # کامپوننت‌های مشترک (FormField، جدول، دیالوگ تأیید، …)
│   └── ui/         # provider، تم، toaster
├── features/       # صفحه‌ها: dashboards، components، forms، tables، pages، standalone
├── data/           # داده‌های نمونه
├── stores/         # storeهای zustand
└── lib/            # فرمت تاریخ شمسی و اعداد فارسی، مرتب‌سازی
```

## افزودن صفحه‌ی جدید

1. صفحه را در `src/features/<name>/` بسازید.
2. یک آیتم به `navigation` در `src/app/navigation.tsx` اضافه کنید.

مسیر، آیتم سایدبار و منوی بالا، breadcrumb و نتیجه‌ی جستجو خودکار ساخته می‌شوند و صفحه به‌صورت lazy لود می‌شود.
