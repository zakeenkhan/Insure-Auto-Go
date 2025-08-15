const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Running pre-build script...');

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${path.relative(process.cwd(), dirPath)}`);
    return false;
  }
  return true;
}

function copyDirectory(source, target) {
  if (!fs.existsSync(source)) {
    console.warn(`⚠️  Source directory not found: ${source}`);
    return false;
  }
  
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
  
  ensureDirectoryExists(path.dirname(target));
  fs.cpSync(source, target, { recursive: true });
  console.log(`✅ Copied ${path.relative(process.cwd(), source)} to ${path.relative(process.cwd(), target)}`);
  return true;
}

// 1. Create necessary directories
console.log('📂 Ensuring directories exist...');
const distDir = path.join(process.cwd(), 'dist');
ensureDirectoryExists(distDir);

// 2. Copy essential files and directories
console.log('📄 Copying essential files...');
const filesToCopy = [
  { from: 'prisma', to: 'dist/prisma', isDir: true },
  { from: 'package.json', to: 'dist/package.json' },
  { from: '.env', to: 'dist/.env', optional: true },
  { from: '.env.example', to: 'dist/.env.example', optional: true },
  { from: 'tsconfig.json', to: 'dist/tsconfig.json', optional: true },
  { from: 'tsconfig.build.json', to: 'dist/tsconfig.build.json', optional: true }
];

filesToCopy.forEach(({ from, to, isDir = false, optional = false }) => {
  const sourcePath = path.join(process.cwd(), from);
  const targetPath = path.join(process.cwd(), to);
  
  if (!fs.existsSync(sourcePath)) {
    if (!optional) {
      console.error(`❌ Required file/directory not found: ${sourcePath}`);
      process.exit(1);
    }
    console.warn(`⚠️  Optional file not found: ${sourcePath}`);
    return;
  }
  
  if (isDir) {
    copyDirectory(sourcePath, targetPath);
  } else {
    ensureDirectoryExists(path.dirname(targetPath));
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`✅ Copied ${from} to ${to}`);
  }
});

// 3. Generate Prisma client
console.log('🔧 Generating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated successfully');
} catch (error) {
  console.error('❌ Failed to generate Prisma client');
  console.error('Make sure your database is accessible and the schema is valid');
  process.exit(1);
}

console.log('✨ Pre-build script completed successfully');
