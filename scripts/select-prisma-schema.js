const fs = require('fs');
const path = require('path');

const dbUrl = process.env.DATABASE_URL?.trim() || '';
const providerEnv = process.env.DATABASE_PROVIDER?.trim().toLowerCase();

let provider = 'sqlite';
if (providerEnv) {
  provider = providerEnv;
} else if (dbUrl.startsWith('postgres://') || dbUrl.startsWith('postgresql://')) {
  provider = 'postgresql';
} else if (dbUrl.startsWith('mysql://')) {
  provider = 'mysql';
} else if (dbUrl.startsWith('file:') || dbUrl.startsWith('sqlite:')) {
  provider = 'sqlite';
}

if (!['sqlite', 'postgresql'].includes(provider)) {
  console.warn(`Unknown DATABASE_PROVIDER '${provider}'. Falling back to sqlite.`);
  provider = 'sqlite';
}

const source = path.join(__dirname, '..', 'prisma', `schema.${provider}.prisma`);
const destination = path.join(__dirname, '..', 'prisma', 'schema.prisma');

if (!fs.existsSync(source)) {
  throw new Error(`Prisma schema source file not found: ${source}`);
}

fs.copyFileSync(source, destination);
console.log(`Selected Prisma schema: ${provider}`);
