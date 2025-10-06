import Section from "@/components/Section";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { money } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const categories = [
  {
    title: 'Signature Velvet Swings',
    description: 'Midnight velvet, vegan leather, and satin cradles engineered for weightless indulgence.',
    image: '/images/products/WH-ORFF-CSFH-1.jpg',
    href: '/collection/signature-swings',
    stats: 'Most Loved',
    features: ['Plush washable covers', '600 lb weight tested', 'Concierge styling call']
  },
  {
    title: 'Faux Fur & Fantasy',
    description: 'Limited faux fur trims, feather tassels, and statement textiles direct from the SkyFox studio.',
    image: '/images/skyfox-placeholder.png',
    href: '/collection/faux-fur',
    stats: 'Limited Run',
    features: ['Feather & faux fur accents', 'Monochrome or neon palettes', 'Ships with care guide']
  },
  {
    title: 'Doorway & Travel Kits',
    description: 'Apartment-friendly rigs with padded straps, quick installs, and discreet storage bags.',
    image: '/images/products/WH-TLSH-1.jpg',
    href: '/collection/doorway',
    stats: 'Traveler Fave',
    features: ['Under 10-minute install', 'Fits standard frames', 'Padded pressure points']
  },
  {
    title: 'Frames & Anchor Systems',
    description: 'Freestanding Nebula frames and Aurora anchor bundles for suites, studios, and hospitality installs.',
    image: '/images/products/WH-RCH-21-1.jpg',
    href: '/collection/support-stands',
    stats: 'Pro Install',
    features: ['Indoor/outdoor frame options', 'Dual-mount hardware', 'Concierge install support']
  }
];


async function getProducts() {
  try {
    const products = await prisma.product.findMany({ 
      include: { images: true, variants: true },
      where: { status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' }
    });
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      {/* Hero Section */}
      <Section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <span className="text-lg">🪢</span>
              Shop Our Products
            </div>
            <h1 className="font-display text-display-1 font-bold text-primary-600 mb-4">
              SkyFox Swings Collections
            </h1>
            <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto">
              Explore SkyFox Swings collections curated for suites, studios, travel play, and hospitality installs. Weight-tested hardware, concierge styling, and indulgent textiles come standard.
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
            {categories.map((category, index) => (
              <Link key={index} href={category.href} className="group card p-6 hover:shadow-md transition-shadow duration-200">
                <div className="relative mb-6">
                  <div className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-3 right-3 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {category.stats}
                  </div>
                </div>
                
                <h3 className="font-display text-lg font-bold text-primary-600 mb-2 group-hover:text-accent-500 transition-colors">
                  {category.title}
                </h3>
                <p className="text-neutral-600 text-sm mb-4">{category.description}</p>
                
                <div className="space-y-1 mb-4">
                  {category.features.slice(0, 2).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs text-neutral-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center text-accent-500 font-semibold text-sm">
                  Browse Products
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
                All Products
              </h2>
              <p className="text-body-lg text-neutral-600">
                Browse the full SkyFox Swings lineup and find the suspension style that fits your space.
              </p>
            </div>

            {products.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product: any) => (
                  <Link key={product.id} href={`/product/${product.handle}`} className="group card hover:shadow-strong transition-all duration-300">
                    <div className="aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-200 relative overflow-hidden rounded-t-2xl">
                      {product.images[0] ? (
                        <img 
                          src={product.images[0].url} 
                          alt={product.images[0].alt || product.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl text-neutral-400">
                          📦
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-success-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        ANSI Certified
                      </div>
                      {product.status === 'DRAFT' && (
                        <div className="absolute top-4 right-4 bg-warning-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          Draft
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-display font-bold text-primary-600 mb-2 group-hover:text-accent-500 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-sm text-neutral-600 mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-primary-600">
                          {product.variants[0] ? money(product.variants[0].price) : "Price on request"}
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
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="font-display text-2xl font-bold text-primary-600 mb-4">No Products Available</h3>
                <p className="text-neutral-600 mb-8">Products will appear here once they are added through the admin panel.</p>
                <Link 
                  href="/admin/products/new"
                  className="btn-primary px-6 py-3"
                >
                  Add First Product
                </Link>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl text-white p-12 text-center">
            <h2 className="font-display text-2xl font-bold mb-4">
              Need Help Styling Your Suspension Suite?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Our concierge stylists will help you select textiles, hardware, and install options tailored to your vibe and venue.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/contact"
                className="btn-primary px-6 py-3"
              >
                Get Expert Advice
              </Link>
              
              <a 
                href="tel:+1800759369"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/60 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/15"
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
