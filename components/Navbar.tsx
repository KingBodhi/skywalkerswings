"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

const NAV_LINKS = [
  { label: "Swings", href: "/shop" },
  { label: "Journal", href: "/blog" },
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

function SupportContact() {
  // Phone support temporarily disabled while the voice agent is offline.
  return null;
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
              SKYFOX <span className="text-white/70">SWINGS</span>
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
            <Link
              href="/shop"
              className="btn-primary"
            >
              Shop Swings
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
        <div className="fixed inset-0 z-[9999] flex min-h-screen w-screen flex-col bg-gradient-to-b from-[#301050] via-[#3f1d6f] to-[#512b8f] text-white md:hidden">
          <header className="relative flex items-center justify-center px-6 pt-12 pb-8">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="text-center"
            >
              <span className="block font-display text-4xl tracking-[0.4em]">SKYFOX</span>
              <span className="block font-display text-sm tracking-[0.58em] text-white/70">SWINGS</span>
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="absolute right-6 top-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white transition-colors hover:bg-white/30"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <nav className="flex flex-col items-center gap-9 text-4xl font-display uppercase tracking-[0.32em] text-white/95">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="transition-transform hover:scale-105"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-14 flex flex-col items-center gap-5 text-xs font-semibold uppercase tracking-[0.32em] text-white/85">
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/15 px-10 py-3 text-xs font-semibold tracking-[0.3em] text-white transition-colors hover:bg-white/25"
              >
                Shop Swings
              </Link>
            </div>
          </main>

          <footer className="pb-12">
            <div className="flex items-center justify-center gap-10 text-sm uppercase tracking-[0.35em] text-white/70">
              <Link href="https://www.facebook.com/skyfoxswings" target="_blank" rel="noopener" className="hover:text-white">
                Facebook
              </Link>
              <Link href="https://www.instagram.com/skyfoxswings" target="_blank" rel="noopener" className="hover:text-white">
                Instagram
              </Link>
            </div>
          </footer>
        </div>
      )}
    </header>
  );
}
