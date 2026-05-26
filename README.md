# منصة اللغة العربية

تطبيق ويب تعليمي مبني على: **Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui + Prisma + PostgreSQL + NextAuth (Credentials)**.

## التشغيل محلياً

### 1) المتطلبات
- Node.js 18+
- PostgreSQL

### 2) إعداد المتغيرات
انسخ ملف البيئة ثم عدّل القيم:

```bash
cp .env.example .env
```

أهم المتغيرات:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (محلياً: `http://localhost:3000`)

### 3) تثبيت الحزم
```bash
npm install
```

### 4) تهيئة Prisma + الجداول
```bash
npm run prisma:generate
npm run prisma:migrate
```

### 5) Seed Data (البيانات الأولية)
```bash
npm run seed
```

الحسابات الجاهزة:
- Admin: `admin@arabi.com` / `Admin123!`
- Student: `student@arabi.com` / `Student123!`

### 6) تشغيل السيرفر
```bash
npm run dev
```

افتح: http://localhost:3000

## SQL الأمان / RLS
تم وضع ملف SQL كما زوّدت به داخل:
`sql/security.sql`

لتطبيقه (مثال باستخدام psql):
```bash
psql "$DATABASE_URL" -f sql/security.sql
```

> ملاحظة مهمة: السياسات داخل `sql/security.sql` تستخدم `auth.uid()` وأدوار `anon/authenticated` وهي صيغة شائعة في Supabase.
> إذا كنت تستخدم PostgreSQL “خام” مع NextAuth، فستحتاج لتكييف سياسات RLS لتعمل مع آلية تعريف المستخدم لديك (مثلاً عبر `SET LOCAL` + `current_setting()` أو JWT claims).

## النشر على Vercel (مجاني)
1) ارفع المشروع على GitHub.
2) أنشئ مشروع على Vercel واربط المستودع.
3) أضف متغيرات البيئة في Vercel:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (على Vercel غالباً يكون تلقائي، لكن يمكنك ضبطه بعنوان الدومين)
4) نفّذ Migration/Seed على قاعدة البيانات (مرة واحدة).
