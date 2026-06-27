# CryptoShield

Next.js + TypeScript starter for CryptoShield.

Features:
- Signup / Login (JWT)
- Prisma (SQLite dev)
- Admin panel scaffold
- Tailwind CSS styling

Getting started:

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Deploy: adapt `DATABASE_URL` for Railway (Postgres) and set `JWT_SECRET`.
# cryptoshield
