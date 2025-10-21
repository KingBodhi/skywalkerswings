import Link from "next/link";

import { cache } from 'react';
import { prisma } from '@/lib/prisma';

const companyLinks = [
  { name: 'Our Story', href: '/about' },
  { name: 'Pleasure Pledge', href: '/support/warranty' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Careers', href: '/careers' },
];

const communityLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/skyfoxswings' },
  { name: 'Facebook', href: 'https://www.facebook.com/skyfoxswings' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Age & Consent', href: '/licensing' },
];

const getCollections = cache(async () => {
  return prisma.collection.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { title: 'asc' },
    select: { id: true, title: true, handle: true },
    take: 8,
  });
});

export default async function Footer() {
  const collections = await getCollections();

  return (
    <footer className="bg-primary-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="font-display text-2xl font-bold mb-4">
              SKYFOX <span className="text-white/70">SWINGS</span>
            </div>
            <p className="text-white/80 mb-6 max-w-md leading-relaxed">
              SkyFox Swings crafts indulgent suspension experiences with plush textiles, weight-tested hardware, and expert guidance. Discreet packaging, comprehensive support, and inclusive sizing come standard for every body we serve.
            </p>

            <div className="space-y-3 text-white/90">
              {/* Phone support temporarily disabled while the voice agent is offline. */}
              <a href="mailto:support@skyfoxswings.com" className="flex items-center gap-3 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@skyfoxswings.com
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20 text-white/80 text-sm flex flex-wrap gap-4">
              <span>Weight tested to 600 lb</span>
              <span>Discreet packaging & billing</span>
              <span>Body-safe, washable textiles</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/80 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Collections</h3>
            <ul className="space-y-2">
              {collections.length > 0 ? (
                collections.map((collection) => (
                  <li key={collection.id}>
                    <Link
                      href={`/collection/${collection.handle}`}
                      className="text-white/80 hover:text-white transition-colors text-sm"
                    >
                      {collection.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-white/60 text-sm">Collections coming soon.</li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Community</h3>
            <ul className="space-y-2">
              {communityLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener' : undefined}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-white/70">© 2025 SkyFox Swings. Adults 18+ only.</div>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
