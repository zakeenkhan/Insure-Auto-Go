const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel build script...');

function runCommand(command, errorMessage) {
  try {
    console.log(`▶️ Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`❌ ${errorMessage}:`, error.message);
    console.error('Command failed:', command);
    process.exit(1);
  }
}

// 1. Install dependencies
console.log('📦 Installing dependencies...');
runCommand('npm install --legacy-peer-deps', 'Failed to install dependencies');

// 2. Verify Prisma setup
console.log('🔍 Verifying Prisma setup...');
runCommand('node scripts/verify-prisma.js', 'Prisma verification failed');

// 3. Run pre-build script
console.log('🚧 Running pre-build steps...');
runCommand('node scripts/pre-build.js', 'Pre-build script failed');

// 4. Run build
console.log('🏗️  Building application...');
runCommand('npm run build', 'Build failed');

// 5. Ensure Prisma client is in the correct location
console.log('🔧 Ensuring Prisma client is in the correct location...');
try {
  const prismaClientSource = path.join(process.cwd(), 'node_modules', '.prisma');
  const prismaClientDest = path.join(process.cwd(), 'dist', 'node_modules', '.prisma');
  
  if (!fs.existsSync(path.dirname(prismaClientDest))) {
    fs.mkdirSync(path.dirname(prismaClientDest), { recursive: true });
  }
  
  if (fs.existsSync(prismaClientDest)) {
    fs.rmSync(prismaClientDest, { recursive: true, force: true });
  }
  
  fs.cpSync(prismaClientSource, prismaClientDest, { recursive: true });
  console.log('✅ Prisma client copied to dist/node_modules/.prisma');
} catch (error) {
  console.error('❌ Failed to copy Prisma client:', error);
  process.exit(1);
}

// 6. Run database migrations
console.log('🔄 Running database migrations...');
try {
  // Set DATABASE_URL in the environment if not set
  if (!process.env.DATABASE_URL && process.env.VERCEL) {
    console.log('⚠️  DATABASE_URL not found in environment variables');
    console.log('Please make sure to set DATABASE_URL in your Vercel environment variables');
  }
  
  runCommand('npx prisma migrate deploy', 'Database migration failed');
  console.log('✅ Database migrations completed successfully');
} catch (error) {
  console.error('❌ Database migration failed:', error);
  console.log('If this is the first deployment, you may need to run the initial migration manually');
  console.log('For Vercel, you can run: npx vercel env pull && npx prisma migrate deploy');
  process.exit(1);
}

console.log('✨ Vercel build completed successfully!');
