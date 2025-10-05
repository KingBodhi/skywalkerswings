const fs = require('fs');
const path = require('path');

const dbUrl = process.env.DATABASE_URL || '';
const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');

let schema = fs.readFileSync(schemaPath, 'utf8');

if (dbUrl.startsWith('file:')) {
  schema = schema.replace(
    /provider = "postgresql"/g,
    'provider = "sqlite"'
  );
  console.log('✅ Configured schema for SQLite (file-based Database URL detected)');
} else {
  schema = schema.replace(
    /provider = "sqlite"/g,
    'provider = "postgresql"'
  );
  console.log('✅ Configured schema for PostgreSQL');
}

fs.writeFileSync(schemaPath, schema);
