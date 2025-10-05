import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('👤 Setting up admin user...');

  const email = 'admin@skywalker.com';
  const password = 'WillRise2024!';
  const name = 'Admin User';

  console.log('Using credentials:');
  console.log('📧 Email:', email);
  console.log('🔑 Password:', password);
  console.log('👤 Name:', name);

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create or update admin user
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      name,
      role: 'ADMIN'
    },
    create: {
      email,
      password: hashedPassword,
      name,
      role: 'ADMIN'
    }
  });

  console.log('✅ Admin user created/updated successfully!');
  console.log('🆔 User ID:', user.id);
  console.log('👑 Role:', user.role);
  console.log('');
  console.log('You can now login to the admin panel at: http://localhost:3000/admin/login');
}

main()
  .catch((e) => {
    console.error('❌ Error creating admin user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });