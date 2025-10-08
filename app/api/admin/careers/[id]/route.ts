import { ZodError } from 'zod';
import type { JobStatus } from '@prisma/client';

import { getSession } from '@/lib/auth';
import { loggers } from '@/lib/logger';
import { normalizeJobPayload, resolvePublishedAt } from '@/lib/jobs';
import { prisma } from '@/lib/prisma';
import { UpdateJobPostingSchema } from '@/lib/schemas';

function unauthorizedResponse() {
  return new Response('Unauthorized', { status: 401 });
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'EDITOR')) {
    return unauthorizedResponse();
  }

  const job = await prisma.jobPosting.findUnique({ where: { id: params.id } });
  if (!job) {
    return new Response('Not Found', { status: 404 });
  }

  return Response.json(job);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'EDITOR')) {
    return unauthorizedResponse();
  }

  try {
    const payload = UpdateJobPostingSchema.parse(await req.json());
    const job = await prisma.jobPosting.findUnique({ where: { id: params.id } });

    if (!job) {
      return new Response('Not Found', { status: 404 });
    }

    const normalized = normalizeJobPayload(payload);
    const updateData = Object.entries(normalized).reduce<Record<string, unknown>>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (typeof updateData.slug === 'string' && updateData.slug !== job.slug) {
      const slugExists = await prisma.jobPosting.findUnique({
        where: { slug: updateData.slug }
      });

      if (slugExists) {
        return Response.json(
          { success: false, message: 'Another job posting already uses this slug.' },
          { status: 409 }
        );
      }
    }

    const finalStatus = (updateData.status ?? job.status) as JobStatus;
    updateData.publishedAt = resolvePublishedAt(finalStatus, job.publishedAt);

    const updated = await prisma.jobPosting.update({
      where: { id: params.id },
      data: updateData
    });

    loggers.admin.info(
      { jobId: updated.id, slug: updated.slug, userId: session.userId },
      'Job posting updated'
    );

    return Response.json({ success: true, job: updated });
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

    loggers.admin.error({ error, jobId: params.id }, 'Job posting update failed');
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'EDITOR')) {
    return unauthorizedResponse();
  }

  try {
    const deleted = await prisma.jobPosting.delete({ where: { id: params.id } });

    loggers.admin.info(
      { jobId: deleted.id, slug: deleted.slug, userId: session.userId },
      'Job posting deleted'
    );

    return Response.json({ success: true });
  } catch (error) {
    if ((error as { code?: string }).code === 'P2025') {
      return new Response('Not Found', { status: 404 });
    }

    loggers.admin.error({ error, jobId: params.id }, 'Job posting delete failed');
    return new Response('Internal Server Error', { status: 500 });
  }
}
