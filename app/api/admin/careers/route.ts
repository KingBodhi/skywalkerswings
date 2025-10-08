import { ZodError } from 'zod';

import { getSession } from '@/lib/auth';
import { loggers } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { normalizeJobPayload, resolvePublishedAt } from '@/lib/jobs';
import { JobPostingSchema } from '@/lib/schemas';

function unauthorizedResponse() {
  return new Response('Unauthorized', { status: 401 });
}

export async function GET() {
  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'EDITOR')) {
    return unauthorizedResponse();
  }

  try {
    const jobs = await prisma.jobPosting.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return Response.json(jobs);
  } catch (error) {
    loggers.admin.error({ error }, 'Failed to list job postings');
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'EDITOR')) {
    return unauthorizedResponse();
  }

  try {
    const raw = await req.json();
    const parsed = JobPostingSchema.parse(raw);
    const payload = normalizeJobPayload(parsed);

    const existing = await prisma.jobPosting.findUnique({
      where: { slug: payload.slug }
    });

    if (existing) {
      return Response.json(
        { success: false, message: 'A job posting with this slug already exists.' },
        { status: 409 }
      );
    }

    const job = await prisma.jobPosting.create({
      data: {
        ...payload,
        publishedAt: resolvePublishedAt(payload.status, null)
      }
    });

    loggers.admin.info(
      { jobId: job.id, slug: job.slug, userId: session.userId },
      'Job posting created'
    );

    return Response.json({ success: true, job }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(
        {
          success: false,
          message: 'Invalid job data',
          details: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    loggers.admin.error({ error }, 'Job posting create failed');
    return new Response('Internal Server Error', { status: 500 });
  }
}
