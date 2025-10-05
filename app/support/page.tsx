import Section from "../../components/Section";
import Link from "next/link";

const supportCategories = [
  {
    title: "Installation & Setup",
    description: "Step-by-step guides for proper harness fitting and system installation",
    icon: "🔧",
    links: [
      { name: "Harness Fitting Guide", href: "/blog/harness-fitting-guide" },
      { name: "Anchor Point Installation", href: "/blog/anchor-point-installation" },
      { name: "System Inspection Checklist", href: "/blog/system-inspection-checklist" },
      { name: "Pre-Use Safety Check", href: "/blog/pre-use-safety-check" }
    ]
  },
  {
    title: "Training Resources",
    description: "Comprehensive training materials for safe equipment use",
    icon: "🎓",
    links: [
      { name: "Safety Training Videos", href: "/blog/safety-training-videos" },
      { name: "Certification Programs", href: "/blog/certification-programs" },
      { name: "Trainer Resources", href: "/blog/trainer-resources" },
      { name: "Safety Protocols", href: "/blog/safety-protocols" }
    ]
  },
  {
    title: "Maintenance & Care",
    description: "Keep your equipment in peak condition with proper maintenance",
    icon: "🛠️",
    links: [
      { name: "Daily Inspection Guide", href: "/blog/daily-inspection-guide" },
      { name: "Cleaning Instructions", href: "/blog/cleaning-instructions" },
      { name: "Storage Guidelines", href: "/blog/storage-guidelines" },
      { name: "Equipment Retirement Criteria", href: "/blog/equipment-retirement-criteria" }
    ]
  },
  {
    title: "Technical Support",
    description: "Get help from our safety experts and technical team",
    icon: "💬",
    links: [
      { name: "Contact Technical Support", href: "/blog/contact-technical-support" },
      { name: "Submit a Service Request", href: "/blog/service-request-process" },
      { name: "Warranty Claims Process", href: "/blog/warranty-claims-process" },
      { name: "Equipment Returns Process", href: "/blog/equipment-returns-process" }
    ]
  }
];

export default function SupportPage() {
  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      {/* Hero Section */}
      <Section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-display text-display-1 font-bold text-primary-600 mb-4">
              Safety Support Center
            </h1>
            <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto">
              Everything you need to safely install, use, and maintain your Skywalker fall protection equipment. 
              Our expert support team is here to help keep your workers safe.
            </p>
          </div>

          {/* Quick Contact */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl text-white p-8 mb-16">
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold mb-4">Need Immediate Help?</h2>
              <p className="text-white/90 mb-6">Our safety experts are standing by to assist you</p>
              
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <a 
                  href="tel:+1-800-SKYWALKER" 
                  className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 inline-flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call 1-800-SKYWALKER
                </a>
                
                <a 
                  href="mailto:support@skywalker.com" 
                  className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 inline-flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Support
                </a>
              </div>
              
              <p className="text-white/70 text-sm mt-4">Available Mon-Fri 7AM-6PM EST • Emergency support 24/7</p>
            </div>
          </div>

          {/* Support Categories */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {supportCategories.map((category, index) => (
              <div key={index} className="card p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-4xl">{category.icon}</div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-primary-600 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-neutral-600">{category.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {category.links.map((link, linkIndex) => (
                    <Link 
                      key={linkIndex}
                      href={link.href}
                      className="flex items-center justify-between p-3 bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors group"
                    >
                      <span className="text-neutral-700 group-hover:text-primary-600">{link.name}</span>
                      <svg className="w-4 h-4 text-neutral-400 group-hover:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Procedures */}
          <div className="bg-danger-50 border border-danger-200 rounded-3xl p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-danger-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              
              <h2 className="font-display text-2xl font-bold text-danger-800 mb-4">
                Emergency Procedures
              </h2>
              
              <div className="max-w-3xl mx-auto text-danger-700">
                <p className="mb-6">
                  In case of equipment failure or accident, follow these emergency procedures immediately:
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div>
                    <h3 className="font-bold text-danger-800 mb-2">1. Call Emergency Services</h3>
                    <p className="text-sm">Dial 911 immediately for medical emergency or rescue operations</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-danger-800 mb-2">2. Secure the Area</h3>
                    <p className="text-sm">Prevent additional injuries by controlling access to the incident area</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-danger-800 mb-2">3. Report to Skywalker</h3>
                    <p className="text-sm">Contact our emergency line at <strong>1-800-SKYWALKER</strong> for technical support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}