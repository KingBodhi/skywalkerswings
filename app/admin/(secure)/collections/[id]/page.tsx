"use client";
import React, { useState } from 'react';
import useSWR from 'swr';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/ImageUpload';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function CollectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: collection, mutate } = useSWR(`/api/admin/collections/${params.id}`, fetcher);
  const { data: allProducts } = useSWR('/api/admin/products', fetcher);
  
  const [activeTab, setActiveTab] = useState('general');
  const [collectionData, setCollectionData] = useState({
    title: '',
    handle: '',
    description: '',
    status: 'DRAFT'
  });
  const [heroImage, setHeroImage] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Update local state when collection data loads
  React.useEffect(() => {
    if (collection) {
      setCollectionData({
        title: collection.title || '',
        handle: collection.handle || '',
        description: collection.description || '',
        status: collection.status || 'DRAFT'
      });
      setHeroImage(collection.heroImage ? [collection.heroImage] : []);
      setSelectedProducts(collection.products?.map((p: any) => p.productId) || []);
    }
  }, [collection]);

  const saveChanges = async () => {
    try {
      const response = await fetch(`/api/admin/collections/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...collectionData,
          heroImage: heroImage[0] || null,
          productIds: selectedProducts
        })
      });

      if (response.ok) {
        mutate(); // Refresh data
        alert('Collection updated successfully!');
      } else {
        alert('Failed to update collection');
      }
    } catch (error) {
      alert('Error updating collection');
      console.error(error);
    }
  };

  const toggleProduct = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  if (!collection) {
    return <div className="space-y-4">
      <div className="h-8 bg-neutral-200 rounded animate-pulse"></div>
      <div className="h-96 bg-neutral-200 rounded animate-pulse"></div>
    </div>;
  }

  const tabs = [
    { id: 'general', label: 'General', icon: '📝' },
    { id: 'products', label: 'Products', icon: '📦' },
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
            <h1 className="font-display text-3xl font-bold text-primary-600">{collection.title}</h1>
            <p className="text-neutral-600">Collection ID: {collection.id.slice(-8)}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Link
            href={`/collection/${collection.handle}`}
            target="_blank"
            className="border border-neutral-300 px-6 py-3 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            View Collection ↗
          </Link>
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
                <label className="block text-sm font-semibold text-primary-600 mb-2">Collection Title</label>
                <input
                  type="text"
                  value={collectionData.title}
                  onChange={(e) => setCollectionData({...collectionData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">Handle</label>
                <input
                  type="text"
                  value={collectionData.handle}
                  onChange={(e) => setCollectionData({...collectionData, handle: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                />
                <div className="text-sm text-neutral-500 mt-1">
                  URL: /collection/{collectionData.handle || 'collection-handle'}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">Description</label>
                <textarea
                  value={collectionData.description}
                  onChange={(e) => setCollectionData({...collectionData, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">Hero Image</label>
                <ImageUpload
                  value={heroImage}
                  onChange={setHeroImage}
                  maxFiles={1}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">Status</label>
                <select
                  value={collectionData.status}
                  onChange={(e) => setCollectionData({...collectionData, status: e.target.value})}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="ACTIVE">Active</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-primary-600">Collection Products</h3>
                <div className="text-sm text-neutral-600">
                  {selectedProducts.length} products selected
                </div>
              </div>

              {allProducts && allProducts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allProducts.map((product: any) => (
                    <div 
                      key={product.id} 
                      className={`border rounded-xl p-4 cursor-pointer transition-all ${
                        selectedProducts.includes(product.id)
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 hover:border-primary-300'
                      }`}
                      onClick={() => toggleProduct(product.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                          {product.images[0] ? (
                            <img 
                              src={product.images[0].url} 
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-400">
                              📦
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-primary-600 truncate">{product.title}</div>
                          <div className="text-sm text-neutral-500 truncate">{product.handle}</div>
                        </div>
                        <div className="flex-shrink-0">
                          {selectedProducts.includes(product.id) ? (
                            <div className="w-5 h-5 bg-primary-500 text-white rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-5 h-5 border-2 border-neutral-300 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📦</div>
                  <div className="font-semibold text-primary-600 mb-2">No products available</div>
                  <div className="text-neutral-600 mb-4">Create some products first to add them to collections</div>
                  <Link 
                    href="/admin/products/new"
                    className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Create Product
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-6">
              <h3 className="font-display text-xl font-bold text-primary-600">SEO & Metadata</h3>
              
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">Meta Title</label>
                <input
                  type="text"
                  defaultValue={collectionData.title}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                />
                <div className="text-sm text-neutral-500 mt-1">60 characters recommended</div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">Meta Description</label>
                <textarea
                  defaultValue={collectionData.description}
                  rows={3}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                />
                <div className="text-sm text-neutral-500 mt-1">160 characters recommended</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
