const fs = require('fs');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;
const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');

let schema = fs.readFileSync(schemaPath, 'utf8');

if (isProduction) {
  // Switch to PostgreSQL for production
  schema = schema.replace(
    /provider = "sqlite"/g,
    'provider = "postgresql"'
  );

  // Enums are now defined directly in the schema file, no need to add them

  // Replace String types with enum types (for backwards compatibility)
  schema = schema.replace(/role\s+String\s+@default\("EDITOR"\)/g, 'role Role @default(EDITOR)');
  schema = schema.replace(/status\s+String\s+@default\("ACTIVE"\)/g, 'status Status @default(ACTIVE)');

  console.log('✅ Configured schema for PostgreSQL (production)');
} else {
  // Ensure SQLite for development
  schema = schema.replace(
    /provider = "postgresql"/g,
    'provider = "sqlite"'
  );
  console.log('✅ Configured schema for SQLite (development)');
}

fs.writeFileSync(schemaPath, schema);