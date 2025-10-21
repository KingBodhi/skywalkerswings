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
        topic: formData.get('topic'),
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
              <span>💌</span> Get In Touch
            </span>
            <h1 className='mt-4 font-display text-3xl font-bold text-primary-800 sm:text-4xl'>Contact Our Team</h1>
            <p className='mt-3 text-base text-neutral-600 sm:text-lg'>Have questions about our swings, installation, or custom orders? We respond within one business day with expert guidance.</p>
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
                    <input className='input-field w-full' name='email' placeholder='you@skyfoxswings.com' required type='email' />
                  </div>
                </div>

                <div className='grid gap-6 md:grid-cols-2'>
                  <div>
                    <label className='mb-2 block text-sm font-semibold text-primary-700'>Phone</label>
                    <input className='input-field w-full' name='phone' placeholder='Optional' />
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-semibold text-primary-700'>Topic *</label>
                    <select className='input-field w-full' defaultValue='' name='topic' required>
                      <option value='' disabled>Select a topic</option>
                      <option value='support'>Support</option>
                      <option value='sales'>Sales</option>
                      <option value='warranty'>Warranty</option>
                      <option value='partnerships'>Partnerships</option>
                      <option value='other'>Other</option>
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
                  {loading ? 'Sending...' : 'Send Message'}
                </button>

                {sent && (
                  <div className='rounded-xl border border-success-200 bg-success-50 p-4 text-success-700'>
                    Message received! Our team will respond to you shortly.
                  </div>
                )}

                {error && (
                  <div className='rounded-xl border border-danger-200 bg-danger-50 p-4 text-danger-600'>{error}</div>
                )}
              </form>
            </div>

            <aside className='space-y-6'>
              <div className='card border border-neutral-200 bg-white p-6'>
                <h2 className='font-display text-xl font-semibold text-primary-800'>Talk to Our Team</h2>
                <p className='mt-3 text-sm text-neutral-600'>Our support team is available daily to help with installation, materials, orders, and custom builds.</p>
                <div className='mt-6 space-y-4 text-sm text-neutral-700'>
                  <a className='flex items-center gap-3 rounded-xl bg-neutral-100 px-4 py-3 transition-colors hover:bg-neutral-200' href='mailto:support@skyfoxswings.com'>
                    <span className='inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500 text-neutral-900'>✉️</span>
                    <span>support@skyfoxswings.com</span>
                  </a>
                  <div className='rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3'>
                    <div className='font-semibold text-neutral-800'>Concierge Response</div>
                    <div className='text-xs text-neutral-600'>Email responses Sun–Thu 10a–10p ET with limited after-hours monitoring for urgent rigging questions.</div>
                  </div>
                </div>
              </div>

              <div className='card border border-neutral-200 bg-white p-6'>
                <h2 className='font-display text-xl font-semibold text-primary-800'>What Happens Next</h2>
                <ul className='mt-4 space-y-3 text-sm text-neutral-600'>
                  <li>✓ Team review within one business day</li>
                  <li>✓ Expert swing and accessory recommendations</li>
                  <li>✓ Installation guidance and support resources</li>
                  <li>✓ Optional fabric swatch samples</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </Section>
    </div>
  );
}
