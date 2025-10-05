import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('👤 Creating System Admin user...');

  const email = await question('Admin email: ');
  if (!email || !email.includes('@')) {
    throw new Error('Valid email is required');
  }

  console.log('Enter password (minimum 12 characters, will not echo):');
  const password = await question('Password: ');

  if (password.length < 12) {
    throw new Error('Password must be at least 12 characters');
  }

  const name = await question('Admin name: ') || 'System Admin';

  // Check if admin user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    console.log('🔄 Updating existing admin user...');
    // Update existing user
    const hashedPassword = await bcrypt.hash(password, 12);
    
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        name,
        role: 'ADMIN'
      }
    });
  } else {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin user
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'ADMIN'
      }
    });
  }

  console.log('✅ System Admin user ready!');
  console.log('📧 Email:', email);
  console.log('👑 Role: ADMIN');
  console.log('⚠️  Please store the password securely and change it after first login');

  rl.close();
}

main()
  .catch((e) => {
    console.error('❌ Error creating system admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
