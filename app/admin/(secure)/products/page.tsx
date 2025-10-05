"use client";
import { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load data: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

interface Product {
  id: string;
  title: string;
  handle: string;
  status: string;
  variants: Array<{
    id: string;
    sku: string;
    price: number;
    inventory?: { quantity: number };
  }>;
  images: Array<{ url: string; alt?: string }>;
  createdAt: string;
}

export default function ProductsPage() {
  const { data: products, error, mutate } = useSWR<Product[]>('/api/admin/products', fetcher);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  if (error) {
    return (
      <div className="space-y-4">
        <div className="bg-danger-50 border border-danger-200 rounded-xl p-6">
          <h2 className="font-display text-xl font-bold text-danger-800 mb-2">Error Loading Products</h2>
          <p className="text-danger-700 mb-4">
            {error.message || 'Failed to load products. Please check your connection and try again.'}
          </p>
          <button
            onClick={() => mutate()}
            className="bg-danger-600 hover:bg-danger-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.handle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  async function deleteProduct(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This action cannot be undone.`)) return;
    
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        mutate();
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      alert('Network error');
    }
  }

  async function toggleProductStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'ACTIVE' ? 'DRAFT' : 'ACTIVE';
    
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (res.ok) {
        mutate();
      } else {
        alert('Failed to update product status');
      }
    } catch (error) {
      alert('Network error');
    }
  }

  if (!products) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-neutral-200 rounded animate-pulse"></div>
        <div className="h-64 bg-neutral-200 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary-600 mb-2">Products</h1>
          <p className="text-neutral-600">Manage your product catalog</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg"
        >
          Add Product
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          <button className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
            Export CSV
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-primary-600">Product</th>
                <th className="px-6 py-4 text-left font-semibold text-primary-600">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-primary-600">Inventory</th>
                <th className="px-6 py-4 text-left font-semibold text-primary-600">Price</th>
                <th className="px-6 py-4 text-right font-semibold text-primary-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-neutral-100 rounded-lg overflow-hidden">
                        {product.images[0] ? (
                          <img 
                            src={product.images[0].url} 
                            alt={product.images[0].alt || product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                            <span className="text-neutral-400">📦</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-primary-600">{product.title}</div>
                        <div className="text-sm text-neutral-500">{product.handle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleProductStatus(product.id, product.status)}
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.status === 'ACTIVE' 
                          ? 'bg-success-100 text-success-700 hover:bg-success-200' 
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      } transition-colors`}
                    >
                      {product.status}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      {product.variants.reduce((total, v) => total + (v.inventory?.quantity || 0), 0)} units
                    </div>
                    <div className="text-xs text-neutral-500">{product.variants.length} variants</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold">
                      ${product.variants[0] ? (product.variants[0].price / 100).toFixed(2) : '0.00'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProduct(product.id, product.title)}
                        className="text-danger-600 hover:text-danger-700 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📦</div>
            <div className="font-semibold text-primary-600 mb-2">No products found</div>
            <div className="text-neutral-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first product'}
            </div>
            <Link 
              href="/admin/products/new"
              className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Add Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}