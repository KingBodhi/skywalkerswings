import Section from "../../components/Section";
import Link from "next/link";

const standards = [
  {
    title: "ANSI Z359.1-2016",
    description: "American National Standard for Fall Protection and Fall Restraint Equipment",
    details: "Our harnesses meet and exceed all ANSI Z359.1-2016 requirements for body belts, body harnesses, and positioning devices.",
    certification: "Third-party tested and certified",
    icon: "🇺🇸"
  },
  {
    title: "OSHA 1926/1910",
    description: "Occupational Safety and Health Administration Construction & General Industry Standards",
    details: "Full compliance with OSHA fall protection requirements for construction and general industry applications.",
    certification: "OSHA compliant",
    icon: "⚖️"
  },
  {
    title: "CE Marking",
    description: "European Conformity marking for PPE Category III",
    details: "CE certified for use in European Union under PPE Regulation (EU) 2016/425.",
    certification: "Notified body certified",
    icon: "🇪🇺"
  },
  {
    title: "CSA Z259",
    description: "Canadian Standards Association Fall Protection Equipment",
    details: "Meets CSA Z259 requirements for fall arrest, work positioning, and rope access systems.",
    certification: "CSA certified",
    icon: "🇨🇦"
  }
];

export default function CompliancePage() {
  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      {/* Hero Section */}
      <Section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-display text-display-1 font-bold text-primary-600 mb-4">
              Safety Standards & Certifications
            </h1>
            <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto">
              SkyFox hardware is weight-tested, redundantly engineered, and audited against global suspension standards so every guest and play partner can relax into the moment.
            </p>
          </div>

          {/* Standards Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {standards.map((standard, index) => (
              <div key={index} className="card p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{standard.icon}</div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-primary-600 mb-2">
                      {standard.title}
                    </h3>
                    <div className="inline-flex items-center bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {standard.certification}
                    </div>
                  </div>
                </div>
                
                <p className="text-neutral-600 mb-3 font-medium">{standard.description}</p>
                <p className="text-sm text-neutral-600">{standard.details}</p>
              </div>
            ))}
          </div>

          {/* Testing & Certification */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl text-white p-12 mb-16">
            <div className="text-center">
              <h2 className="font-display text-h1 font-bold mb-4">
                Third-Party Testing & Certification
              </h2>
              <p className="text-body-lg text-white/90 max-w-3xl mx-auto mb-8">
                All SkyFox harnesses undergo rigorous third-party testing at accredited facilities 
                to ensure they meet or exceed safety standards.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔬</span>
                  </div>
                  <h3 className="font-bold mb-2">Laboratory Testing</h3>
                  <p className="text-sm text-white/80">Independent lab verification of all safety claims</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h3 className="font-bold mb-2">Documentation</h3>
                  <p className="text-sm text-white/80">Complete certification paperwork included</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <h3 className="font-bold mb-2">Ongoing Compliance</h3>
                  <p className="text-sm text-white/80">Regular recertification and quality audits</p>
                </div>
              </div>
            </div>
          </div>

          {/* Downloads Section */}
          <div className="text-center">
            <h2 className="font-display text-h1 font-bold text-primary-600 mb-8">
              Certification Downloads
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {standards.map((standard, index) => (
                <Link 
                  key={index}
                  href={`/downloads/cert-${standard.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`}
                  className="card p-6 hover:shadow-medium transition-all duration-300 group"
                >
                  <div className="text-3xl mb-3">{standard.icon}</div>
                  <h3 className="font-bold text-primary-600 mb-2 group-hover:text-accent-500 transition-colors">
                    {standard.title}
                  </h3>
                  <div className="text-sm text-neutral-600 mb-3">Certificate</div>
                  <div className="flex items-center text-accent-500 text-sm font-semibold">
                    Download PDF
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
