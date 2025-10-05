import Section from "../components/Section";
import Link from "next/link";

// Force dynamic rendering for homepage with blog content
export const dynamic = 'force-dynamic';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  publishedAt: string | null;
};

async function getHomepageBlogPosts(): Promise<BlogPost[]> {
  try {
    // Server-side: use full URL in production, localhost in development
    // Client-side: use relative URLs
    const isServer = typeof window === 'undefined';
    const baseUrl = isServer
      ? (process.env.NODE_ENV === 'production'
          ? 'https://skywalker.vercel.app'
          : 'http://localhost:3001')
      : '';

    const response = await fetch(`${baseUrl}/api/blog`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error('Failed to fetch blog posts:', response.statusText);
      return [];
    }

    const posts = await response.json();

    // Get featured post (kinetic fall arrest) and 2 most recent other posts
    const featuredPost = posts.find((post: BlogPost) => post.slug === 'introducing-kinetic-fall-arrest');
    const recentPosts = posts
      .filter((post: BlogPost) => post.slug !== 'introducing-kinetic-fall-arrest')
      .slice(0, 2);

    return featuredPost ? [featuredPost, ...recentPosts] : posts.slice(0, 3);
  } catch (error) {
    console.error('Error fetching homepage blog posts:', error);
    return [];
  }
}

const TRUST_INDICATORS = [
  { icon: "🏗️", text: "Protecting Job Sites Worldwide" },
  { icon: "⚡", text: "Ships Within 24 Hours" },
  { icon: "🛡️", text: "ANSI/OSHA Certified" },
  { icon: "📞", text: "Expert Safety Consultation" }
];

const CERT_LOGOS = ["/logos/cert1.svg","/logos/cert2.svg","/logos/cert3.svg","/logos/cert4.svg","/logos/cert5.svg"];

function TrustBar() {
  return (
    <div className="bg-white py-8 border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TRUST_INDICATORS.map((item, index) => (
            <div key={index} className="flex items-center justify-center gap-3 text-center">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-semibold text-neutral-800">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-white via-neutral-50 to-neutral-100 pt-12 pb-16 lg:pt-20 lg:pb-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-success-50 text-success-800 px-4 py-2 rounded-full text-sm font-semibold border border-success-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Patent-Pending Technology
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-600 leading-tight">
              Certified Fall-Protection 
              <span className="text-accent-500"> You Can Trust</span> 
              on Every Job
            </h1>
            
            <p className="text-xl text-neutral-700 max-w-lg leading-relaxed">
              Stop risking OSHA fines and worker injuries. Our kinetic fall-arrest harnesses 
              prevent suspension trauma while meeting all safety standards.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-white shadow-soft">
                  <div className="w-full h-full flex items-center justify-center text-2xl">🇺🇸</div>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-white shadow-soft">
                  <div className="w-full h-full flex items-center justify-center text-2xl">🇨🇦</div>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-white shadow-soft">
                  <div className="w-full h-full flex items-center justify-center text-2xl">🇲🇽</div>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-white shadow-soft">
                  <div className="w-full h-full flex items-center justify-center text-2xl">🇪🇺</div>
                </div>
              </div>
              <div className="text-sm">
                <div className="font-bold text-neutral-900">Worldwide Safety Managers</div>
                <div className="text-neutral-700">trust Skywalker harnesses</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/solutions"
                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Shop ANSI-Certified Harnesses
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link 
                href="/contact"
                className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 inline-flex items-center justify-center gap-2"
              >
                Get Volume Quote
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-neutral-700">
              <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              30-Day No-Fall Guarantee • Free Returns • Lifetime Warranty
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/images/hero.svg" 
                alt="Construction worker wearing Skywalker safety harness on job site" 
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-neutral-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-sm text-neutral-900">ANSI Z359.1</div>
                  <div className="text-xs text-neutral-600">Certified Safe</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-neutral-600 uppercase tracking-wide">Trusted by Industry Leaders</p>
        </div>
        <div className="relative overflow-hidden py-6">
          <div className="flex animate-marquee">
            {/* First set */}
            {CERT_LOGOS.map((src, i) => (
              <div key={`set1-${i}`} className="flex-shrink-0 w-48 flex items-center justify-center px-8">
                <img
                  src={src}
                  alt="Certification logo"
                  className="h-16 md:h-20 w-auto"
                />
              </div>
            ))}
            {/* Second set for seamless loop */}
            {CERT_LOGOS.map((src, i) => (
              <div key={`set2-${i}`} className="flex-shrink-0 w-48 flex items-center justify-center px-8">
                <img
                  src={src}
                  alt="Certification logo"
                  className="h-16 md:h-20 w-auto"
                />
              </div>
            ))}
            {/* Third set for extra smoothness */}
            {CERT_LOGOS.map((src, i) => (
              <div key={`set3-${i}`} className="flex-shrink-0 w-48 flex items-center justify-center px-8">
                <img
                  src={src}
                  alt="Certification logo"
                  className="h-16 md:h-20 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <Section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-600 mb-6">
            The Hidden Danger After Every Fall
          </h2>
          <p className="text-xl text-neutral-700 max-w-4xl mx-auto leading-relaxed">
            Traditional harnesses can arrest the fall—but concentrated strap forces and restricted posture 
            can rapidly cause suspension trauma. Our solution changes everything.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-lg bg-neutral-900">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/4524ivG_T3M"
                title="Dangers of Traditional Harnesses"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-neutral-200">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🩺</span>
              </div>
              <h3 className="font-display text-xl font-bold text-primary-600 mb-3">Prevents Trauma</h3>
              <p className="text-neutral-700 leading-relaxed">Kinetic geometry preserves circulation and reduces injury risk during suspension</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-neutral-200">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⏱️</span>
              </div>
              <h3 className="font-display text-xl font-bold text-primary-600 mb-3">Extends Time</h3>
              <p className="text-neutral-700 leading-relaxed">Up to 3x longer survivable suspension time compared to traditional harnesses</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-neutral-200">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="font-display text-xl font-bold text-primary-600 mb-3">Meets Standards</h3>
              <p className="text-neutral-700 leading-relaxed">Full ANSI Z359.1 and OSHA compliance with third-party certification</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function FeaturedProduct() {
  return (
    <Section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-primary-200">
            <span className="text-lg">🏆</span>
            Bestseller
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-600 mb-6">
            Our Flagship Safety Harness
          </h2>
          <p className="text-xl text-neutral-700 max-w-2xl mx-auto">
            The Kinetic Fall-Arrest Harness that's revolutionizing workplace safety
          </p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-6xl mx-auto border border-neutral-200">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative bg-gradient-to-br from-neutral-100 to-neutral-200">
              <img 
                src="/images/hero.svg" 
                alt="Kinetic Fall-Arrest Harness" 
                className="w-full h-full object-cover aspect-square lg:aspect-auto"
              />
              <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                LIMITED TIME
              </div>
            </div>
            
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <h3 className="font-display text-3xl font-bold text-primary-600 mb-4">
                  Kinetic Fall-Arrest Harness
                </h3>
                <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                  Patent-pending kinetic geometry with posture protection and extended survivable suspension time.
                </p>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl font-display font-bold text-primary-600">$399.00</div>
                  <div className="text-xl text-neutral-500 line-through">$499.00</div>
                  <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-bold border border-primary-200">
                    Save $100
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-neutral-800 font-medium">ANSI Z359.1-2016 Certified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-neutral-800 font-medium">Ships within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-neutral-800 font-medium">30-day money-back guarantee</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-3 w-3 rounded-full bg-success-500 animate-pulse"></div>
                  <span className="font-bold text-success-700">15 in stock</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <Link 
                  href="/product/kinetic-harness"
                  className="block w-full bg-accent-500 hover:bg-accent-600 text-white text-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
                >
                  Buy Now - Free Shipping
                </Link>
                
                <Link 
                  href="/product/kinetic-harness"
                  className="block w-full border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white text-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200"
                >
                  View Details & Specs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default async function Page(){
  const blogPosts = await getHomepageBlogPosts();
  return (
    <>
      <HeroSection />
      <TrustBar />
      <VideoSection />
      <FeaturedProduct />
      
      {/* Applications Section - FIXED READABILITY */}
      <Section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-primary-200">
              <span className="text-lg">⚙️</span>
              Industry Solutions
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-600 mb-6">
              Solutions for Every Industry
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
              Three specialized application classes built on the same life-saving kinetic geometry
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/collection/military" className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200">
              <div className="aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-200 relative overflow-hidden">
                <img src="/images/apps/military.svg" alt="Military application" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Tactical
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-display text-2xl font-bold text-primary-600 mb-3 group-hover:text-accent-500 transition-colors">Military & Tactical</h3>
                <p className="text-neutral-700 mb-6 leading-relaxed">Low-signature, posture-protective designs for insertion/extraction, shipboard, and high-mobility operations.</p>
                <div className="flex items-center text-accent-500 font-bold">
                  Explore Solutions
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
            
            <Link href="/collection/construction" className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200">
              <div className="aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-200 relative overflow-hidden">
                <img src="/images/apps/construction.svg" alt="Construction application" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Popular
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-display text-2xl font-bold text-primary-600 mb-3 group-hover:text-accent-500 transition-colors">Construction & Industrial</h3>
                <p className="text-neutral-700 mb-6 leading-relaxed">Jobsite-ready harnesses designed to reduce post-fall injury and extend survivable suspension times.</p>
                <div className="flex items-center text-accent-500 font-bold">
                  Explore Solutions
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
            
            <Link href="/collection/recreation" className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200">
              <div className="aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-200 relative overflow-hidden">
                <img src="/images/apps/recreation.svg" alt="Recreational application" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-4 right-4 bg-success-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Adventure
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-display text-2xl font-bold text-primary-600 mb-3 group-hover:text-accent-500 transition-colors">Recreation & Sports</h3>
                <p className="text-neutral-700 mb-6 leading-relaxed">Ergonomic, circulation-conscious designs optimized for climbing, rappelling, and adventure sports.</p>
                <div className="flex items-center text-accent-500 font-bold">
                  Explore Solutions
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Section>

      {/* Expertise Section - FIXED READABILITY */}
      <Section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-success-100 text-success-800 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-success-200">
              <span className="text-lg">🧪</span>
              Research & Development
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-600 mb-6">
              Engineering Excellence
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
              Research-backed insights on kinetic geometry, safety testing, and industry standards
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200">
                <div className="aspect-[16/9] bg-gradient-to-br from-primary-50 to-primary-100 relative overflow-hidden">
                  <img
                    src={post.featuredImage || "/images/blog/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  {index === 0 && (
                    <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <h3 className="font-display text-xl font-bold text-primary-600 mb-3 group-hover:text-accent-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-neutral-700 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-accent-500 font-bold">
                    Read Article
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact Section - MAXIMUM READABILITY */}
      <Section className="bg-primary-600 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Upgrade Your Safety Program?
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
              Tell us about your application and timeline. We'll follow up with next steps within 2 hours.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input 
                    name="name"
                    className="bg-white/20 border border-white/40 rounded-xl px-4 py-4 text-white placeholder-white/80 focus:bg-white/25 focus:border-white/60 focus:ring-2 focus:ring-white/40 transition-all font-medium" 
                    placeholder="Full name" 
                    required 
                  />
                  <input 
                    name="email"
                    className="bg-white/20 border border-white/40 rounded-xl px-4 py-4 text-white placeholder-white/80 focus:bg-white/25 focus:border-white/60 focus:ring-2 focus:ring-white/40 transition-all font-medium" 
                    placeholder="Email" 
                    type="email" 
                    required 
                  />
                </div>
                <input 
                  name="company"
                  className="w-full bg-white/20 border border-white/40 rounded-xl px-4 py-4 text-white placeholder-white/80 focus:bg-white/25 focus:border-white/60 focus:ring-2 focus:ring-white/40 transition-all font-medium" 
                  placeholder="Company / Organization (optional)" 
                />
                <textarea 
                  name="message"
                  className="w-full bg-white/20 border border-white/40 rounded-xl px-4 py-4 text-white placeholder-white/80 focus:bg-white/25 focus:border-white/60 focus:ring-2 focus:ring-white/40 transition-all font-medium" 
                  placeholder="How can we help? (Include: number of workers, industry, timeline)" 
                  rows={4} 
                  required 
                />
                <button 
                  type="submit" 
                  className="w-full bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
                >
                  Send Message
                </button>
              </form>
              
              <div className="mt-8 pt-6 border-t border-white/30 text-center">
                <p className="text-white/90 mb-4 font-medium">Or call our safety experts directly:</p>
                <a href="tel:+1-800-SKYWALKER" className="text-accent-300 font-bold text-2xl hover:text-accent-200 transition-colors">
                  1-800-SKYWALKER
                </a>
                <p className="text-white/80 mt-2">Mon-Fri 7AM-6PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}