"use client";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (u: string) => fetch(u).then(r => r.json());
const money = (c: number) => Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(c / 100);

export default function Page() {
  const { data, mutate } = useSWR("/api/cart", fetcher);
  
  if (!data) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-neutral-200 rounded w-32"></div>
          <div className="space-y-4">
            <div className="h-24 bg-neutral-200 rounded"></div>
            <div className="h-24 bg-neutral-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const total = (data.items || []).reduce((s: any, i: any) => s + i.price * i.qty, 0);
  
  async function del(id: string) {
    await fetch("/api/cart/items", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    mutate();
  }
  
  async function checkout() {
    try {
      const res = await fetch("/api/checkout/session", { method: "POST" });
      const json = await res.json();

      if (!res.ok) {
        alert(json.error || "Checkout error occurred");
        return;
      }

      if (json.url) location.href = json.url;
    } catch (error) {
      alert("Network error creating checkout session.");
    }
  }

  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-primary-600">Shopping Cart</h1>
        <p className="mt-2 text-neutral-600">
          {data.items?.length ? `${data.items.length} item${data.items.length > 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
        </p>
      </div>

      {data.items?.length ? (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
              <div className="divide-y divide-neutral-200">
                {data.items.map((item: any) => (
                  <div key={item.id} className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-primary-600">{item.variant?.product?.title || "Product"}</h3>
                        <p className="text-sm text-neutral-600 mt-1">
                          SKU: {item.variant?.sku || "N/A"}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-sm text-neutral-600">
                            Quantity: {item.qty}
                          </span>
                          <span className="text-lg font-bold text-primary-600">
                            {money(item.price * item.qty)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => del(item.id)}
                        className="self-start px-4 py-2 text-danger-600 hover:text-danger-700 hover:bg-danger-50 rounded-lg font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-6 space-y-4">
              <h2 className="font-display text-xl font-bold text-primary-600">Order Summary</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between text-neutral-700">
                  <span>Subtotal</span>
                  <span>{money(total)}</span>
                </div>
                <div className="flex justify-between text-neutral-700">
                  <span>Shipping</span>
                  <span>{total >= 50000 ? "Free" : "Calculated at checkout"}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-primary-600 text-lg">
                    <span>Total</span>
                    <span>{money(total)}</span>
                  </div>
                </div>
              </div>

              {total >= 50000 && (
                <div className="bg-success-50 border border-success-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-success-800 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">You qualify for free shipping!</span>
                  </div>
                </div>
              )}

              <button
                onClick={checkout}
                className="w-full bg-accent-500 hover:bg-accent-600 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:shadow-lg"
              >
                Proceed to Checkout
              </button>

              <div className="text-center">
                <Link 
                  href="/shop"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-6">🛒</div>
          <h2 className="font-display text-2xl font-bold text-primary-600 mb-4">Your cart is empty</h2>
          <p className="text-neutral-600 mb-8">
            Looks like you haven't added any safety equipment to your cart yet.
          </p>
          <Link 
            href="/shop"
            className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            Browse Products
          </Link>
        </div>
      )}
      </div>
    </div>
  );
}
