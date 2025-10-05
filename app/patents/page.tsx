import Section from "../../components/Section";
import Link from "next/link";

export default function PatentsPage() {
  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      <Section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <span className="text-lg">⚖️</span>
              Intellectual Property
            </div>
            <h1 className="font-display text-5xl font-bold text-primary-600 mb-4">
              Patent Portfolio
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our innovative kinetic fall-arrest technology is protected by comprehensive patent filings covering design and utility applications.
            </p>
          </div>

          <div className="space-y-8">
            <div className="card p-8">
              <h2 className="font-display text-2xl font-bold text-primary-600 mb-6">Patent Protection</h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-display text-lg font-bold text-primary-600 mb-3">Design Patents</h3>
                    <p className="text-neutral-700 mb-4">
                      Protect the unique visual and functional aspects of our kinetic harness geometry and 
                      innovative safety features that distinguish our products in the marketplace.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-display text-lg font-bold text-primary-600 mb-3">Utility Patents</h3>
                    <p className="text-neutral-700 mb-4">
                      Cover the functional mechanisms and engineering principles behind our 
                      kinetic fall-arrest systems and suspension trauma prevention technology.
                    </p>
                  </div>
                </div>

                <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-primary-800 mb-2">Patent Status</h3>
                      <p className="text-primary-700">
                        Our core kinetic geometry and specific harness implementations are protected by 
                        pending design and utility filings. For detailed claims information and current 
                        status, approved licensees receive comprehensive document access.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <h2 className="font-display text-2xl font-bold text-primary-600 mb-6">Technology Overview</h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-neutral-50 rounded-xl">
                    <div className="text-3xl mb-3">🔬</div>
                    <h3 className="font-semibold text-primary-600 mb-2">Kinetic Geometry</h3>
                    <p className="text-sm text-neutral-600">Revolutionary force distribution principles</p>
                  </div>
                  
                  <div className="text-center p-6 bg-neutral-50 rounded-xl">
                    <div className="text-3xl mb-3">🩺</div>
                    <h3 className="font-semibold text-primary-600 mb-2">Trauma Prevention</h3>
                    <p className="text-sm text-neutral-600">Suspension trauma mitigation technology</p>
                  </div>
                  
                  <div className="text-center p-6 bg-neutral-50 rounded-xl">
                    <div className="text-3xl mb-3">🛡️</div>
                    <h3 className="font-semibold text-primary-600 mb-2">Safety Integration</h3>
                    <p className="text-sm text-neutral-600">ANSI-compliant safety enhancements</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <h2 className="font-display text-2xl font-bold text-primary-600 mb-6">Licensing Inquiries</h2>
              <p className="text-neutral-700 mb-6">
                Interested in licensing our technology? Contact our intellectual property team 
                to discuss opportunities and access requirements.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact"
                  className="flex-1 bg-accent-500 hover:bg-accent-600 text-white px-6 py-4 rounded-xl font-bold text-center transition-all duration-200 hover:shadow-lg"
                >
                  Contact Licensing Team
                </Link>
                
                <Link 
                  href="/distributors"
                  className="flex-1 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-6 py-4 rounded-xl font-bold text-center transition-all duration-200"
                >
                  Partnership Opportunities
                </Link>
              </div>
            </div>

            {/* Legal Notice */}
            <div className="text-center text-sm text-neutral-600">
              <p>
                All product names and marks are the property of their respective owners. 
                © 2024 Skywalker Unlimited. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
