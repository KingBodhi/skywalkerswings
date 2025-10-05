'use client';

import { useState } from 'react';

import Section from '../../components/Section';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(false);
    setError('');
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        vibe: formData.get('vibe'),
        message: formData.get('message'),
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setSent(true);
      event.currentTarget.reset();
    } catch (err: any) {
      setError(err?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='bg-neutral-50'>
      <Section className='py-16'>
        <div className='mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-14 text-center'>
            <span className='inline-flex items-center gap-2 rounded-full bg-accent-100 px-4 py-2 text-sm font-semibold text-accent-700'>
              <span>💌</span> Concierge Awaits
            </span>
            <h1 className='mt-4 font-display text-3xl font-bold text-primary-800 sm:text-4xl'>Book Your Suspension Consult</h1>
            <p className='mt-3 text-base text-neutral-600 sm:text-lg'>Tell us about your fantasy suite, favorite fabrics, or rigging questions. We respond within one business day with curated recommendations.</p>
          </div>

          <div className='grid gap-8 lg:grid-cols-[1.4fr,1fr]'>
            <div className='card border border-neutral-200 bg-white p-6'>
              <form className='space-y-5' onSubmit={handleSubmit}>
                <div className='grid gap-6 md:grid-cols-2'>
                  <div>
                    <label className='mb-2 block text-sm font-semibold text-primary-700'>Name *</label>
                    <input className='input-field w-full' name='name' placeholder='How should we greet you?' required />
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-semibold text-primary-700'>Email *</label>
                    <input className='input-field w-full' name='email' placeholder='you@skywalkerswing.com' required type='email' />
                  </div>
                </div>

                <div className='grid gap-6 md:grid-cols-2'>
                  <div>
                    <label className='mb-2 block text-sm font-semibold text-primary-700'>Phone</label>
                    <input className='input-field w-full' name='phone' placeholder='Optional' />
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-semibold text-primary-700'>Desired Mood</label>
                    <select className='input-field w-full' defaultValue='' name='vibe'>
                      <option value='' disabled>Pick the vibe</option>
                      <option value='romantic-retreat'>Romantic retreat</option>
                      <option value='kink-suite'>Kink suite</option>
                      <option value='content-studio'>Content studio</option>
                      <option value='hospitality'>Boutique hospitality</option>
                      <option value='other'>Other dream</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className='mb-2 block text-sm font-semibold text-primary-700'>Tell Us Everything *</label>
                  <textarea
                    className='input-field w-full'
                    name='message'
                    placeholder='Room dimensions, mounting preferences, fabric crushes, accessibility notes, guest experience goals...'
                    required
                    rows={6}
                  />
                </div>

                <button
                  className='btn-primary w-full sm:w-auto flex items-center justify-center gap-2'
                  disabled={loading}
                  type='submit'
                >
                  {loading ? 'Sending...' : 'Send to Concierge'}
                </button>

                {sent && (
                  <div className='rounded-xl border border-success-200 bg-success-50 p-4 text-success-700'>
                    We received your note! A concierge stylist will slip into your inbox soon.
                  </div>
                )}

                {error && (
                  <div className='rounded-xl border border-danger-200 bg-danger-50 p-4 text-danger-600'>{error}</div>
                )}
              </form>
            </div>

            <aside className='space-y-6'>
              <div className='card border border-neutral-200 bg-white p-6'>
                <h2 className='font-display text-xl font-semibold text-primary-800'>Talk to a Human</h2>
                <p className='mt-3 text-sm text-neutral-600'>Concierge stylists are available daily to help with mounting, materials, gifting, and custom builds.</p>
                <div className='mt-6 space-y-4 text-sm text-neutral-700'>
                  <a className='flex items-center gap-3 rounded-xl bg-neutral-100 px-4 py-3 transition-colors hover:bg-neutral-200' href='tel:+18337946464'>
                    <span className='inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-700 text-white'>📞</span>
                    <span>1-833-SWINGS (10a–10p ET)</span>
                  </a>
                  <a className='flex items-center gap-3 rounded-xl bg-neutral-100 px-4 py-3 transition-colors hover:bg-neutral-200' href='mailto:concierge@skywalkerswings.com'>
                    <span className='inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500 text-neutral-900'>✉️</span>
                    <span>concierge@skywalkerswings.com</span>
                  </a>
                  <div className='rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3'>
                    <div className='font-semibold text-neutral-800'>Text (Beta)</div>
                    <div className='text-xs text-neutral-600'>Message “FLOAT” to (917) 555-7420 for quick-fit tips and hardware guidance.</div>
                  </div>
                </div>
              </div>

              <div className='card border border-neutral-200 bg-white p-6'>
                <h2 className='font-display text-xl font-semibold text-primary-800'>What Happens Next</h2>
                <ul className='mt-4 space-y-3 text-sm text-neutral-600'>
                  <li>✓ Concierge review within one business day</li>
                  <li>✓ Curated swing + accessory recommendations</li>
                  <li>✓ Mounting checklist and installer referrals</li>
                  <li>✓ Optional fabric swatch mailer</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </Section>
    </div>
  );
}
