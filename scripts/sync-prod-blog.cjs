#!/usr/bin/env node

const { spawnSync } = require('child_process');

const dbUrl = process.env.DEPLOY_DATABASE_URL || process.env.DATABASE_URL;

if (!dbUrl) {
  console.error('❌ Missing DEPLOY_DATABASE_URL (or DATABASE_URL) environment variable.');
  console.error('Set DEPLOY_DATABASE_URL to your production connection string before running this script.');
  process.exit(1);
}

const env = { ...process.env, DATABASE_URL: dbUrl };

function run(command, args, label) {
  console.log(`\n🚀 ${label}...`);
  const result = spawnSync(command, args, { stdio: 'inherit', env });
  if (result.status !== 0) {
    console.error(`❌ ${label} failed.`);
    process.exit(result.status || 1);
  }
}

run('npx', ['prisma', 'migrate', 'deploy'], 'Applying Prisma migrations on deployment database');
run('node', ['scripts/seed-skyfox-blog.cjs'], 'Syncing SkyFox blog library on deployment database');

console.log('\n✅ Deployment blog database is up to date.');
