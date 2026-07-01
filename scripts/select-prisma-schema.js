const fs = require('fs');
const path = require('path');

const provider = process.env.DATABASE_PROVIDER === 'postgresql' ? 'postgresql' : 'sqlite';
const source = path.join(__dirname, '..', 'prisma', `schema.${provider}.prisma`);
const destination = path.join(__dirname, '..', 'prisma', 'schema.prisma');

if (!fs.existsSync(source)) {
  throw new Error(`Prisma schema source file not found: ${source}`);
}

fs.copyFileSync(source, destination);
console.log(`Selected Prisma schema: ${provider}`);
