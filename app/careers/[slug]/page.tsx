import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Section from '@/components/Section';
import { summarizeJobContent, splitBulletList, splitParagraphs } from '@/lib/jobs';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function fetchJob(slug: string) {
  try {
    return await prisma.jobPosting.findFirst({
      where: {
        slug,
        status: 'ACTIVE'
      }
    });
  } catch (error) {
    console.error('Failed to load job posting', slug, error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const job = await prisma.jobPosting.findFirst({ where: { slug: params.slug } });
    if (!job) {
      return {
        title: 'Role not found | SkyFox Swings Careers'
      };
    }

    return {
      title: `${job.title} | SkyFox Swings Careers`,
      description: summarizeJobContent(job)
    };
  } catch (error) {
    console.error('Failed to generate job metadata', params.slug, error);
    return {
      title: 'SkyFox Swings Careers'
    };
  }
}

export default async function CareerDetailPage({ params }: { params: { slug: string } }) {
  const job = await fetchJob(params.slug);

  if (!job) {
    notFound();
  }

  const descriptionParagraphs = (() => {
    const paragraphs = splitParagraphs(job.description);
    if (paragraphs.length > 0) return paragraphs;
    return job.description
      ? job.description.split('\n').map((line) => line.trim()).filter((line) => line.length > 0)
      : [];
  })();

  const responsibilities = splitBulletList(job.responsibilities);
  const requirements = splitBulletList(job.requirements);
  const benefits = splitBulletList(job.benefits);

  const formattedType = job.type.replace('_', ' ');
  const postedDate = job.publishedAt ?? job.createdAt;
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(postedDate);

  const applyEmail = 'careers@skyfoxswings.com';
  const mailto = `mailto:${applyEmail}?subject=${encodeURIComponent(`${job.title} Application`)}`;

  return (
    <div className="bg-neutral-50 min-h-screen">
      <Section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-primary-600 transition-colors mb-6"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Careers
          </Link>

          <article className="card border border-neutral-200 bg-white p-10 shadow-soft">
            <header className="border-b border-neutral-200 pb-6 mb-8 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 uppercase tracking-wide">
                {formattedType}
              </div>
              <h1 className="font-display text-4xl font-bold text-primary-800">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600">
                <span>{job.department}</span>
                <span className="text-neutral-400">•</span>
                <span>{job.location || 'Hybrid / Remote-friendly'}</span>
                {job.salaryRange && (
                  <>
                    <span className="text-neutral-400">•</span>
                    <span>{job.salaryRange}</span>
                  </>
                )}
                <span className="text-neutral-400">•</span>
                <span>Posted {formattedDate}</span>
              </div>
            </header>

            {descriptionParagraphs.length > 0 && (
              <section className="space-y-4 text-neutral-700 leading-relaxed">
                {descriptionParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </section>
            )}

            {responsibilities.length > 0 && (
              <section className="mt-10">
                <h2 className="font-display text-2xl font-semibold text-primary-700 mb-4">Key Responsibilities</h2>
                <ul className="ml-6 list-disc space-y-2 text-neutral-700">
                  {responsibilities.map((item, index) => (
                    <li key={`resp-${index}`}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {requirements.length > 0 && (
              <section className="mt-10">
                <h2 className="font-display text-2xl font-semibold text-primary-700 mb-4">Requirements & Qualifications</h2>
                <ul className="ml-6 list-disc space-y-2 text-neutral-700">
                  {requirements.map((item, index) => (
                    <li key={`req-${index}`}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {benefits.length > 0 && (
              <section className="mt-10">
                <h2 className="font-display text-2xl font-semibold text-primary-700 mb-4">Benefits & Rituals</h2>
                <ul className="ml-6 list-disc space-y-2 text-neutral-700">
                  {benefits.map((item, index) => (
                    <li key={`ben-${index}`}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mt-12 rounded-2xl border border-accent-200 bg-accent-50 p-6">
              <h3 className="font-display text-xl font-semibold text-accent-700 mb-2">How to Apply</h3>
              <p className="text-neutral-700 mb-4">
                Email your portfolio, rituals, or a voice note about the worlds you want to build with SkyFox. We review every submission with care and respond within two weeks.
              </p>
              <Link
                href={mailto}
                className="inline-flex items-center gap-2 rounded-xl bg-accent-500 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-accent-600"
              >
                Apply Now
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </section>
          </article>
        </div>
      </Section>
    </div>
  );
}
