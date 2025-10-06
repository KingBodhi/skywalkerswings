import Section from "../../components/Section";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { money } from "@/lib/utils";

const categories = [
  {
    title: "Construction & Industrial",
    description: "OSHA-compliant harnesses built for jobsite durability",
    image: "/images/apps/construction.svg",
    href: "/collection/construction",
    stats: "Most Popular",
    features: ["OSHA 1926 Compliant", "Jobsite Durability", "Quick Connect D-Rings"]
  },
  {
    title: "Military & Tactical",
    description: "Low-profile designs for high-mobility operations",
    image: "/images/apps/military.svg", 
    href: "/collection/military",
    stats: "Mission Critical",
    features: ["Low Signature Profile", "Rapid Deployment", "Multi-Point Attachment"]
  },
  {
    title: "Recreation & Sports",
    description: "Ergonomic harnesses for climbing and adventure sports",
    image: "/images/apps/recreation.svg",
    href: "/collection/recreation", 
    stats: "Adventure Ready",
    features: ["Comfort Padding", "Gear Loops", "Lightweight Design"]
  }
];

async function getProducts() {
  try {
    const products = await prisma.product.findMany({ 
      include: { images: true, variants: true },
      take: 6
    });
    return products;
  } catch (error) {
    return [];
  }
}

export default async function SolutionsPage() {
  const products = await getProducts();

  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      {/* Hero Section */}
      <Section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <span className="text-lg">🛡️</span>
              Safety Solutions
            </div>
            <h1 className="font-display text-display-1 font-bold text-primary-600 mb-4">
              Complete Fall Protection Solutions
            </h1>
            <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto">
              From construction sites to climbing walls, our kinetic fall-arrest systems 
              provide unmatched protection across every industry and application.
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {categories.map((category, index) => (
              <Link key={index} href={category.href} className="group card p-8 hover:shadow-strong transition-all duration-300">
                <div className="relative mb-6">
                  <div className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {category.stats}
                  </div>
                </div>
                
                <h3 className="font-display text-xl font-bold text-primary-600 mb-2 group-hover:text-accent-500 transition-colors">
                  {category.title}
                </h3>
                <p className="text-neutral-600 mb-4">{category.description}</p>
                
                <div className="space-y-2 mb-6">
                  {category.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-neutral-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center text-accent-500 font-semibold">
                  View Products
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured Products */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="font-display text-h1 font-bold text-primary-600 mb-4">
                Featured Products
              </h2>
              <p className="text-body-lg text-neutral-600">
                Our most trusted fall protection systems, chosen by safety professionals worldwide
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product: any) => (
                <Link key={product.id} href={`/product/${product.handle}`} className="group card">
                  <div className="aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-200 relative overflow-hidden">
                    {product.images[0] && (
                      <img 
                        src={product.images[0].url} 
                        alt={product.images[0].alt || product.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    )}
                    <div className="absolute top-4 left-4 bg-success-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      ANSI Certified
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-primary-600 mb-2 group-hover:text-accent-500 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-primary-600">
                        {product.variants[0] ? money(product.variants[0].price) : ""}
                      </div>
                      <div className="flex items-center text-accent-500 font-semibold text-sm">
                        View Details
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl text-white p-12 text-center">
            <h2 className="font-display text-2xl font-bold mb-4">
              Need Custom Solutions?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Our safety experts can design custom fall protection systems for unique applications and environments.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/contact"
                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                Get Custom Quote
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