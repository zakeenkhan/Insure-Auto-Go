const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Prisma client setup...');

const prismaClientPath = path.join(
  process.cwd(),
  'node_modules',
  '.prisma',
  'client',
  'index.js'
);

if (!fs.existsSync(prismaClientPath)) {
  console.error('❌ Prisma client not found at:', prismaClientPath);
  console.log('Please run: npx prisma generate');
  process.exit(1);
}

console.log('✅ Prisma client is properly generated');

// Verify the schema.prisma is accessible
const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
if (!fs.existsSync(schemaPath)) {
  console.error('❌ schema.prisma not found at:', schemaPath);
  process.exit(1);
}

console.log('✅ Prisma schema is accessible');

// Check if the client is properly generated in node_modules
const prismaClientPackage = path.join(
  process.cwd(),
  'node_modules',
  '@prisma',
  'client',
  'index.d.ts'
);

if (!fs.existsSync(prismaClientPackage)) {
  console.warn('⚠️  @prisma/client package not found in node_modules');
  console.log('Please run: npm install @prisma/client');
  process.exit(1);
}

console.log('✅ @prisma/client is properly installed');
console.log('✨ Prisma verification completed successfully');
