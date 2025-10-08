import Section from "@/components/Section";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { money } from "@/lib/utils";

function getBadgeLabel(metadata?: string | null) {
  if (!metadata) return '';
  try {
    const parsed = JSON.parse(metadata);
    const label = parsed?.badgeLabel;
    return typeof label === 'string' ? label : '';
  } catch (error) {
    console.warn('Failed to parse product metadata badge', error);
  }
  return '';
}

export default async function Page({ params }: { params: { handle: string } }) {
  const collection = await prisma.collection.findUnique({
    where: { handle: params.handle },
    include: {
      products: {
        include: {
          product: {
            include: {
              images: true,
              variants: true
            }
          }
        }
      }
    }
  });

  if (!collection) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="text-6xl mb-6">📁</div>
          <h1 className="font-display text-3xl font-bold text-primary-600 mb-4">Collection Not Found</h1>
          <p className="text-neutral-600 mb-8">The collection you're looking for doesn't exist.</p>
          <Link 
            href="/shop"
            className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      <Section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            {collection.heroImage && (
              <div className="aspect-[3/1] max-w-4xl mx-auto mb-8 rounded-2xl overflow-hidden">
                <img 
                  src={collection.heroImage} 
                  alt={collection.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary-600 mb-4">
              {collection.title}
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              {collection.description || `Browse our ${collection.title.toLowerCase()} products`}
            </p>
          </div>

          {/* Products Grid */}
          {collection.products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {collection.products.map((cp) => (
                <Link 
                  key={cp.product.id} 
                  href={`/product/${cp.product.handle}`} 
                  className="group card hover:shadow-strong transition-all duration-300"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-200 relative overflow-hidden rounded-t-2xl">
                    {cp.product.images[0] ? (
                      <img 
                        src={cp.product.images[0].url} 
                        alt={cp.product.images[0].alt || cp.product.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl text-neutral-400">
                        📦
                      </div>
                    )}
                    {(() => {
                      const badge = getBadgeLabel(cp.product.metadata);
                      return badge ? (
                        <div className="absolute top-4 left-4 bg-success-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          {badge}
                        </div>
                      ) : null;
                    })()}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-primary-600 mb-2 group-hover:text-accent-500 transition-colors">
                      {cp.product.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                      {cp.product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-primary-600">
                        {cp.product.variants[0] ? money(cp.product.variants[0].price) : "Price on request"}
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
              <div className="text-6xl mb-6">📦</div>
              <h2 className="font-display text-2xl font-bold text-primary-600 mb-4">No Products Yet</h2>
              <p className="text-neutral-600 mb-8">
                This collection doesn't have any products yet. Check back soon!
              </p>
              <Link 
                href="/shop"
                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold transition-colors"
              >
                Browse All Products
              </Link>
            </div>
          )}

          {/* Back to Shop */}
          <div className="mt-16 text-center">
            <Link 
              href="/shop"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Back to All Products
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
