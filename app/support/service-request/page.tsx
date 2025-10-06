import Section from "../../../components/Section";
import Link from "next/link";

export default function ServiceRequestPage() {
  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      <Section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <nav className="text-sm text-neutral-600 mb-6">
              <Link href="/support" className="hover:text-primary-600">Support</Link>
              <span className="mx-2">→</span>
              <span>Service Request</span>
            </nav>
            
            <h1 className="font-display text-5xl font-bold text-primary-600 mb-6">
              Submit a Service Request
            </h1>
            <p className="text-xl text-neutral-700 leading-relaxed">
              Get troubleshooting, repairs, or concierge help from the SkyFox rigging collective.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-accent-50 border border-accent-200 rounded-2xl p-8">
              <h2 className="font-display text-2xl font-bold text-accent-800 mb-4">Service Portal Coming Soon</h2>
              <p className="text-accent-700 mb-6">
                We’re crafting a luxe service portal that will include:
              </p>
              <ul className="space-y-2 text-accent-700">
                <li>• Online service request forms</li>
                <li>• Equipment serial number tracking</li>
                <li>• Repair status updates</li>
                <li>• Technical support chat</li>
                <li>• Warranty claim processing</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="font-display text-xl font-bold text-primary-600 mb-4">Phone Support</h3>
                <a href="tel:+1800759369" className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
                  <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-primary-600">1-800-SKYFOX</div>
                    <div className="text-sm text-neutral-600">Sun–Thu 10a–10p ET • After-hours pager 24/7</div>
                  </div>
                </a>
              </div>

              <div className="card p-6">
                <h3 className="font-display text-xl font-bold text-primary-600 mb-4">Email Support</h3>
                <a href="mailto:support@skyfoxswings.com" className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
                  <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-primary-600">support@skyfoxswings.com</div>
                    <div className="text-sm text-neutral-600">Same-day concierge response</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
