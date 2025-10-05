"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

const NAV_LINKS = [
  { label: "Swings", href: "/shop" },
  { label: "Guides", href: "/blog" },
  { label: "Support", href: "/support" },
] as const;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function CartIcon() {
  const { data } = useSWR('/api/cart', fetcher, { revalidateOnFocus: true });
  const count = (data?.items || []).reduce((sum: number, item: any) => sum + (item.qty || 0), 0);

  return (
    <Link href="/cart" aria-label={`Cart with ${count} items`} className="relative inline-flex items-center group">
      <div className="relative p-2 rounded-lg transition-colors group-hover:bg-white/10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
          <path d="M7 18a2 2 0 1 0 .001 3.999A2 2 0 0 0 7 18zm10 0a2 2 0 1 0 .001 3.999A2 2 0 0 0 17 18zM3 3h2l.4 2H21l-2 9H7l-2-9H3zm15.1 5H6.5l1.2 5h7.9l1.5-5z" />
        </svg>
        {count > 0 && (
          <span className="absolute -right-1 -top-1 min-w-[1.25rem] h-5 rounded-full bg-accent-500 flex items-center justify-center text-[11px] font-bold text-neutral-900 animate-pulse-accent">
            {count}
          </span>
        )}
      </div>
    </Link>
  );
}

function ConciergeContact() {
  return (
    <a
      href="tel:+18337946464"
      className="hidden lg:flex items-center gap-2 text-sm font-medium whitespace-nowrap hover:text-accent-200 transition-colors"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      1-833-SWINGS
      <span className="text-xs text-white/70">Concierge daily 10a–10p ET</span>
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-primary-900/95 backdrop-blur-sm border-b border-white/10 text-white shadow-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="font-display text-lg font-bold tracking-wide transition-colors group-hover:text-accent-200 sm:text-xl">
              SKYWALKER <span className="text-white/70">SWINGS</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium hover:text-accent-200 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <ConciergeContact />
            <Link
              href="/contact"
              className="btn-primary"
            >
              Book Concierge
            </Link>
            <CartIcon />
          </nav>

          <div className="md:hidden flex items-center gap-3">
            <CartIcon />
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className="block w-5 h-0.5 bg-white mb-1"></span>
                <span className="block w-5 h-0.5 bg-white mb-1"></span>
                <span className="block w-5 h-0.5 bg-white"></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            onTouchEnd={() => setOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-neutral-950 text-white shadow-2xl border-l border-neutral-800">
            <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-primary-900">
              <div className="font-display text-lg font-bold">SKYWALKER SWINGS</div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="p-6 space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-lg font-medium rounded-lg transition-all hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-neutral-800 space-y-3">
                <a
                  href="tel:+18337946464"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <div className="font-semibold">1-833-SWINGS</div>
                    <div className="text-sm text-white/70">Concierge daily 10a–10p ET</div>
                  </div>
                </a>

                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  Book Concierge
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
