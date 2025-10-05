# Skywalker Unlimited — MVP (Next.js 14 + Prisma SQLite + Stripe)

## Setup
```bash
nvm use 20
cp .env.example .env       # already filled with Stripe TEST keys
npm install
npx prisma generate
npm run db:push
npm run seed
npm run dev
```

- Status: `/status`
- Shop: `/shop`, Collections: `/collection/[handle]`, PDP: `/product/[handle]`, Cart: `/cart`
- Admin login: `/admin/login` (uses ADMIN_EMAIL / ADMIN_PASSWORD in .env)
- Admin dashboard: `/admin` (protected)
- Admin products: `/admin/products`

## Notes
- SQLite for local dev. For production, switch to Postgres and we can restore JSON columns and role enums.
- Stripe keys here are TEST keys; use Stripe test cards like 4242 4242 4242 4242.
