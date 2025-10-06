import Link from 'next/link';

import AfterDarkImage from '../../components/AfterDarkImage';
import Section from '../../components/Section';

const cultureHighlights = [
  {
    title: 'Design With Desire',
    description:
      'Collaborate with artisans, product engineers, and intimacy educators to craft the next generation of luxury suspension experiences.',
    icon: '🎨',
  },
  {
    title: 'Inclusive From Day One',
    description:
      'We champion LGBTQIA+, kink-positive, and body-diverse perspectives across every team and product decision.',
    icon: '🤝',
  },
  {
    title: 'Hybrid Flexibility',
    description:
      'Studio hubs in NYC and LA with remote creatives across North America supporting asynchronous rituals.',
    icon: '🌎',
  },
];

const benefits = [
  { label: 'Premium health, dental, and mental wellness stipends', icon: '💗' },
  { label: 'Quarterly retreat & sensory lab immersion', icon: '🛫' },
  { label: 'Home studio & swing allowances', icon: '🛠️' },
  { label: 'Unlimited personal days with required unplug weeks', icon: '🌴' },
  { label: 'Education credits for kink, somatic, and design certifications', icon: '📚' },
  { label: 'Sliding-scale product discounts for employees & partners', icon: '🎁' },
];

const openPositions: {
  title: string;
  team: string;
  type: string;
  location: string;
  summary: string;
  url: string;
}[] = [];

export default function CareersPage() {
  return (
    <div className='bg-neutral-50'>
      <Section className='py-20'>
        <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-16 text-center'>
            <div className='inline-flex items-center gap-2 rounded-full bg-accent-100 px-4 py-2 text-sm font-semibold text-accent-700'>
              <span>💼</span> Shape Pleasure Futures
            </div>
            <h1 className='mt-4 font-display text-5xl font-bold text-primary-800'>Careers at SkyFox Swings</h1>
            <p className='mt-4 text-lg text-neutral-600'>Join sensual technologists, artisans, and storytellers creating immersive suspension spaces for adults everywhere.</p>
          </div>

          <div className='grid items-center gap-12 lg:grid-cols-2'>
            <div className='space-y-6'>
              {cultureHighlights.map((item) => (
                <div key={item.title} className='card flex gap-4 border border-neutral-200 p-6'>
                  <div className='text-3xl'>{item.icon}</div>
                  <div>
                    <h2 className='font-display text-2xl font-bold text-primary-800'>{item.title}</h2>
                    <p className='mt-2 text-neutral-600 leading-relaxed'>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className='relative'>
              <div className='overflow-hidden rounded-3xl border border-primary-100 shadow-strong'>
                <AfterDarkImage
                  src='/images/careers-studio.jpg'
                  fallbackSrc='/images/hero.svg'
                  alt='SkyFox Swings studio moodboard with fabrics, hardware, and concept art'
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='absolute -bottom-6 -right-6 w-64 rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft'>
                <div className='text-xs font-semibold uppercase tracking-wide text-neutral-500'>Studio Snapshot</div>
                <div className='mt-1 font-display text-xl text-primary-800'>Sensory Lab • Brooklyn</div>
                <p className='mt-2 text-xs text-neutral-600'>Open lab nights connect our team with riggers, performers, and somatic guides.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className='bg-white py-20'>
        <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-12 text-center'>
            <h2 className='font-display text-4xl font-bold text-primary-800'>Benefits That Hold You</h2>
            <p className='mt-3 text-neutral-600'>We craft environments where creativity, consent, and wellbeing flourish together.</p>
          </div>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {benefits.map((benefit) => (
              <div key={benefit.label} className='card border border-neutral-200 bg-neutral-50 p-6 text-left'>
                <div className='mb-3 text-3xl text-accent-700'>{benefit.icon}</div>
                <p className='text-sm text-neutral-700 leading-relaxed'>{benefit.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className='bg-neutral-100 py-20'>
        <div className='mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='font-display text-4xl font-bold text-primary-800'>Open Roles</h2>
          <p className='mt-3 text-neutral-600'>Share your portfolio and we will reach out when the perfect project opens.</p>

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
                <div key={role.title} className='card border border-neutral-200 bg-white p-8 shadow-soft'>
                  <div className='flex flex-wrap items-center gap-3'>
                    <h3 className='font-display text-2xl font-semibold text-primary-800'>{role.title}</h3>
                    <span className='rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-700'>{role.team}</span>
                    <span className='rounded-full bg-accent-100 px-3 py-1 text-sm font-semibold text-accent-700'>{role.type}</span>
                  </div>
                  <div className='mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-600'>
                    <span>{role.location}</span>
                    <span className='text-neutral-400'>•</span>
                    <span>{role.summary}</span>
                  </div>
                  <Link href={role.url} className='mt-6 inline-flex items-center gap-2 text-accent-700 font-semibold hover:text-accent-900'>
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
