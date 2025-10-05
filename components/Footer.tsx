import Link from "next/link";

const footerLinks = {
  products: [
    { name: "Construction Harnesses", href: "/collection/construction" },
    { name: "Military & Tactical", href: "/collection/military" },
    { name: "Recreation & Sports", href: "/collection/recreation" },
    { name: "All Products", href: "/shop" }
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Safety Standards", href: "/compliance" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" }
  ],
  support: [
    { name: "Contact Support", href: "/support" },
    { name: "Training Resources", href: "/support/training" },
    { name: "Warranty", href: "/support/warranty" }
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Licensing", href: "/licensing" },
    { name: "Patents", href: "/patents" }
  ]
};

export default function Footer() {
  return (
    <footer className="bg-primary-600 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="font-display text-2xl font-bold">
                SKYWALKER <span className="text-white/80">UNLIMITED</span>
              </div>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              Patent-pending Kinetic Fall-Arrest Systems that redistribute load, 
              preserve circulation, and extend survivable suspension time.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:+1-800-SKYWALKER" className="flex items-center gap-3 text-white/90 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <div className="font-semibold">1-800-SKYWALKER</div>
                  <div className="text-sm text-white/70">Mon-Fri 7AM-6PM EST</div>
                </div>
              </a>
              
              <a href="mailto:info@skywalker.com" className="flex items-center gap-3 text-white/90 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@skywalker.com</span>
              </a>
            </div>

            {/* Certifications */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="text-sm font-semibold mb-2">Certified & Compliant</div>
              <div className="flex gap-4 text-sm text-white/80">
                <span>ANSI Z359.1</span>
                <span>OSHA 1926/1910</span>
                <span>CE Marked</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-white/80">
              © 2024 Skywalker Unlimited. All rights reserved.
            </div>
            
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}