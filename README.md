# پنل مدیریت

پنل ادمین فارسی (راست‌به‌چپ) با React، TypeScript و Ant Design.

## اجرا

```bash
cd web
npm install
npm run dev
```

حساب آزمایشی: `admin` / `admin123`

| دستور | کار |
| --- | --- |
| `npm run dev` | سرور توسعه |
| `npm run build` | بررسی تایپ‌ها و ساخت نسخه‌ی production |
| `npm run lint` | lint با oxlint |

## تکنولوژی‌ها

- **Vite + React 19 + TypeScript**
- **Ant Design 6** با `direction="rtl"` و locale فارسی، تم روشن/تیره
- **React Router 7** برای مسیریابی
- **TanStack Query** برای داده‌های سرور (کش، loading، invalidation)
- **Zustand** برای state سمت کلاینت (لاگین، تنظیمات ظاهری؛ در localStorage ذخیره می‌شوند)
- **Axios** برای ارتباط با بک‌اند
- تاریخ‌ها با `Intl` به‌صورت شمسی نمایش داده می‌شوند (`src/lib/format.ts`)

## ساختار

```
web/src/
├── app/            # providerها، router، و رجیستری ماژول‌ها (modules.tsx)
├── layouts/        # لایوت اصلی پنل (سایدبار + هدر)
├── components/     # کامپوننت‌های مشترک
├── features/       # هر بخش پنل یک پوشه: صفحه، api، types
│   ├── auth/
│   ├── dashboard/
│   ├── users/
│   └── settings/
├── stores/         # storeهای zustand
├── lib/            # http client، فرمت‌کننده‌ها، تایپ‌های مشترک
└── mocks/          # بک‌اند ساختگی در حافظه (تا زمان آماده شدن API واقعی)
```

## افزودن یک بخش جدید

1. پوشه‌ی `src/features/<name>/` را با صفحه‌ی آن بسازید.
2. یک ورودی به آرایه‌ی `modules` در `src/app/modules.tsx` اضافه کنید.

route و آیتم منوی سایدبار خودکار ساخته می‌شوند و صفحه به‌صورت lazy (یک chunk جدا) لود می‌شود.

## اتصال به بک‌اند

فعلاً لایه‌ی api هر فیچر (مثلاً `features/users/api.ts`) از `src/mocks` داده می‌گیرد.
وقتی بک‌اند آماده شد، کافی است داخل همین فایل‌ها به‌جای mock از `http` در `src/lib/http.ts` استفاده کنید
(آدرس با متغیر `VITE_API_URL` تنظیم می‌شود). توکن به‌صورت خودکار به درخواست‌ها اضافه می‌شود و پاسخ 401 کاربر را خارج می‌کند.
