import { loggers } from '@/lib/logger';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  try {
    const job = await prisma.jobPosting.findFirst({
      where: {
        slug: params.slug,
        status: 'ACTIVE'
      }
    });

    if (!job) {
      return new Response('Not Found', { status: 404 });
    }

    return Response.json(job);
  } catch (error) {
    loggers.api.error({ error, slug: params.slug }, 'Failed to load career');
    return new Response('Internal Server Error', { status: 500 });
  }
}
