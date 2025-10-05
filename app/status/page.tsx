import Section from '@/components/Section';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function safeCount(fn: () => Promise<number>): Promise<number> {
  try {
    return await fn();
  } catch (error) {
    console.warn('[status] database count failed', error);
    return 0;
  }
}

export default async function Page() {
  const dbConfigured = Boolean(process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('file:'));

  let products = 0;
  let collections = 0;
  let statusMessage = dbConfigured ? 'Connected' : 'Database not configured';

  if (dbConfigured) {
    products = await safeCount(() => prisma.product.count());
    collections = await safeCount(() => prisma.collection.count());
    if (products === 0 && collections === 0) {
      statusMessage = 'Connected (no records)';
    }
  }

  return (
    <Section title="Status" center subtitle="Prisma connection check">
      <div className="mx-auto max-w-md card p-6 text-sm space-y-2 text-neutral-700">
        <div className="font-semibold text-neutral-900">Status: {statusMessage}</div>
        <div>Products in DB: {products}</div>
        <div>Collections in DB: {collections}</div>
      </div>
    </Section>
  );
}
