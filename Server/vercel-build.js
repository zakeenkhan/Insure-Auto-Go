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

// 1. Set environment
process.env.NODE_ENV = 'production';
console.log('🌐 Environment set to:', process.env.NODE_ENV);

// 2. Install dependencies
console.log('📦 Installing dependencies...');
runCommand('npm install --legacy-peer-deps', 'Failed to install dependencies');

// 3. Generate Prisma client
console.log('🔧 Generating Prisma client...');
runCommand('npx prisma generate', 'Failed to generate Prisma client');

// 4. Verify Prisma setup
console.log('🔍 Verifying Prisma setup...');
runCommand('node scripts/verify-prisma.js', 'Prisma verification failed');

// 5. Run pre-build script
console.log('🚧 Running pre-build steps...');
runCommand('node scripts/pre-build.js', 'Pre-build script failed');

// 6. Run build
console.log('🏗️  Building application...');
runCommand('npm run build', 'Build failed');

// 7. Copy necessary files to dist
console.log('📂 Copying required files to dist directory...');
const filesToCopy = [
  { from: 'package.json', to: 'dist/package.json' },
  { from: 'prisma/schema.prisma', to: 'dist/prisma/schema.prisma' },
  { from: 'node_modules/.prisma', to: 'dist/node_modules/.prisma', isDir: true },
  { from: 'node_modules/@prisma/client', to: 'dist/node_modules/@prisma/client', isDir: true },
  { from: 'node_modules/.prisma/client', to: 'dist/node_modules/.prisma/client', isDir: true }
];

filesToCopy.forEach(({ from, to, isDir = false }) => {
  try {
    const destDir = isDir ? to : path.dirname(to);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    if (fs.existsSync(to)) {
      if (isDir) {
        fs.rmSync(to, { recursive: true, force: true });
      } else {
        fs.unlinkSync(to);
      }
    }
    
    if (isDir) {
      fs.cpSync(from, to, { recursive: true });
    } else {
      fs.copyFileSync(from, to);
    }
    console.log(`✅ Copied ${from} to ${to}`);
  } catch (error) {
    console.error(`❌ Failed to copy ${from} to ${to}:`, error.message);
    process.exit(1);
  }
});

// 8. Install production dependencies in dist
console.log('📦 Installing production dependencies in dist...');
process.chdir('dist');
runCommand('npm install --production --legacy-peer-deps', 'Failed to install production dependencies');
process.chdir('..');

// 9. Run database migrations if DATABASE_URL is set
if (process.env.DATABASE_URL) {
  console.log('🔄 Running database migrations...');
  try {
    runCommand('npx prisma migrate deploy', 'Database migration failed');
    console.log('✅ Database migrations completed successfully');
  } catch (error) {
    console.error('❌ Database migration failed:', error);
    console.log('If this is the first deployment, you may need to run the initial migration manually');
    console.log('For Vercel, you can run: npx vercel env pull && npx prisma migrate deploy');
    process.exit(1);
  }
} else {
  console.log('⚠️  DATABASE_URL not found. Skipping database migrations.');
  console.log('Please set DATABASE_URL in your Vercel environment variables for production use.');
}

console.log('✨ Vercel build completed successfully!');
