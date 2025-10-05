"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/ImageUpload';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    title: '',
    handle: '',
    description: '',
    status: 'DRAFT'
  });
  const [images, setImages] = useState<string[]>([]);

  async function createProduct() {
    if (!product.title || !product.handle) {
      alert('Please fill in required fields');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...product,
          images: images.map((url, index) => ({
            url,
            alt: `${product.title} - Image ${index + 1}`,
            position: index
          }))
        })
      });
      
      if (res.ok) {
        const newProduct = await res.json();
        router.push(`/admin/products/${newProduct.id}`);
      } else {
        alert('Failed to create product');
      }
    } catch (error) {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/products"
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="font-display text-3xl font-bold text-primary-600">Create New Product</h1>
          <p className="text-neutral-600">Add a new product to your catalog</p>
        </div>
      </div>

      {/* Product Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-primary-600 mb-2">
              Product Title *
            </label>
            <input
              type="text"
              value={product.title}
              onChange={(e) => setProduct({...product, title: e.target.value})}
              placeholder="Enter product title"
              className="admin-input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-600 mb-2">
              URL Handle *
            </label>
            <input
              type="text"
              value={product.handle}
              onChange={(e) => setProduct({...product, handle: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})}
              placeholder="product-url-handle"
              className="admin-input"
              required
            />
            <div className="text-sm text-neutral-500 mt-1">
              URL: /product/{product.handle || 'product-handle'}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-600 mb-2">
              Description
            </label>
            <textarea
              value={product.description}
              onChange={(e) => setProduct({...product, description: e.target.value})}
              placeholder="Describe your product..."
              rows={4}
              className="admin-textarea"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-600 mb-2">
              Status
            </label>
            <select
              value={product.status}
              onChange={(e) => setProduct({...product, status: e.target.value})}
              className="admin-select"
            >
              <option value="DRAFT">Draft</option>
              <option value="ACTIVE">Active</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-600 mb-2">
              Product Images
            </label>
            <ImageUpload
              value={images}
              onChange={setImages}
              maxFiles={8}
            />
            <div className="text-sm text-neutral-500 mt-2">
              Add product images to showcase your items. The first image will be used as the primary display image.
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Link
          href="/admin/products"
          className="border border-neutral-300 px-6 py-3 rounded-xl hover:bg-neutral-50 transition-colors font-medium"
        >
          Cancel
        </Link>
        <button
          onClick={createProduct}
          disabled={loading || !product.title || !product.handle}
          className="bg-accent-500 hover:bg-accent-600 disabled:bg-neutral-400 text-white px-6 py-3 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </div>
    </div>
  );
}