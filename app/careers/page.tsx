import Link from 'next/link';

import Section from '@/components/Section';
import { summarizeJobContent } from '@/lib/jobs';
import { prisma } from '@/lib/prisma';
import type { JobPosting } from '@prisma/client';

export const dynamic = 'force-dynamic';

function formatType(type: JobPosting['type']): string {
  return type.replace('_', ' ');
}

function formatPostedDate(job: JobPosting): string {
  const date = job.publishedAt ?? job.createdAt;
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

async function loadOpenPositions() {
  try {
    return await prisma.jobPosting.findMany({
      where: { status: 'ACTIVE' },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }]
    });
  } catch (error) {
    console.error('Failed to load job postings for careers page:', error);
    return [];
  }
}

export default async function CareersPage() {
  const openPositions = await loadOpenPositions();

  return (
    <div className='bg-neutral-50'>
      <Section className='py-20'>
        <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center'>
          <div className='inline-flex items-center gap-2 rounded-full bg-accent-100 px-4 py-2 text-sm font-semibold text-accent-700'>
            <span>💼</span> Shape Pleasure Futures
          </div>
          <h1 className='mt-4 font-display text-5xl font-bold text-primary-800'>Careers at SkyFox Swings</h1>
          <p className='mt-4 text-lg text-neutral-600'>Join sensual technologists, artisans, and storytellers creating immersive suspension spaces for adults everywhere.</p>
        </div>
      </Section>

      <Section className='bg-neutral-100 py-20'>
        <div className='mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='font-display text-4xl font-bold text-primary-800'>Open Roles</h2>
          <p className='mt-3 text-neutral-600'>Share your portfolio or apply directly to these roles crafted for sensation engineers and hospitality storytellers.</p>

          {openPositions.length === 0 ? (
            <div className='card mt-10 space-y-6 rounded-3xl border border-neutral-200 bg-white p-10 text-center shadow-soft'>
              <div className='text-6xl'>🕊️</div>
              <p className='mx-auto max-w-2xl text-neutral-600'>No posted openings today, but we love hearing from designers, engineers, intimacy coaches, storytellers, and hospitality leaders who align with our mission.</p>
              <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
                <Link href='mailto:careers@skyfoxswings.com' className='btn-primary'>Send Your Portfolio</Link>
                <Link href='/contact' className='btn-secondary'>Book a Conversation</Link>
              </div>
            </div>
          ) : (
            <div className='mt-10 space-y-6 text-left'>
              {openPositions.map((role) => (
                <div key={role.id} className='card border border-neutral-200 bg-white p-8 shadow-soft'>
                  <div className='flex flex-wrap items-center gap-3'>
                    <h3 className='font-display text-2xl font-semibold text-primary-800'>{role.title}</h3>
                    <span className='rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-700'>{role.department}</span>
                    <span className='rounded-full bg-accent-100 px-3 py-1 text-sm font-semibold text-accent-700'>{formatType(role.type)}</span>
                  </div>
                  <div className='mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-600'>
                    <span>{role.location || 'Hybrid / Remote-friendly'}</span>
                    <span className='text-neutral-400'>•</span>
                    <span>{summarizeJobContent(role)}</span>
                    {role.salaryRange && (
                      <>
                        <span className='text-neutral-400'>•</span>
                        <span>{role.salaryRange}</span>
                      </>
                    )}
                    <span className='text-neutral-400'>•</span>
                    <span>Posted {formatPostedDate(role)}</span>
                  </div>
                  <Link href={`/careers/${role.slug}`} className='mt-6 inline-flex items-center gap-2 text-accent-700 font-semibold hover:text-accent-900'>
                    View role details
                    <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section className='py-20'>
        <div className='mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-primary-700 to-primary-500 p-12 text-white shadow-strong'>
          <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
            <div className='space-y-3'>
              <h2 className='font-display text-3xl font-bold'>Let’s Create Magic Together</h2>
              <p className='text-white/80 text-lg'>Tell us about the worlds you want to build. We welcome collaborations with freelancers, studios, and hospitality groups looking to elevate sensual experiences.</p>
            </div>
            <Link href='mailto:careers@skyfoxswings.com' className='inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 font-semibold text-primary-800 transition-colors duration-200 hover:bg-neutral-100'>
              Introduce Yourself
              <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
              </svg>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
