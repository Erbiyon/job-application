# 📋 MyJob Application — Kanban Board

> **ระบบติดตามสถานะการสมัครงาน** แบบ Kanban Board ที่ช่วยให้คุณจัดการและติดตามใบสมัครงานทั้งหมดได้อย่างเป็นระบบ พร้อมระบบ Drag & Drop, CRUD เต็มรูปแบบ และรองรับ Dark Mode

![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7.8.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## 📖 สารบัญ

- [คุณสมบัติหลัก](#-คุณสมบัติหลัก)
- [Technology Stack](#-technology-stack)
- [สถาปัตยกรรมโปรเจกต์](#-สถาปัตยกรรมโปรเจกต์)
- [โครงสร้างโปรเจกต์](#-โครงสร้างโปรเจกต์)
- [เริ่มต้นใช้งาน](#-เริ่มต้นใช้งาน)
- [การพัฒนา](#-การพัฒนา)
- [Coding Standards](#-coding-standards)
- [การมีส่วนร่วม](#-การมีส่วนร่วม)
- [License](#-license)

---

## ✨ คุณสมบัติหลัก

| ฟีเจอร์ | รายละเอียด |
|---|---|
| 📑 **Kanban Board** | กระดานติดตามสถานะแบบ 5 คอลัมน์: บันทึกไว้ → ยื่นแล้ว → นัดสัมภาษณ์ → ได้งานแล้ว → ปฏิเสธ |
| 🖱️ **Drag & Drop** | ลากและวางการ์ดเพื่ออัปเดตสถานะแบบ Real-time ด้วย `@hello-pangea/dnd` |
| ➕ **เพิ่มใบสมัคร** | Modal สำหรับบันทึกข้อมูลบริษัท, ตำแหน่ง, เงินเดือนที่คาดหวัง และลิงก์ประกาศงาน |
| ✏️ **แก้ไขข้อมูล** | แก้ไขชื่อบริษัทและตำแหน่งผ่าน Edit Modal |
| 🗑️ **ลบใบสมัคร** | ลบพร้อม Confirmation Dialog เพื่อป้องกันการลบโดยไม่ตั้งใจ |
| 🌙 **Dark / Light Mode** | สลับธีมได้ 3 แบบ (สว่าง, กลางคืน, ตามระบบ) ด้วย `next-themes` |
| ⚡ **Optimistic Updates** | อัปเดตหน้าจอทันทีก่อนรอ Server ตอบกลับ เพื่อ UX ที่ลื่นไหล |
| 🗄️ **Server Actions** | ใช้ Next.js Server Actions สำหรับ CRUD operations โดยไม่ต้องสร้าง API Routes แยก |

---

## 🛠 Technology Stack

### Frontend

| เทคโนโลยี | เวอร์ชัน | หน้าที่ |
|---|---|---|
| [Next.js](https://nextjs.org/) | `16.2.9` | React Framework (App Router) |
| [React](https://react.dev/) | `19.2.4` | UI Library |
| [TypeScript](https://www.typescriptlang.org/) | `^5` | Type Safety |
| [Tailwind CSS](https://tailwindcss.com/) | `^4` | Utility-first CSS |
| [shadcn/ui](https://ui.shadcn.com/) | `^4.11.0` | UI Component Library (Radix Nova style) |
| [Lucide React](https://lucide.dev/) | `^1.20.0` | Icon Library |
| [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) | `^18.0.1` | Drag & Drop สำหรับ Kanban Board |
| [next-themes](https://github.com/pacocoursey/next-themes) | `^0.4.6` | Theme Management (Dark/Light Mode) |
| [Sonner](https://sonner.emilkowal.dev/) | `^2.0.7` | Toast Notifications |

### Backend & Database

| เทคโนโลยี | เวอร์ชัน | หน้าที่ |
|---|---|---|
| [Prisma](https://www.prisma.io/) | `^7.8.0` | ORM สำหรับจัดการ Database |
| [PostgreSQL](https://www.postgresql.org/) | `15-alpine` | Relational Database |
| [@prisma/adapter-pg](https://www.prisma.io/docs/orm/overview/databases/postgresql) | `^7.8.0` | PostgreSQL Driver Adapter |
| [Docker Compose](https://docs.docker.com/compose/) | — | Container Management สำหรับ Database |

### Development Tools

| เครื่องมือ | หน้าที่ |
|---|---|
| [pnpm](https://pnpm.io/) | Package Manager |
| [ESLint](https://eslint.org/) | Linting (Next.js Core Web Vitals + TypeScript) |
| [PostCSS](https://postcss.org/) | CSS Processing |
| [tsx](https://github.com/privatenumber/tsx) | TypeScript Execution |

---

## 🏗 สถาปัตยกรรมโปรเจกต์

```
┌─────────────────────────────────────────────────────────┐
│                      Client (Browser)                   │
│                                                         │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│   │  KanbanBoard │  │  ModeToggle  │  │   Dialogs    │  │
│   │ (Client Comp)│  │ (Client Comp)│  │  (shadcn/ui) │  │
│   └──────┬───────┘  └──────────────┘  └──────────────┘  │
│          │ Drag & Drop / Form Submit                    │
└──────────┼──────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────┐
│                  Next.js App Router (Server)             │
│                                                          │
│   ┌──────────────┐  ┌───────────────────────────────┐    │
│   │  page.tsx    │  │   Server Actions              │    │
│   │  (SSR Page)  │  │   (app/actions/jobActions.ts) │    │
│   │  RSC + Data  │  │   • createApplication         │    │
│   │  Fetching    │  │   • getApplications           │    │
│   └──────────────┘  │   • updateApplicationStatus   │    │
│                     │   • updateApplicationDetails   │    │
│                     │   • deleteApplication          │    │
│                     └───────────────┬───────────────┘    │
│                                     │                    │
└─────────────────────────────────────┼────────────────────┘
                                      │ Prisma ORM
                                      ▼
                          ┌───────────────────────┐
                          │   PostgreSQL 15        │
                          │   (Docker Container)   │
                          │   DB: job_board         │
                          └───────────────────────┘
```

### รูปแบบสถาปัตยกรรม

- **Server Components (RSC)**: หน้าหลัก (`page.tsx`) เป็น Server Component ที่ดึงข้อมูลจาก Database โดยตรง
- **Client Components**: `KanbanBoard` และ `ModeToggle` เป็น Client Components สำหรับ Interactive UI
- **Server Actions**: ใช้ Next.js Server Actions (`"use server"`) สำหรับ mutations แทนการสร้าง API Routes
- **Optimistic Updates**: อัปเดต UI ทันทีก่อนรอ Server ตอบกลับ แล้วใช้ `revalidatePath("/")` เพื่อ sync ข้อมูล
- **Prisma + PrismaPg Adapter**: ใช้ `@prisma/adapter-pg` เชื่อมต่อ PostgreSQL ผ่าน connection string

---

## 📂 โครงสร้างโปรเจกต์

```
job-application/
├── app/
│   ├── actions/
│   │   └── jobActions.ts        # Server Actions (CRUD operations)
│   ├── generated/prisma/        # Prisma Client ที่ generate อัตโนมัติ (gitignored)
│   ├── globals.css              # Global styles + Tailwind + shadcn theme
│   ├── layout.tsx               # Root Layout (ThemeProvider, Google Sans font)
│   ├── page.tsx                 # หน้าหลัก - Kanban Dashboard (Server Component)
│   └── favicon.ico
├── components/
│   ├── ui/                      # shadcn/ui Components
│   │   ├── alert-dialog.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── sonner.tsx
│   ├── kanban-board.tsx         # Kanban Board Component (Client Component)
│   ├── mode-toggle.tsx          # Theme Toggle Component
│   └── theme-provider.tsx       # next-themes ThemeProvider Wrapper
├── lib/
│   ├── prisma.ts                # Prisma Client Singleton (PrismaPg Adapter)
│   └── utils.ts                 # Utility functions (cn helper)
├── prisma/
│   ├── migrations/              # Database Migrations
│   │   └── 20260617191852_init/ # Initial migration
│   └── schema.prisma            # Prisma Schema (JobApplication model)
├── public/                      # Static assets (SVG icons)
├── docker-compose.yml           # PostgreSQL Container
├── prisma.config.ts             # Prisma Configuration
├── components.json              # shadcn/ui Configuration
├── next.config.ts               # Next.js Configuration
├── tsconfig.json                # TypeScript Configuration
├── eslint.config.mjs            # ESLint Configuration
├── postcss.config.mjs           # PostCSS Configuration
├── pnpm-workspace.yaml          # pnpm Workspace Configuration
└── package.json                 # Dependencies & Scripts
```

---

## 🚀 เริ่มต้นใช้งาน

### สิ่งที่ต้องมีก่อน

- **Node.js** >= 18
- **pnpm** (แนะนำ) — [ติดตั้ง pnpm](https://pnpm.io/installation)
- **Docker** & **Docker Compose** — สำหรับรัน PostgreSQL

### 1. Clone โปรเจกต์

```bash
git clone https://github.com/Erbiyon/job-application.git
cd job-application
```

### 2. ติดตั้ง Dependencies

```bash
pnpm install
```

### 3. เริ่มต้น Database (PostgreSQL via Docker)

```bash
pnpm docker:up
```

คำสั่งนี้จะสร้าง PostgreSQL container พร้อมการตั้งค่า:

| ค่า | รายละเอียด |
|---|---|
| Host | `localhost:5432` |
| Database | `job_board` |
| User | `admin` |
| Password | `123456` |

### 4. ตั้งค่า Environment Variables

สร้างไฟล์ `.env` ที่ root ของโปรเจกต์:

```env
DATABASE_URL="postgresql://admin:123456@localhost:5432/job_board"
```

### 5. รัน Database Migration

```bash
npx prisma migrate dev
```

### 6. Generate Prisma Client

```bash
npx prisma generate
```

### 7. เริ่ม Development Server

```bash
pnpm dev
```

เปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000) เพื่อดูผลลัพธ์

---

## 💻 การพัฒนา

### Scripts ที่ใช้บ่อย

| คำสั่ง | หน้าที่ |
|---|---|
| `pnpm dev` | เริ่ม Development Server |
| `pnpm build` | Build สำหรับ Production |
| `pnpm start` | รัน Production Server |
| `pnpm lint` | ตรวจสอบ Code ด้วย ESLint |
| `pnpm docker:up` | เริ่มต้น PostgreSQL Container |

### Database Management

```bash
# เปิด Prisma Studio (GUI สำหรับจัดการข้อมูล)
npx prisma studio

# สร้าง Migration ใหม่
npx prisma migrate dev --name <migration_name>

# Reset Database
npx prisma migrate reset

# Generate Prisma Client หลังแก้ไข schema
npx prisma generate
```

### Data Model

โปรเจกต์ใช้ model `JobApplication` เดียวสำหรับเก็บข้อมูลใบสมัครงาน:

```prisma
model JobApplication {
  id                String    @id @default(uuid())
  companyName       String    // ชื่อบริษัท
  position          String    // ตำแหน่งที่สมัคร
  status            String    // สถานะ: SAVED | APPLIED | INTERVIEWING | OFFER | REJECTED
  salaryExpectation Int?      // เงินเดือนที่คาดหวัง (optional)
  jobUrl            String?   // ลิงก์ประกาศงาน (optional)
  interviewDate     DateTime? // วันนัดสัมภาษณ์ (optional)
  notes             String?   // บันทึกเพิ่มเติม (optional)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}
```

### สถานะที่ใช้ใน Kanban Board

| Status | ชื่อคอลัมน์ | อีโมจิ |
|---|---|---|
| `SAVED` | บันทึกไว้ | 📑 |
| `APPLIED` | ยื่นแล้ว | 🚀 |
| `INTERVIEWING` | นัดสัมภาษณ์ | 🗣️ |
| `OFFER` | ได้งานแล้ว | 🎉 |
| `REJECTED` | ปฏิเสธ | ❌ |

---

## 📝 Coding Standards

### ภาพรวม

- **ภาษา**: TypeScript (Strict Mode)
- **Framework**: Next.js App Router (RSC + Server Actions)
- **Styling**: Tailwind CSS v4 + shadcn/ui (Radix Nova style)
- **Linting**: ESLint (Next.js Core Web Vitals + TypeScript rules)

### แนวทางการเขียนโค้ด

1. **Server vs Client Components**
   - ใช้ Server Component เป็นค่าเริ่มต้นสำหรับ data fetching
   - ใช้ `"use client"` เฉพาะ Component ที่ต้องการ interactivity (เช่น Drag & Drop, Theme Toggle)

2. **Server Actions**
   - ใช้ `"use server"` directive สำหรับ mutations
   - เรียก `revalidatePath("/")` หลัง mutation เสมอ เพื่อ sync ข้อมูล

3. **Optimistic Updates**
   - อัปเดต local state ทันทีก่อนเรียก Server Action
   - ให้ผู้ใช้เห็นผลลัพธ์ทันทีโดยไม่ต้องรอ network round-trip

4. **Path Aliases**
   - ใช้ `@/*` สำหรับ import จาก root directory (e.g., `@/components/ui/button`)

5. **UI Components**
   - ใช้ shadcn/ui components จาก `@/components/ui/`
   - Icon ใช้จาก `lucide-react`

---

## 🤝 การมีส่วนร่วม

ยินดีรับ contributions จากทุกคน! กรุณาทำตามขั้นตอนดังนี้:

1. **Fork** repository นี้
2. **สร้าง Branch** สำหรับ feature ใหม่
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** การเปลี่ยนแปลง
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push** ขึ้น Branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. เปิด **Pull Request**

### แนวทาง Commit Message

ใช้รูปแบบ [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | ใช้เมื่อ |
|---|---|
| `feat:` | เพิ่มฟีเจอร์ใหม่ |
| `fix:` | แก้ไขบัค |
| `docs:` | แก้ไขเอกสาร |
| `style:` | แก้ไข CSS / formatting |
| `refactor:` | ปรับปรุงโค้ดโดยไม่เปลี่ยนพฤติกรรม |
| `chore:` | งานอื่นๆ (dependencies, config) |

---

## 📄 License

โปรเจกต์นี้เป็น private project ภายใต้สิทธิ์ของเจ้าของ repository

---

<p align="center">
  สร้างด้วย ❤️ โดยใช้ <a href="https://nextjs.org">Next.js</a> + <a href="https://www.prisma.io">Prisma</a> + <a href="https://ui.shadcn.com">shadcn/ui</a>
</p>
