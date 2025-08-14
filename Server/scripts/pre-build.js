const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Running pre-build script...');

// Create dist directory if it doesn't exist
const distDir = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  console.log('✅ Created dist directory');
}

// Copy prisma directory to dist
const prismaDir = path.join(process.cwd(), 'prisma');
const distPrismaDir = path.join(distDir, 'prisma');

if (fs.existsSync(prismaDir)) {
  if (fs.existsSync(distPrismaDir)) {
    fs.rmSync(distPrismaDir, { recursive: true, force: true });
  }
  fs.cpSync(prismaDir, distPrismaDir, { recursive: true });
  console.log('✅ Copied prisma directory to dist');}

// Generate Prisma client
console.log('🔧 Generating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated successfully');
} catch (error) {
  console.error('❌ Failed to generate Prisma client:', error);
  process.exit(1);
}

console.log('✨ Pre-build script completed successfully');
