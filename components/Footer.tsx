import Link from "next/link";

const footerLinks = {
  products: [
    { name: 'Suspension Swings', href: '/shop' },
    { name: 'Doorway Bundles', href: '/collection/doorway' },
    { name: 'Freestanding Frames', href: '/collection/support-stands' },
    { name: 'Accessories', href: '/collection/accessories' },
  ],
  company: [
    { name: 'Our Story', href: '/about' },
    { name: 'Pleasure Pledge', href: '/support/warranty' },
    { name: 'Concierge Services', href: '/contact' },
    { name: 'Careers', href: '/careers' },
  ],
  support: [
    { name: 'Installation Guides', href: '/support' },
    { name: 'Cleaning & Care', href: '/support/cleaning' },
    { name: 'Compliance & Safety', href: '/compliance' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Age & Consent', href: '/licensing' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="font-display text-2xl font-bold mb-4">
              SKYFOX <span className="text-white/70">SWINGS</span>
            </div>
            <p className="text-white/80 mb-6 max-w-md leading-relaxed">
              SkyFox Swings crafts indulgent suspension experiences with plush textiles, weight-tested hardware, and concierge installation. Discreet packaging, white-glove guidance, and inclusive sizing come standard for every body we serve.
            </p>

            <div className="space-y-3 text-white/90">
              <a href="tel:+1833759369" className="flex items-center gap-3 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <div className="font-semibold">1-833-SKYFOX</div>
                  <div className="text-xs text-white/70">Concierge daily 10a–10p ET</div>
                </div>
              </a>

              <a href="mailto:concierge@skyfoxswings.com" className="flex items-center gap-3 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                concierge@skyfoxswings.com
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20 text-white/80 text-sm flex flex-wrap gap-4">
              <span>Weight tested to 600 lb</span>
              <span>Discreet packaging & billing</span>
              <span>Body-safe, washable textiles</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Collections</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/80 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/80 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/80 hover:text-white transition-colors text-sm">
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
            {footerLinks.legal.map((link) => (
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
