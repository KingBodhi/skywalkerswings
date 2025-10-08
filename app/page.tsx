import Link from 'next/link';

import AfterDarkImage from '@/components/AfterDarkImage';
import HeroImageRotator from '@/components/HeroImageRotator';
import Section from '@/components/Section';
import TrustBadges from '@/components/TrustBadges';
import blogPostsData from '@/data/blog-posts.json';

export const dynamic = 'force-dynamic';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  publishedAt: string | null;
};

const sensoryHighlights = [
  {
    icon: '🕯️',
    title: 'Atmosphere That Pulls You In',
    copy: 'Layer lighting, scent, and soundscapes so your swing suite feels cinematic the moment you enter.',
  },
  {
    icon: '🪢',
    title: 'Rigging Without Guesswork',
    copy: 'Concierge mounting plans, certified installer referrals, and weight-tested anchors rated to 600 lb.',
  },
  {
    icon: '🫶',
    title: 'Bodies Held In Softness',
    copy: 'Memory-foam cradles, inclusive strap lengths, and washable covers tuned for every curve.',
  },
];

const heroImages = [
  { src: '/uploads/candy-floss-1.png', alt: 'Candy Floss faux fur swing' },
  { src: '/uploads/blue-rainbow-1.png', alt: 'Blue Rainbow faux fur swing' },
  { src: '/uploads/honeybee-express-1.png', alt: 'HoneyBee Express faux fur swing' },
  { src: '/uploads/red-velvet-1.png', alt: 'Red Velvet faux fur swing' },
  { src: '/uploads/caramel-cream-1.png', alt: 'Caramel Cream faux fur swing' },
  { src: '/uploads/kiwi-stars-1.png', alt: 'Kiwi Stars faux fur swing' },
  { src: '/uploads/brandy-snap-1.png', alt: 'Brandy Snap faux fur swing' },
  { src: '/uploads/orange-crush-1.png', alt: 'Orange Crush faux fur swing' },
  { src: '/uploads/purple-crush-1.png', alt: 'Purple Crush faux fur swing' },
];

const solutionCards = [
  {
    heading: 'Signature Velvet Swings',
    description: 'Plush, weight-tested suspension swings in velvet, leather, and satin finishes.',
    link: '/collection/signature-swings',
    image: '/images/products/WH-ORFF-CSFH-1.jpg',
  },
  {
    heading: 'Faux Fur Fantasy',
    description: 'Limited faux fur and feather trims inspired by our SkyFox studio mood boards.',
    link: '/collection/faux-fur',
    image: '/images/skyfox-placeholder.png',
  },
  {
    heading: 'Doorway & Travel Kits',
    description: 'Apartment-friendly doorway rigs with quick installs, padded straps, and discreet storage bags.',
    link: '/collection/doorway',
    image: '/images/products/WH-TLSH-1.jpg',
  },
  {
    heading: 'Frames & Anchor Systems',
    description: 'Freestanding Nebula frames and hardware bundles for suites, studios, and hospitality installs.',
    link: '/collection/support-stands',
    image: '/images/products/WH-RCH-21-1.jpg',
  },
];

const flagshipFeatures = [
  'Ultra-plush faux fur upholstery with hidden memory-foam cradle',
  'Dual-mount hardware kit rated to 600 lb with 360° swivel',
  'Quick-clip straps for fast doorframe, beam, or stand installs',
  'Concierge textile swatch kit and post-install styling session',
];

function BlogSection({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <Section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-100 px-4 py-2 text-sm font-semibold text-accent-700">
              Inspiration
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold text-primary-900">Sensual Suspension Journal</h2>
            <p className="mt-2 max-w-xl text-neutral-600">Concierge tips, styling notes, and aftercare rituals from our studio team.</p>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-accent-700 hover:text-accent-900">
            Open the journal
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {posts.map((post) => (
            <article key={post.id} className="card overflow-hidden p-0">
              <AfterDarkImage
                src={post.featuredImage || '/images/skyfox-placeholder.png'}
                fallbackSrc="/images/hero.svg"
                alt={post.title}
                className="h-48 w-full object-cover"
              />
              <div className="space-y-3 p-6">
                <h3 className="font-display text-xl text-primary-900">{post.title}</h3>
                {post.excerpt && <p className="text-sm text-neutral-600 leading-relaxed">{post.excerpt}</p>}
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-accent-700 font-semibold hover:text-accent-900">
                  Read more
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-700 to-primary-500 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,126,172,0.25),_transparent_60%)]" />
      <div className="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col-reverse items-center gap-8 px-4 py-12 sm:px-6 sm:min-h-[85vh] lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-20 lg:min-h-[92vh]">
        <div className="w-full max-w-xl space-y-5 text-center lg:max-w-none lg:flex-1 lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em]">
            <span>✨</span> Luxury Suspension Systems
          </span>
          <h1 className="font-display text-[1.9rem] leading-tight text-white sm:text-[2.4rem] lg:text-[2.75rem]">
            Elevate Indulgence with <span className="text-accent-200">SkyFox Suspension Systems</span>
          </h1>
          <p className="text-sm text-white/85 sm:text-base lg:text-lg">
            A SkyFox Swing transforms any room into a suspended sanctuary, fusing bespoke materials with certified hardware for nights that never touch the floor.
          </p>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-start">
            <Link href="/shop" className="btn-primary">Shop Suspension Swings</Link>
            <Link
              href="/contact"
              className="btn-secondary bg-white text-primary-700 border-transparent shadow-sm hover:bg-accent-50 hover:text-primary-900"
            >
              Book Concierge Consult
            </Link>
          </div>
        </div>
        <div className="relative w-full max-w-xl lg:flex-1">
          <div className="absolute -top-8 -left-6 hidden h-32 w-32 rounded-full bg-accent-400/30 blur-3xl lg:block" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-primary-800/40 shadow-lg backdrop-blur-sm aspect-square max-h-[520px] w-full lg:max-h-[600px]">
            {heroImages.length ? (
              <HeroImageRotator images={heroImages} className="h-full w-full" />
            ) : (
              <AfterDarkImage
                src="/images/hero-suspension.jpg"
                fallbackSrc="/images/hero.svg"
                alt="SkyFox Swing"
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoShowcase() {
  return (
    <div className="relative mt-8 overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-primary-900 to-primary-600 shadow-md">
      <div className="absolute inset-0 bg-primary-900/40 backdrop-blur-sm" />
      <div className="relative flex aspect-video items-center justify-center">
        <button
          type="button"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary-700 shadow transition-transform duration-200 hover:scale-105"
          aria-label="Play SkyFox Swings video"
        >
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.5 5.5v9l8-4.5-8-4.5z" />
          </svg>
        </button>
      </div>
      <div className="absolute bottom-4 left-5 right-5 rounded-2xl bg-white/90 px-4 py-3 text-primary-800 shadow-sm">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-primary-500">Studio Premiere</div>
        <p className="mt-1 text-xs text-primary-800/80">Concierge walk-through of installation options and position flows — releasing Winter 2025.</p>
      </div>
    </div>
  );
}

function SensorySection() {
  return (
    <Section className="bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold text-primary-900">Design a Suspension Experience, Not Just a Swing</h2>
          <p className="mt-4 max-w-2xl text-center text-neutral-600 md:mx-auto">
            Our concierge team choreographs every detail so your guests, partners, or clients feel supported, aroused, and safe enough to let go.
          </p>
        </div>
        <VideoShowcase />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {sensoryHighlights.map((item) => (
            <div key={item.title} className="card border border-neutral-200 bg-white p-6 text-left">
              <div className="text-4xl">{item.icon}</div>
              <h3 className="mt-4 font-display text-2xl font-semibold text-primary-800">{item.title}</h3>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function FeaturedProduct() {
  return (
    <Section className="bg-white">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="flex flex-col justify-center space-y-5 px-8 py-12 sm:px-12 lg:px-14">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-100 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-700">Featured Product</span>
            <div className="space-y-3">
              <h2 className="font-display text-[2.1rem] font-bold text-primary-900 sm:text-4xl">Deluxe Swing with Faux Fur</h2>
              <p className="text-base text-neutral-600 sm:text-lg">Our best-selling faux fur swing wraps every edge in plush texture, pairing couture textiles with pro-grade suspension hardware for an indulgent, weightless ride.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {flagshipFeatures.map((feature) => (
                <div key={feature} className="flex items-start gap-2 text-sm text-neutral-600">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-[11px] font-semibold">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <Link href="/product/deluxe-swing-with-faux-fur" className="btn-primary">View Product Details</Link>
              <span className="text-sm font-semibold text-primary-700">From $450 · faux fur swatch kit included</span>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
              <span>600 lb Rated</span>
              <span>Removable Covers</span>
              <span>360° Swivel</span>
              <span>Discreet Shipping</span>
            </div>
          </div>
          <div className="relative min-h-[300px] overflow-hidden bg-neutral-100">
            <AfterDarkImage
              src="/uploads/1759704073075-pink_swing.png"
              fallbackSrc="/images/hero.svg"
              alt="Deluxe faux fur swing styled with blush textiles"
              className="h-full w-full object-cover"
            />
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[11px] font-semibold text-primary-800 shadow-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-accent-500"></span>Luxe Textile Capsule
            </div>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 text-[11px] font-semibold text-primary-800 shadow-sm">
              Concierge install ready • Hand-trimmed faux fur
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function SolutionsSection() {
  return (
    <Section className="bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl font-bold text-primary-900">Bespoke Solutions for Every Play Space</h2>
          <p className="mt-3 max-w-2xl text-neutral-600 md:mx-auto">
            Whether you host guests nightly or crave a private retreat, we engineer the right suspension rig, textiles, and aftercare plan.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {solutionCards.map((card) => (
            <div key={card.heading} className="card overflow-hidden p-0">
              <AfterDarkImage
                src={card.image}
                fallbackSrc="/images/hero.svg"
                alt={card.heading}
                className="h-48 w-full object-cover"
              />
              <div className="space-y-4 p-6">
                <h3 className="font-display text-2xl font-semibold text-primary-800">{card.heading}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{card.description}</p>
                <Link href={card.link} className="inline-flex items-center gap-2 text-accent-700 font-semibold hover:text-accent-900">
                  Explore packages
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ConciergeCTA() {
  return (
    <Section>
      <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-primary-700 to-primary-500 px-8 py-12 text-white shadow-md sm:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Ready to Float With Us?</h2>
            <p className="text-sm text-white/80 sm:text-base">Submit your floor plan or mood board and we’ll craft a suspension concept, budget, and install path within 48 hours.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link href="/contact" className="btn-primary bg-white text-primary-700 hover:bg-neutral-100">Start Your Design Call</Link>
            <a href="mailto:concierge@skyfoxswings.com" className="btn-secondary border-white text-white hover:bg-white hover:text-primary-700">Email Concierge</a>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default async function HomePage() {
  const blogPosts = (blogPostsData as BlogPost[]).slice(0, 3);

  return (
    <div className="bg-neutral-50">
      <HeroSection />
      <TrustBadges />
      <SensorySection />
      <FeaturedProduct />
      <SolutionsSection />
      <BlogSection posts={blogPosts} />
      <ConciergeCTA />
    </div>
  );
}
