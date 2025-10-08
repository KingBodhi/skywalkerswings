import { loggers } from '@/lib/logger';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const jobs = await prisma.jobPosting.findMany({
      where: { status: 'ACTIVE' },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }]
    });

    return Response.json(jobs);
  } catch (error) {
    loggers.api.error({ error }, 'Failed to load careers');
    return new Response('Internal Server Error', { status: 500 });
  }
}
