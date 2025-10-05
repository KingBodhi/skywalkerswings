"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/ImageUpload';

export default function NewCollectionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [collection, setCollection] = useState({
    title: '',
    handle: '',
    description: '',
    status: 'DRAFT'
  });
  const [heroImage, setHeroImage] = useState<string[]>([]);

  async function createCollection() {
    if (!collection.title || !collection.handle) {
      alert('Please fill in required fields');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...collection,
          heroImage: heroImage[0] || null
        })
      });
      
      if (res.ok) {
        const newCollection = await res.json();
        router.push(`/admin/collections/${newCollection.id}`);
      } else {
        alert('Failed to create collection');
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
          href="/admin/collections"
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="font-display text-3xl font-bold text-primary-600">Create New Collection</h1>
          <p className="text-neutral-600">Organize products into themed collections</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-primary-600 mb-2">
              Collection Title *
            </label>
            <input
              type="text"
              value={collection.title}
              onChange={(e) => setCollection({
                ...collection, 
                title: e.target.value,
                handle: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')
              })}
              placeholder="Enter collection title"
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-600 mb-2">
              URL Handle *
            </label>
            <input
              type="text"
              value={collection.handle}
              onChange={(e) => setCollection({...collection, handle: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})}
              placeholder="collection-url-handle"
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
              required
            />
            <div className="text-sm text-neutral-500 mt-1">
              URL: /collection/{collection.handle || 'collection-handle'}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-600 mb-2">
              Description
            </label>
            <textarea
              value={collection.description}
              onChange={(e) => setCollection({...collection, description: e.target.value})}
              placeholder="Describe your collection..."
              rows={4}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-600 mb-2">
              Hero Image
            </label>
            <ImageUpload
              value={heroImage}
              onChange={setHeroImage}
              maxFiles={1}
            />
            <div className="text-sm text-neutral-500 mt-2">
              Upload a hero image for this collection. This will be displayed on the collection page.
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-600 mb-2">
              Status
            </label>
            <select
              value={collection.status}
              onChange={(e) => setCollection({...collection, status: e.target.value})}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
            >
              <option value="DRAFT">Draft</option>
              <option value="ACTIVE">Active</option>
            </select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Link
          href="/admin/collections"
          className="border border-neutral-300 px-6 py-3 rounded-xl hover:bg-neutral-50 transition-colors font-medium"
        >
          Cancel
        </Link>
        <button
          onClick={createCollection}
          disabled={loading || !collection.title || !collection.handle}
          className="bg-accent-500 hover:bg-accent-600 disabled:bg-neutral-400 text-white px-6 py-3 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Create Collection'}
        </button>
      </div>
    </div>
  );
}
