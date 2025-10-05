import Section from "../../components/Section";
import Link from "next/link";

const openPositions: any[] = []; // Will be populated via admin panel

const benefits = [
  {
    title: "Comprehensive Health Coverage",
    description: "Full medical, dental, and vision insurance for you and your family",
    icon: "🏥"
  },
  {
    title: "Flexible Work Arrangements",
    description: "Remote work options and flexible scheduling to support work-life balance",
    icon: "🏠"
  },
  {
    title: "Professional Development",
    description: "Ongoing training, certifications, and conference attendance opportunities",
    icon: "📚"
  },
  {
    title: "Competitive Compensation",
    description: "Market-leading salaries with performance bonuses and equity participation",
    icon: "💰"
  },
  {
    title: "Retirement Planning",
    description: "401(k) with company matching and financial planning resources",
    icon: "🏦"
  },
  {
    title: "Innovation Time",
    description: "20% time for personal projects and safety innovation initiatives",
    icon: "💡"
  }
];

export default function CareersPage() {
  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      {/* Hero Section */}
      <Section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <span className="text-lg">💼</span>
              Join Our Mission
            </div>
            <h1 className="font-display text-display-1 font-bold text-primary-600 mb-4">
              Careers at Skywalker
            </h1>
            <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto">
              Help us revolutionize workplace safety and prevent fall-related injuries. 
              Join a team that's making a real difference in worker protection worldwide.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-primary-600 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                At Skywalker, we're not just building safety equipment—we're pioneering technology 
                that saves lives. Our kinetic fall-arrest systems represent a breakthrough in 
                worker protection, and we need passionate people to help us scale this impact.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-700">Direct impact on worker safety</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-700">Cutting-edge technology development</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-700">Collaborative, mission-driven culture</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="/images/team-hero.svg" 
                  alt="Skywalker team working on safety innovations" 
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-h1 font-bold text-primary-600 mb-4">
              Why Work With Us
            </h2>
            <p className="text-body-lg text-neutral-600">
              We believe in taking care of our team so they can take care of our mission
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="font-display font-bold text-primary-600 mb-2">{benefit.title}</h3>
                <p className="text-sm text-neutral-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Open Positions */}
      <Section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-h1 font-bold text-primary-600 mb-4">
              Open Positions
            </h2>
            <p className="text-body-lg text-neutral-600">
              Join our growing team and help shape the future of workplace safety
            </p>
          </div>

          {openPositions.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">💼</div>
              <h3 className="font-display text-2xl font-bold text-primary-600 mb-4">No Open Positions</h3>
              <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
                We don't have any job opportunities at this time, but we're always growing! 
                Check back regularly or reach out to discuss future openings.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/contact"
                  className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 hover:shadow-lg hover:scale-105"
                >
                  Contact Us About Future Roles
                </Link>
                <a 
                  href="mailto:careers@skywalker.com"
                  className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 rounded-xl font-bold transition-all duration-200"
                >
                  Send Your Resume
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {openPositions.map((position: any, index: number) => (
                <div key={index} className="card p-8">
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h3 className="font-display text-xl font-bold text-primary-600">{position.title}</h3>
                        <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {position.department}
                        </span>
                        <span className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {position.type}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm text-neutral-600">{position.location}</span>
                        <span className="text-neutral-400">•</span>
                        <span className="text-sm text-neutral-600">Posted {position.posted}</span>
                      </div>
                      
                      <p className="text-neutral-700 mb-4">{position.description}</p>
                      
                      <div>
                        <h4 className="font-semibold text-neutral-900 mb-2">Requirements:</h4>
                        <ul className="space-y-1">
                          {position.requirements.map((req: string, reqIndex: number) => (
                            <li key={reqIndex} className="flex items-start gap-2">
                              <svg className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-sm text-neutral-700">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <Link 
                        href={`/careers/apply/${position.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="w-full bg-accent-500 hover:bg-accent-600 text-white text-center px-6 py-4 rounded-xl font-bold transition-all duration-200 hover:shadow-lg mb-3"
                      >
                        Apply Now
                      </Link>
                      <Link 
                        href={`/careers/details/${position.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="w-full border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white text-center px-6 py-4 rounded-xl font-bold transition-all duration-200"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Even if you don't see the perfect role, we're always interested in 
            talking to passionate safety professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="mailto:careers@skywalker.com"
              className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              Send Us Your Resume
            </a>
            
            <Link 
              href="/contact"
              className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200"
            >
              General Inquiries
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
