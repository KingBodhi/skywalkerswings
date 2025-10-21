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
  status?: string;
};

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

const featuredProduct = {
  title: 'Purple Crush Swing',
  handle: 'purple-crush-swing',
  summary:
    'Our signature faux fur swing with luxe padding, contoured support, and reinforced rigging certified for studio-grade play.',
  bullets: [
    'Loaded with hardware: carabiners, swivel, daisy strap, and storage bag',
    'Six-point body support keeps every angle plush and secure',
    'Handcrafted textiles in our Brooklyn sensory lab',
  ],
  startingPrice: '$895',
  image: {
    src: '/uploads/purple-crush-1.png',
    alt: 'Purple Crush Swing with faux fur cushioning',
  },
};

function SensorySection() {
  return (
    <Section className="bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
        </div>
      </div>
    </Section>
  );
}

function BlogSection({ posts }: { posts: BlogPost[] }) {
  const latestPosts = posts
    .filter((post) => post.status !== 'INACTIVE')
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt || 0).getTime();
      const dateB = new Date(b.publishedAt || 0).getTime();
      return dateB - dateA;
    })
    .slice(0, 3);

  if (latestPosts.length === 0) {
    return null;
  }

  return (
    <Section className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center space-y-3">
          <h2 className="font-display text-4xl font-bold text-primary-900">Sensual Suspension Journal</h2>
          <p className="mx-auto max-w-2xl text-neutral-600">Expert tips, styling notes, and care rituals from our team.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {latestPosts.map((post) => (
            <article key={post.id} className="flex h-full flex-col overflow-hidden rounded-3xl bg-neutral-50 border border-neutral-200 shadow-sm text-center">
              <AfterDarkImage
                src={post.featuredImage || '/images/skyfox-placeholder.png'}
                fallbackSrc="/images/hero.svg"
                alt={post.title}
                className="w-full aspect-video object-cover"
              />
              <div className="flex flex-1 flex-col items-center gap-4 px-6 py-6">
                <h3 className="font-display text-xl text-primary-900">{post.title}</h3>
                {post.excerpt && (
                  <p className="text-sm text-neutral-600 leading-relaxed text-center">{post.excerpt}</p>
                )}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-accent-700 font-semibold hover:text-accent-900"
                >
                  Read more
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-primary-200 px-6 py-3 text-sm font-semibold text-primary-700 hover:bg-primary-50"
          >
            Open the journal
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
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
          <p className="text-sm text.white/85 sm:text-base lg:text-lg">
            A SkyFox Swing transforms any room into a suspended sanctuary, fusing bespoke materials with certified hardware for nights that never touch the floor.
          </p>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-start">
            <Link href="/shop" className="btn-primary">Shop Suspension Swings</Link>
            <Link
              href="/contact"
              className="btn-secondary bg-white text-primary-700 border-transparent shadow-sm hover:bg-accent-50 hover:text-primary-900"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="relative w-full max-w-xl lg:flex-1">
          <div className="absolute -top-8 -left-6 hidden h-32 w-32 rounded-full bg-accent-400/30 blur-3xl lg:block" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-primary-800/40 shadow-lg backdrop-blur.sm aspect-square max-h-[520px] w-full lg:max-h-[600px]">
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

function FeaturedProduct() {
  const { image, title, summary, bullets, startingPrice, handle } = featuredProduct;

  return (
    <Section className="bg-white">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-neutral-200 bg.white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="order-1 lg:order-2 relative min-h-[300px] overflow-hidden bg-neutral-100">
            <AfterDarkImage src={image.src} fallbackSrc="/images/hero.svg" alt={image.alt} className="h-full w-full object-cover" />
          </div>
          <div className="order-2 flex flex-col justify-center space-y-5 px-8 py-12 sm:px-12 lg:order-1 lg:px-14">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-100 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-700">Featured Product</span>
            <div className="space-y-3">
              <h2 className="font-display text-[2.1rem] font-bold text-primary-900 sm:text-4xl">{title}</h2>
              <p className="text-base text-neutral-600 sm:text-lg">{summary}</p>
              <ul className="space-y-2 text-sm text-neutral-600">
                {bullets.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-primary-300" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <Link href={`/product/${handle}`} className="btn-primary">View Product Details</Link>
              <span className="text-sm font-semibold text-primary-700">From {startingPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function SolutionsSection() {
  const products = [
    {
      title: 'Doorway Swing Bundle',
      description: 'Everything you need to transform a doorway into a safe suspension point with protective rigging and plush padding.',
      href: '/collection/doorway',
      image: '/uploads/doorway-swing-1.png',
    },
    {
      title: 'Freestanding Frames',
      description: 'Engineered for rental suites and studios—powder-coated frames rated for 700 lb with quick breakdown.',
      href: '/collection/support-stands',
      image: '/uploads/frame-collection.png',
    },
    {
      title: 'Textile Refresh Kits',
      description: 'Swap fabrics for seasonal aesthetics or refresh after heavy play with our curated textile packs.',
      href: '/collection/accessories',
      image: '/uploads/textile-refresh.png',
    },
  ];

  return (
    <Section className="bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl font-bold text-primary-900">Deluxe Faux Fur Swings</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <div key={product.title} className="card overflow-hidden p-0">
              <AfterDarkImage src={product.image} fallbackSrc="/images/hero.svg" alt={product.title} className="h-72 w-full object.cover" />
              <div className="space-y-4 p-6">
                <h3 className="font-display text-2xl font-semibold text-primary-800">{product.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{product.description}</p>
                <Link
                  href={product.href}
                  className="inline-flex items-center gap-2 text-accent-700 font-semibold hover:text-accent-900"
                >
                  View details
                  <svg className="h-4 w-4" fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
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

function ContactCTA() {
  return (
    <Section className='bg-neutral-50'>
      <div className='mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-primary-700 to-primary-500 px-8 py-12 text-white shadow-md sm:px-12'>
        <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
          <div className='space-y-3'>
            <h2 className='font-display text-2xl font-bold sm:text-3xl'>Ready to Elevate Your Space?</h2>
            <p className='text-sm text-white/80 sm:text-base'>Have questions about installation, materials, or custom orders? Our team is here to help you find the perfect suspension solution.</p>
          </div>
          <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
            <Link href='/contact' className='btn-primary'>Get in Touch</Link>
            <a
              href='mailto:support@skyfoxswings.com'
              className='inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 transition-colors duration-200 hover:bg-neutral-100'
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default async function HomePage() {
  const blogPosts = blogPostsData as BlogPost[];

  return (
    <div className='bg-white'>
      <HeroSection />
      <TrustBadges />
      <SensorySection />
      <FeaturedProduct />
      <SolutionsSection />
      <BlogSection posts={blogPosts} />
      <ContactCTA />
    </div>
  );
}
