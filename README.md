# CryptoShield

A Next.js + TypeScript app for secure project upload, download, and admin management.

## Features
- Admin signup/login flow
- File upload and download management
- Prisma-backed metadata storage
- Country-based download tracking
- Tailwind-based UI

## Local development
```bash
npm install
cp .env.example .env.local
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## Production build
```bash
npm run build
npm run start
```

## Railway deployment
1. Push this repository to GitHub.
2. Create a new Railway project and connect the GitHub repo.
3. Add these environment variables:
   - DATABASE_URL=postgresql://...
   - JWT_SECRET=your-strong-secret
   - NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com
   - NEXT_PUBLIC_ADMIN_PASSWORD=admin123
4. Use these build/start settings:
   - Build Command: npm run build
   - Start Command: npm start

> Note: This app uses Prisma. For Railway, switch from SQLite to PostgreSQL.
