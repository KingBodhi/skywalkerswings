"use client";
import Section from "../../components/Section";
import Link from "next/link";

const team = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Chief Technology Officer", 
    bio: "25+ years in biomechanical engineering and fall protection systems. PhD from MIT.",
    image: "/images/team/sarah.jpg",
    linkedin: "https://linkedin.com/in/sarah-mitchell"
  },
  {
    name: "Marcus Rodriguez",
    role: "VP Safety Engineering",
    bio: "Former OSHA compliance officer with expertise in workplace safety standards and regulations.", 
    image: "/images/team/marcus.jpg",
    linkedin: "https://linkedin.com/in/marcus-rodriguez"
  },
  {
    name: "Jennifer Kim",
    role: "Director of Product Development",
    bio: "Industrial designer focused on ergonomic safety equipment innovation and user experience.",
    image: "/images/team/jennifer.jpg", 
    linkedin: "https://linkedin.com/in/jennifer-kim"
  }
];

const milestones = [
  { year: "2018", title: "Company Founded", description: "Started with a mission to revolutionize fall protection technology" },
  { year: "2020", title: "Patent Filed", description: "Kinetic Fall-Arrest System patent application submitted to USPTO" },
  { year: "2022", title: "ANSI Certification", description: "First products receive ANSI Z359.1-2016 certification" },
  { year: "2023", title: "5,000+ Sites", description: "Protecting workers across 5,000+ job sites nationwide" },
  { year: "2024", title: "Global Expansion", description: "International certifications and distribution partnerships launched" }
];

const values = [
  {
    icon: "🎯",
    title: "Mission-Driven",
    description: "Every decision we make is guided by our mission to eliminate preventable workplace injuries and save lives."
  },
  {
    icon: "🔬", 
    title: "Science-Based",
    description: "We base our innovations on rigorous scientific research, biomechanical engineering, and real-world testing."
  },
  {
    icon: "🤝",
    title: "Partnership",
    description: "We work closely with safety professionals, regulatory bodies, and industry leaders to create effective solutions."
  },
  {
    icon: "🌍",
    title: "Global Impact",
    description: "Our vision extends beyond individual products to transforming workplace safety standards worldwide."
  }
];

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      {/* Hero Section */}
      <Section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-primary-200">
                <span className="text-lg">🏢</span>
                Our Story
              </div>
              
              <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-600 mb-6 leading-tight">
                Revolutionizing <span className="text-accent-500">Safety</span> Through Innovation
              </h1>
              
              <p className="text-xl text-neutral-700 mb-8 leading-relaxed">
                At Skywalker Unlimited, we're on a mission to eliminate preventable workplace injuries 
                and deaths from fall-related accidents. Our patent-pending kinetic geometry technology 
                represents a fundamental breakthrough in fall protection.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <div className="font-bold text-primary-600">Mission</div>
                    <div className="text-neutral-700">Zero preventable fall injuries</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🔬</span>
                  </div>
                  <div>
                    <div className="font-bold text-primary-600">Innovation</div>
                    <div className="text-neutral-700">Science-based solutions</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="/images/about-hero.jpg" 
                  alt="Skywalker team developing safety equipment"
                  className="w-full h-full object-cover aspect-[4/3]"
                  onError={(e) => {
                    e.currentTarget.src = "/images/hero.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating stats */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 border border-neutral-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">5,000+</div>
                  <div className="text-sm text-neutral-600">Job Sites Protected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Company Values */}
      <Section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-600 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 bg-neutral-50 rounded-2xl border border-neutral-200">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl">{value.icon}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-primary-600 mb-3">{value.title}</h3>
                <p className="text-neutral-700 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Problem & Solution */}
      <Section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-600 mb-6">
              The Problem We're Solving
            </h2>
            <p className="text-xl text-neutral-700 max-w-4xl mx-auto leading-relaxed">
              Traditional fall-arrest harnesses can cause suspension trauma, leading to serious injury or death 
              even after a successful fall arrest. We're changing that with breakthrough technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="font-display text-3xl font-bold text-primary-600 mb-8">The Traditional Problem</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-danger-50 rounded-2xl border border-danger-200">
                  <div className="w-12 h-12 bg-danger-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-danger-600 text-2xl">⚠️</span>
                  </div>
                  <div>
                    <div className="font-bold text-danger-800 mb-2">Suspension Trauma</div>
                    <div className="text-danger-700">Concentrated strap pressure restricts blood flow, leading to unconsciousness</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-6 bg-danger-50 rounded-2xl border border-danger-200">
                  <div className="w-12 h-12 bg-danger-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-danger-600 text-2xl">⏱️</span>
                  </div>
                  <div>
                    <div className="font-bold text-danger-800 mb-2">Limited Time</div>
                    <div className="text-danger-700">As little as 15 minutes before serious injury or death</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-6 bg-danger-50 rounded-2xl border border-danger-200">
                  <div className="w-12 h-12 bg-danger-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-danger-600 text-2xl">🚫</span>
                  </div>
                  <div>
                    <div className="font-bold text-danger-800 mb-2">Rescue Complications</div>
                    <div className="text-danger-700">Worker cannot self-rescue or assist in rescue operations</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-3xl font-bold text-primary-600 mb-8">Our Breakthrough Solution</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-success-50 rounded-2xl border border-success-200">
                  <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-success-600 text-2xl">✅</span>
                  </div>
                  <div>
                    <div className="font-bold text-success-800 mb-2">Kinetic Geometry</div>
                    <div className="text-success-700">Distributes load across multiple pressure points, preserving circulation</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-6 bg-success-50 rounded-2xl border border-success-200">
                  <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-success-600 text-2xl">⏰</span>
                  </div>
                  <div>
                    <div className="font-bold text-success-800 mb-2">Extended Time</div>
                    <div className="text-success-700">Up to 3x longer survivable suspension time</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-6 bg-success-50 rounded-2xl border border-success-200">
                  <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-success-600 text-2xl">🤝</span>
                  </div>
                  <div>
                    <div className="font-bold text-success-800 mb-2">Active Rescue</div>
                    <div className="text-success-700">Worker maintains mobility and can assist in rescue operations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Company Timeline */}
      <Section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-600 mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-neutral-700">
              From research lab to protecting workers on job sites worldwide
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-primary-200 md:transform md:-translate-x-px"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-center">
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center md:transform md:-translate-x-4 shadow-lg">
                    <span className="text-white font-bold text-sm">{milestone.year.slice(-2)}</span>
                  </div>
                  
                  <div className={`bg-white rounded-2xl shadow-lg p-8 ml-16 md:ml-0 border border-neutral-200 ${index % 2 === 0 ? 'md:mr-1/2 md:pr-16' : 'md:ml-1/2 md:pl-16'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-lg font-bold text-accent-600">{milestone.year}</div>
                      <div className="h-1 flex-1 bg-accent-100 rounded"></div>
                    </div>
                    <h3 className="font-display text-xl font-bold text-primary-600 mb-3">{milestone.title}</h3>
                    <p className="text-neutral-700 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Leadership Team */}
      <Section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-600 mb-6">
              Leadership Team
            </h2>
            <p className="text-xl text-neutral-700">
              Safety experts and engineers committed to protecting every worker
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-neutral-200 group hover:shadow-xl transition-all duration-300">
                <div className="w-full h-64 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=003366&color=fff&size=256&font-size=0.4`;
                    }}
                  />
                </div>
                
                <div className="p-8 text-center">
                  <h3 className="font-display text-xl font-bold text-primary-600 mb-2">{member.name}</h3>
                  <div className="text-accent-600 font-semibold mb-4">{member.role}</div>
                  <p className="text-neutral-700 mb-6 leading-relaxed">{member.bio}</p>
                  
                  <a 
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-accent-500 font-semibold transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Company Stats */}
      <Section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-white mb-2">6</div>
              <div className="text-xl text-white/90">Years of Innovation</div>
            </div>
            
            <div>
              <div className="text-5xl font-bold text-white mb-2">5,000+</div>
              <div className="text-xl text-white/90">Job Sites Protected</div>
            </div>
            
            <div>
              <div className="text-5xl font-bold text-white mb-2">15+</div>
              <div className="text-xl text-white/90">Safety Certifications</div>
            </div>
            
            <div>
              <div className="text-5xl font-bold text-white mb-2">99.9%</div>
              <div className="text-xl text-white/90">Safety Record</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-600 mb-6">
              Ready to Join Our Mission?
            </h2>
            <p className="text-xl text-neutral-700 mb-8 leading-relaxed">
              Whether you're a safety professional, distributor, or someone who shares our vision 
              of zero preventable fall injuries, we'd love to work with you.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                href="/careers"
                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                View Open Positions
              </Link>
              
              <Link 
                href="/contact"
                className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
