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

| مسیر | صفحه |
| --- | --- |
| `/login`، `/register` | ورود و ثبت نام (با اعتبارسنجی) |
| `/` | داشبورد |
| `/forms/basic` | فرم پایه: input، select، radio، checkbox، switch، textarea، تاریخ |
| `/forms/multi-step` | فرم چندمرحله‌ای با اعتبارسنجی هر مرحله و صفحه‌ی خلاصه |
| `/forms/dynamic` | فرم پویا (فاکتور): افزودن/حذف ردیف و محاسبه‌ی خودکار جمع |
| `/tables/basic` | جدول ساده با تنظیمات ظاهری (نوع، اندازه، راه‌راه، …) |
| `/tables/data` | جدول داده: جستجو، فیلتر، مرتب‌سازی و صفحه‌بندی |
| `/tables/selectable` | جدول قابل انتخاب: انتخاب چندتایی، عملیات گروهی، ویرایش در دیالوگ |

## تکنولوژی‌ها

- **Vite + React 19 + TypeScript**
- **Chakra UI v3** با RTL، تم روشن/تیره (`next-themes`) و فونت وزیرمتن
- **React Router 7**
- **react-hook-form + zod** برای فرم‌ها و اعتبارسنجی
- **Zustand** برای state (حساب‌ها و نشست کاربر در localStorage)
- **react-icons** (مجموعه‌ی Lucide)

## احراز هویت

چون بک‌اند ندارد، حساب‌ها در `localStorage` مرورگر ذخیره می‌شوند (`src/stores/auth.ts`).
این فقط برای نمایش UI است و امن نیست (رمزها به‌صورت متن ساده ذخیره می‌شوند).

## ساختار

```
web/src/
├── app/            # router، guardها و navigation.tsx (منبع واحد منو و مسیرها)
├── layouts/        # لایوت پنل (سایدبار + هدر) و لایوت صفحات ورود
├── components/     # کامپوننت‌های مشترک (FormField، جدول، دیالوگ تأیید، …)
│   └── ui/         # provider، تم، toaster
├── features/       # صفحه‌ها: auth، dashboard، forms، tables
├── data/           # داده‌های نمونه
├── stores/         # storeهای zustand
└── lib/            # فرمت تاریخ شمسی و اعداد فارسی، مرتب‌سازی
```

## افزودن صفحه‌ی جدید

1. صفحه را در `src/features/<name>/` بسازید.
2. یک آیتم به `navigation` در `src/app/navigation.tsx` اضافه کنید.

مسیر و آیتم سایدبار خودکار ساخته می‌شوند و صفحه به‌صورت lazy لود می‌شود.
