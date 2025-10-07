"use client";
import useSWR from "swr";
import { useState } from "react";
import Link from "next/link";
import TrustBadges from "@/components/TrustBadges";

const fetcher = async (u: string) => {
  const response = await fetch(u);
  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
  }
  return response.json();
};
const money = (c: number) => Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(c / 100);

export default function Page({ params }: { params: { handle: string } }) {
  const { data, error, isLoading } = useSWR(`/api/products/${params.handle}`, fetcher);
  const [variantId, setVariantId] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  if (error) {
    return (
      <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-6">❌</div>
            <h1 className="font-display text-3xl font-bold text-primary-600 mb-4">Product Not Found</h1>
            <p className="text-neutral-600 mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              href="/shop"
              className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse space-y-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="aspect-square bg-neutral-200 rounded-2xl"></div>
            <div className="space-y-4">
              <div className="h-8 bg-neutral-200 rounded"></div>
              <div className="h-6 bg-neutral-200 rounded w-32"></div>
              <div className="h-20 bg-neutral-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const activeVariant = variantId 
    ? data.variants?.find((v: any) => v.id === variantId)
    : data.variants?.[0];
  const activeId = activeVariant?.id || "";

  async function add() {
    if (!activeId) {
      alert("Please select a variant.");
      return;
    }
    try {
      const res = await fetch("/api/cart/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId: activeId, qty })
      });

      if (!res.ok) {
        const msg = await res.text();
        alert("Could not add to cart: " + msg);
        return;
      }

      location.href = "/cart";
    } catch {
      alert("Network error adding to cart.");
    }
  }
  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-[4/3] lg:aspect-[3/4] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
            {data.images?.[0] && (
              <img 
                src={data.images[0].url} 
                alt={data.images[0].alt || data.title} 
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
            {(data.images || []).slice(1, 5).map((img: any) => (
              <div key={img.id} className="aspect-square overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
                <img 
                  src={img.url} 
                  alt={img.alt || data.title} 
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-primary-600">
              {data.title}
            </h1>
            <div className="mt-3 text-2xl lg:text-3xl font-bold text-primary-600">
              {activeVariant ? money(activeVariant.price) : ""}
            </div>
            <p className="mt-4 text-lg text-neutral-700 leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Inventory Status */}
          {activeVariant?.inventory && (
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${
                activeVariant.inventory.quantity > 0 ? 'bg-success-500' : 'bg-danger-500'
              }`}></div>
              <span className={`font-medium ${
                activeVariant.inventory.quantity > 0 ? 'text-success-700' : 'text-danger-700'
              }`}>
                {activeVariant.inventory.quantity > 0 
                  ? (activeVariant.inventory.quantity > 10 
                    ? 'In Stock' 
                    : `Only ${activeVariant.inventory.quantity} left in stock`)
                  : 'Out of Stock'}
              </span>
            </div>
          )}

          {/* Low Stock Alert */}
          {activeVariant?.inventory?.quantity < 5 && activeVariant.inventory.quantity > 0 && (
            <div className="bg-warning-50 border border-warning-200 rounded-xl p-4">
              <div className="flex items-center gap-3 text-warning-800">
                <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">
                  Only {activeVariant.inventory.quantity} left in stock - order soon!
                </span>
              </div>
            </div>
          )}

          {/* Trust Badges */}
          <TrustBadges className="my-6" />

          {/* Free Shipping Notice */}
          <div className="bg-accent-50 border border-accent-200 rounded-xl p-4">
            <div className="flex items-center gap-2 text-accent-800 font-semibold">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Free shipping on orders over $500 • 30-day returns
            </div>
          </div>

          {/* Variant Selection */}
          {data.variants && data.variants.length > 1 && (
            <div>
              <label className="block text-sm font-semibold text-primary-600 mb-3">
                Choose Option:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {data.variants.map((variant: any) => (
                  <button
                    key={variant.id}
                    onClick={() => setVariantId(variant.id)}
                    className={`p-4 border-2 rounded-xl font-medium transition-all ${
                      (variantId || data.variants[0].id) === variant.id
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-neutral-300 hover:border-primary-300"
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-semibold">
                        {variant.size || "Standard"}
                      </div>
                      {variant.color && (
                        <div className="text-sm text-neutral-600">
                          {variant.color}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Purchase Section */}
          <div className="space-y-4 p-6 bg-neutral-50 rounded-xl border border-neutral-200">
            <div>
              <label className="block text-sm font-semibold text-primary-600 mb-2">
                Quantity:
              </label>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(parseInt(e.target.value || "1"))}
                min={1}
                max={activeVariant?.inventory?.quantity || 99}
                className="w-24 px-3 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
              />
            </div>

            <button
              onClick={add}
              disabled={!activeVariant?.inventory || activeVariant.inventory.quantity === 0}
              className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-neutral-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed"
            >
              {activeVariant?.inventory?.quantity === 0 
                ? "Out of Stock" 
                : "Add to Cart - " + money((activeVariant?.price || 0) * qty)
              }
            </button>
          </div>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": data.title,
            "description": data.description,
            "image": data.images?.map((img: { url: string }) => img.url) || [],
            "sku": activeVariant?.sku || "",
            "brand": {
              "@type": "Brand",
              "name": "SkyFox Swings"
            },
            "offers": {
              "@type": "Offer",
              "url": `${process.env.NEXT_PUBLIC_BASE_URL}/product/${params.handle}`,
              "priceCurrency": "USD",
              "price": (activeVariant?.price || 0) / 100,
              "availability": activeVariant?.inventory?.quantity > 0 
                ? "https://schema.org/InStock" 
                : "https://schema.org/OutOfStock",
              "itemCondition": "https://schema.org/NewCondition"
            }
          })
        }}
      />
      </div>
    </div>
  );
}