import Section from "../../components/Section";
import Link from "next/link";

export default function LicensingPage() {
  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      <Section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <span className="text-lg">🦊</span>
              Experience Licensing
            </div>
            <h1 className="font-display text-5xl font-bold text-primary-600 mb-4">
              SkyFox Experience Licensing
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              License the SkyFox suspension architecture to bring concierge-grade swings, textiles, and rituals to your brand, venue, or retail line.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div className="space-y-8">
              <div className="card p-8">
                <h2 className="font-display text-2xl font-bold text-primary-600 mb-6">Licensing Opportunities</h2>
                <div className="space-y-4 text-neutral-700">
                  <p>
                    We collaborate with hospitality groups, boutique retailers, luxury designers, and creators who want SkyFox-grade suspension in their spaces and product lines.
                  </p>
                  <p>
                    Licensing partners receive our rigging blueprints, textile palettes, and concierge playbooks so guests experience body-safe, cinematic suspension every time.
                  </p>
                </div>
              </div>

              <div className="card p-8">
                <h3 className="font-display text-xl font-bold text-primary-600 mb-4">What's Included</h3>
                <div className="space-y-3">
                  {[
                    'Rigging and structural blueprints tailored to your venue',
                    'Concierge training for in-house teams and installers',
                    'Textile and scent capsule library with sourcing partners',
                    'Operations and aftercare protocols for multi-guest use',
                    'Co-branded marketing assets and launch playbooks'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-neutral-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="card p-8">
                <h3 className="font-display text-xl font-bold text-primary-600 mb-4">Where SkyFox Thrives</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl">
                    <div className="text-2xl">🏨</div>
                    <div>
                      <div className="font-semibold text-primary-600">Hospitality & Resorts</div>
                      <div className="text-sm text-neutral-600">Upgrade suites, lounges, and speakeasies with indulgent suspension rooms.</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl">
                    <div className="text-2xl">🎥</div>
                    <div>
                      <div className="font-semibold text-primary-600">Creators & Studios</div>
                      <div className="text-sm text-neutral-600">Content houses and production teams needing camera-ready suspension rigs.</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl">
                    <div className="text-2xl">🧗</div>
                    <div>
                      <div className="font-semibold text-primary-600">Retail & Boutique Brands</div>
                      <div className="text-sm text-neutral-600">Launch SkyFox-approved swing collections with full-service aftercare support.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-8">
                <h3 className="font-display text-xl font-bold text-primary-600 mb-4">Get Started</h3>
                <p className="text-neutral-700 mb-6">
                  Ready to weave SkyFox suspension into your next concept? Share your project scope and launch timeline and our licensing team will curate the perfect package.
                </p>
                <Link 
                  href="/contact"
                  className="w-full bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                  Start Licensing Discussion
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl text-white p-12 text-center">
            <h2 className="font-display text-2xl font-bold mb-4">
              Elevate Your Guests' Suspension Experience
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join resorts, designers, and creators who trust SkyFox to deliver body-safe, unforgettable play.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/contact"
                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                Request Licensing Info
              </Link>
              
              <a 
                href="tel:+1800759369"
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200"
              >
                Call 1-800-SKYFOX
              </a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
