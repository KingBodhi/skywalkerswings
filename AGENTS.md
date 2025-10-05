# AGENTS.md

## Build Commands
- `npm run dev` - Start development server (includes Prisma generate)
- `npm run build` - Build for production (includes Prisma generate)  
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Prisma Studio
- `npm run seed` - Seed database with test data

## Architecture
- **Stack**: Next.js 14 (App Router), TypeScript, Prisma, SQLite, Stripe, Tailwind CSS
- **Database**: SQLite (dev), Prisma ORM with models: User, Product, Variant, Collection, Cart, Order
- **Auth**: JWT sessions in `lib/auth.ts`, roles: ADMIN/EDITOR/DISTRIBUTOR/CUSTOMER
- **Structure**: `/app` (routes), `/components` (React components), `/lib` (utilities), `/prisma` (schema/seed)
- **Key APIs**: Authentication, cart management, Stripe payments, product/collection CRUD

## Code Style
- **Imports**: Use `@/` for root imports, relative imports with `../` 
- **TypeScript**: Strict mode enabled, no `allowJs`, explicit typing required
- **Components**: Functional components with TypeScript, use `"use client"` for client components
- **Database**: Use `lib/prisma.ts` for database client, always include error handling
- **Formatting**: Compact style, inline JSX props, spaces around operators
- **Error Handling**: Try/catch blocks, return null for auth failures
- **Colors**: Use Tailwind custom colors: midnight, navy, signal, alloy (see tailwind.config.ts)
