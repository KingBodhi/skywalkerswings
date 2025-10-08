"use client";
import React, { useState } from 'react';
import useSWR from 'swr';
import { useParams, useRouter } from 'next/navigation';
import ImageUpload from '@/components/ImageUpload';
import VariantManager from '@/components/VariantManager';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: product, mutate } = useSWR(`/api/admin/products/${params.id}`, fetcher);
  
  const [activeTab, setActiveTab] = useState('general');
  const [productData, setProductData] = useState({
    title: '',
    handle: '',
    description: '',
    status: 'DRAFT'
  });
  const [images, setImages] = useState<string[]>([]);
  const [variants, setVariants] = useState<any[]>([]);
  const [metadata, setMetadata] = useState<Record<string, any>>({});
  const [badgeLabel, setBadgeLabel] = useState('');

  // Update local state when product data loads
  React.useEffect(() => {
    if (product) {
      setProductData({
        title: product.title || '',
        handle: product.handle || '',
        description: product.description || '',
        status: product.status || 'DRAFT'
      });
      setImages(product.images?.map((img: any) => img.url) || []);
      setVariants(product.variants || []);
      let parsedMeta: Record<string, any> = {};
      try {
        parsedMeta = product.metadata ? JSON.parse(product.metadata) : {};
      } catch (err) {
        parsedMeta = {};
      }
      setMetadata(parsedMeta);
      setBadgeLabel(parsedMeta.badgeLabel || '');
    }
  }, [product]);

  const saveChanges = async () => {
    try {
      const updatedMetadata = { ...metadata } as Record<string, any>;
      if (badgeLabel.trim()) {
        updatedMetadata.badgeLabel = badgeLabel.trim();
      } else {
        delete updatedMetadata.badgeLabel;
      }
      const metadataPayload = Object.keys(updatedMetadata).length > 0 ? JSON.stringify(updatedMetadata) : null;

      const response = await fetch(`/api/admin/products/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productData,
          metadata: metadataPayload,
          images: images.map((url, index) => ({
            url,
            alt: `${productData.title} - Image ${index + 1}`,
            position: index
          })),
          variants: variants
        })
      });

      if (response.ok) {
        mutate(); // Refresh data
        alert('Product updated successfully!');
      } else {
        alert('Failed to update product');
      }
    } catch (error) {
      alert('Error updating product');
      console.error(error);
    }
  };

  if (!product) {
    return <div className="space-y-4">
      <div className="h-8 bg-neutral-200 rounded animate-pulse"></div>
      <div className="h-96 bg-neutral-200 rounded animate-pulse"></div>
    </div>;
  }

  const tabs = [
    { id: 'general', label: 'General', icon: '📝' },
    { id: 'variants', label: 'Variants', icon: '🎨' },
    { id: 'inventory', label: 'Inventory', icon: '📦' },
    { id: 'images', label: 'Images', icon: '🖼️' },
    { id: 'seo', label: 'SEO', icon: '🔍' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="font-display text-3xl font-bold text-primary-600">{product.title}</h1>
            <p className="text-neutral-600">Product ID: {product.id.slice(-8)}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="border border-neutral-300 px-6 py-3 rounded-xl hover:bg-neutral-50 transition-colors">
            Duplicate
          </button>
          <button 
            onClick={saveChanges}
            className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
        <div className="border-b border-neutral-200">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                    : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">Product Title</label>
                <input
                  type="text"
                  value={productData.title}
                  onChange={(e) => setProductData({...productData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">Handle</label>
                <input
                  type="text"
                  value={productData.handle}
                  onChange={(e) => setProductData({...productData, handle: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                />
                <div className="text-sm text-neutral-500 mt-1">
                  URL: /product/{productData.handle || 'product-handle'}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">Description</label>
                <textarea
                  value={productData.description}
                  onChange={(e) => setProductData({...productData, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">Status</label>
                <select
                  value={productData.status}
                  onChange={(e) => setProductData({...productData, status: e.target.value})}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="ACTIVE">Active</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">Badge Label</label>
                <input
                  type="text"
                  value={badgeLabel}
                  onChange={(e) => setBadgeLabel(e.target.value)}
                  placeholder="e.g. Limited Edition, Concierge Favorite"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                />
                <p className="text-sm text-neutral-500 mt-1">Leave blank to hide the badge on product cards.</p>
              </div>
            </div>
          )}

          {activeTab === 'variants' && (
            <VariantManager
              variants={variants}
              onChange={setVariants}
              productId={product?.id}
            />
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <h3 className="font-display text-xl font-bold text-primary-600">Inventory Management</h3>
              
              <div className="space-y-4">
                {product.variants?.map((variant: any) => (
                  <div key={variant.id} className="flex items-center justify-between p-6 border border-neutral-200 rounded-xl">
                    <div>
                      <div className="font-semibold text-primary-600">{variant.sku}</div>
                      <div className="text-sm text-neutral-600">
                        {variant.size && `Size: ${variant.size}`}
                        {variant.color && ` • Color: ${variant.color}`}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold text-neutral-900">
                          {variant.inventory?.quantity || 0} in stock
                        </div>
                        <div className="text-sm text-neutral-600">
                          {variant.inventory?.reserved || 0} reserved
                        </div>
                      </div>
                      <input
                        type="number"
                        defaultValue={variant.inventory?.quantity || 0}
                        className="w-24 px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary-500 transition-all"
                      />
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                        Update
                      </button>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-8 text-neutral-500">
                    <div className="text-2xl mb-2">📦</div>
                    <div>Create variants to manage inventory</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="space-y-6">
              <h3 className="font-display text-xl font-bold text-primary-600">Product Images</h3>
              <p className="text-neutral-600 mb-6">
                Upload high-quality images of your product. The first image will be used as the primary display image.
              </p>
              
              <ImageUpload
                value={images}
                onChange={setImages}
                maxFiles={8}
              />
              
              {images.length > 0 && (
                <div className="bg-neutral-50 p-4 rounded-xl">
                  <div className="text-sm text-neutral-600">
                    <strong>Tips:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>The first image will be used as the primary product image</li>
                      <li>Use high-resolution images (at least 800x800px)</li>
                      <li>Show the product from multiple angles</li>
                      <li>Include detail shots of important features</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-6">
              <h3 className="font-display text-xl font-bold text-primary-600">SEO & Search</h3>
              
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">Meta Title</label>
                <input
                  type="text"
                  defaultValue={product.title}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                />
                <div className="text-sm text-neutral-500 mt-1">60 characters recommended</div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">Meta Description</label>
                <textarea
                  defaultValue={product.description}
                  rows={3}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                />
                <div className="text-sm text-neutral-500 mt-1">160 characters recommended</div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">Search Keywords</label>
                <input
                  type="text"
                  placeholder="safety harness, fall protection, ANSI certified"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}