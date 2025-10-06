import Section from "../../components/Section";
import Link from "next/link";

const supportCategories = [
  {
    title: "Rigging & Suspension",
    description: "Hardware checklists, anchor maps, and pre-scene rituals so your swing floats with zero guesswork.",
    icon: "🔧",
    links: [
      { name: "Rigging Rituals Playbook", href: "/blog/rigging-rituals-skyfox" },
      { name: "Ceiling vs. Stand Installs", href: "/blog/skyfox-mount-comparison" },
      { name: "Doorframe Safeguards", href: "/blog/doorway-suspension-safety" },
      { name: "Pre-Scene Checklist", href: "/blog/pre-scene-suspension-check" }
    ]
  },
  {
    title: "Scene Styling & Flow",
    description: "Lighting, music, and choreography cues to choreograph a five-star SkyFox suite from warm-up to afterglow.",
    icon: "🎓",
    links: [
      { name: "Suite Styling Starter", href: "/blog/scene-styling-skyfox-suite" },
      { name: "Playlist & Lighting Pairings", href: "/blog/skyfox-playlist-lighting" },
      { name: "Position Flow Guide", href: "/blog/suspension-flow-guide" },
      { name: "Consent & Safe Words", href: "/blog/consent-scripts-skyfox" }
    ]
  },
  {
    title: "Care & Aftercare",
    description: "Cleaning blends, textile care, and partner aftercare to keep every swing plush and ready for the next scene.",
    icon: "🛠️",
    links: [
      { name: "Afterglow Care Ritual", href: "/blog/afterglow-care-skyfox" },
      { name: "Textile Laundry Guide", href: "/blog/skyfox-textile-care" },
      { name: "Hardware Polishing 101", href: "/blog/hardware-polish-guide" },
      { name: "Retire & Refresh", href: "/blog/when-to-retire-swing-gear" }
    ]
  },
  {
    title: "Concierge & Troubleshooting",
    description: "Direct lines, emergency scripts, and DIY fixes from the SkyFox concierge bench.",
    icon: "💬",
    links: [
      { name: "Concierge SOS Toolkit", href: "/blog/concierge-sos-skyfox" },
      { name: "Service Request Roadmap", href: "/blog/service-request-roadmap" },
      { name: "Warranty Magic 101", href: "/blog/warranty-magic-skyfox" },
      { name: "Returns & Refresh", href: "/blog/returns-refresh-skyfox" }
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
              SkyFox Support Lounge
            </h1>
            <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto">
              Everything you need to install, play, and unwind with SkyFox Swings. Our concierge riggers and aftercare stylists keep your suites silky-smooth, safe, and ready for whatever fantasy you’re scripting next.
            </p>
          </div>

          {/* Quick Contact */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl text-white p-8 mb-16">
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold mb-4">Need Immediate Help?</h2>
              <p className="text-white/90 mb-6">SkyFox concierge keeps the line open for rigging SOS moments, late-night textile questions, and VIP suite resets.</p>
              
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <a 
                  href="tel:+1800759369" 
                  className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 inline-flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call 1-800-SKYFOX
                </a>
                
                <a 
                  href="mailto:support@skyfoxswings.com" 
                  className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 inline-flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Support
                </a>
              </div>
              
              <p className="text-white/70 text-sm mt-4">Concierge Sun–Thu 10a–10p ET • After-hours emergency rigging line 24/7</p>
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
                  If a partner feels unsafe, dizzy, or hardware fails mid-scene, follow these steps immediately:
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div>
                    <h3 className="font-bold text-danger-800 mb-2">1. Call Emergency Services</h3>
                    <p className="text-sm">Dial 911 for any medical distress, loss of consciousness, or entrapment that requires professional rescue.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-danger-800 mb-2">2. Release & Support</h3>
                    <p className="text-sm">Lower the participant slowly, stabilize their breathing, and remove tension from straps or cuffs.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-danger-800 mb-2">3. Call SkyFox Concierge</h3>
                    <p className="text-sm">Once everyone is safe, contact our emergency line at <strong>1-800-SKYFOX</strong> for rigging diagnostics and next steps.</p>
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
