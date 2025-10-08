import type { JobStatus } from '@prisma/client';

const OPTIONAL_FIELDS = [
  'location',
  'salaryRange',
  'description',
  'requirements',
  'responsibilities',
  'benefits'
] as const;

const REQUIRED_TRIM_FIELDS = ['title', 'department', 'slug'] as const;

type JobPayload = Record<string, any>;

type OptionalField = typeof OPTIONAL_FIELDS[number];

type RequiredField = typeof REQUIRED_TRIM_FIELDS[number];

export function normalizeJobPayload<T extends JobPayload>(payload: T): T {
  const data: JobPayload = { ...payload };

  REQUIRED_TRIM_FIELDS.forEach((field) => {
    const value = data[field as RequiredField];
    if (typeof value === 'string') {
      const trimmed = value.trim();
      data[field as RequiredField] = field === 'slug' ? trimmed.toLowerCase() : trimmed;
    }
  });

  OPTIONAL_FIELDS.forEach((field) => {
    const value = data[field as OptionalField];
    if (typeof value === 'string') {
      const trimmed = value.trim();
      data[field as OptionalField] = trimmed.length > 0 ? trimmed : null;
    }
  });

  return data as T;
}

export function resolvePublishedAt(status: JobStatus, current?: Date | null): Date | null {
  if (status === 'ACTIVE') {
    return current ?? new Date();
  }
  return null;
}

type JobContentFields = {
  description?: string | null;
  responsibilities?: string | null;
  requirements?: string | null;
  benefits?: string | null;
};

export function summarizeJobContent(job: JobContentFields): string {
  const sources = [job.description, job.responsibilities, job.requirements];
  for (const text of sources) {
    if (text) {
      const firstMeaningfulLine = text
        .split('\n')
        .map((line) => line.replace(/^•\s*/, '').trim())
        .find((line) => line.length > 0);
      if (firstMeaningfulLine) {
        return firstMeaningfulLine;
      }
    }
  }
  return 'Share your portfolio and let us sculpt a role around your craft.';
}

export function splitBulletList(text?: string | null): string[] {
  if (!text) return [];
  return text
    .split('\n')
    .map((line) => line.replace(/^•\s*/, '').trim())
    .filter((line) => line.length > 0);
}

export function splitParagraphs(text?: string | null): string[] {
  if (!text) return [];
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0);
}
