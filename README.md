# CryptoShield

A Next.js + TypeScript app for secure project upload, download, and admin management.

## Features
- Admin signup/login flow
- File upload and download management
- JSON-backed metadata storage in `DATA.JSON`
- Country-based download tracking
- Tailwind-based UI

## Local development
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Production build
```bash
npm run build
npm run start
```

## Notes
- This app stores all users, uploads, and downloads in `DATA.JSON`.
- No external database is required.
- Uploaded files are saved to `public/uploads`.
