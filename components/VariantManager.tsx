"use client";
import { useState } from 'react';

interface Variant {
  id?: string;
  sku: string;
  price: number;
  size?: string;
  color?: string;
  inventory?: {
    quantity: number;
  };
}

interface VariantManagerProps {
  variants: Variant[];
  onChange: (variants: Variant[]) => void;
  productId?: string;
}

export default function VariantManager({ variants, onChange, productId }: VariantManagerProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addVariant = () => {
    const newVariant: Variant = {
      sku: `SKU-${Date.now()}`,
      price: 0,
      size: '',
      color: ''
    };
    onChange([...variants, newVariant]);
    setEditingIndex(variants.length);
  };

  const updateVariant = (index: number, field: keyof Variant, value: any) => {
    const updated = variants.map((variant, i) => {
      if (i === index) {
        return { ...variant, [field]: value };
      }
      return variant;
    });
    onChange(updated);
  };

  const removeVariant = (index: number) => {
    if (confirm('Are you sure you want to remove this variant?')) {
      const updated = variants.filter((_, i) => i !== index);
      onChange(updated);
      setEditingIndex(null);
    }
  };

  const saveVariant = async (index: number) => {
    if (productId && variants[index].id) {
      try {
        const response = await fetch(`/api/admin/products/${productId}/variants/${variants[index].id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(variants[index])
        });

        if (!response.ok) {
          alert('Failed to save variant');
          return;
        }
      } catch (error) {
        alert('Error saving variant');
        return;
      }
    }
    
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-bold text-primary-600">Product Variants</h3>
        <button
          onClick={addVariant}
          className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Add Variant
        </button>
      </div>

      {variants.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-neutral-300 rounded-xl">
          <div className="text-4xl mb-2">📦</div>
          <div className="font-semibold text-primary-600 mb-2">No variants created</div>
          <div className="text-neutral-600 mb-4">Add product variants with different sizes, colors, or configurations</div>
          <button
            onClick={addVariant}
            className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Add First Variant
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {variants.map((variant, index) => (
            <div key={index} className="p-6 border border-neutral-200 rounded-xl">
              {editingIndex === index ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-primary-600 mb-1">SKU *</label>
                      <input
                        type="text"
                        value={variant.sku}
                        onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-600 mb-1">Price ($) *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={variant.price / 100}
                        onChange={(e) => updateVariant(index, 'price', parseFloat(e.target.value) * 100 || 0)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-600 mb-1">Size</label>
                      <input
                        type="text"
                        value={variant.size || ''}
                        onChange={(e) => updateVariant(index, 'size', e.target.value)}
                        placeholder="S, M, L, XL"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-600 mb-1">Color</label>
                      <input
                        type="text"
                        value={variant.color || ''}
                        onChange={(e) => updateVariant(index, 'color', e.target.value)}
                        placeholder="Red, Blue, Black"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary-500 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => saveVariant(index)}
                      className="px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex-1 grid md:grid-cols-4 gap-4">
                    <div>
                      <div className="font-semibold text-primary-600">{variant.sku}</div>
                      <div className="text-sm text-neutral-500">SKU</div>
                    </div>
                    <div>
                      <div className="font-semibold">${(variant.price / 100).toFixed(2)}</div>
                      <div className="text-sm text-neutral-500">Price</div>
                    </div>
                    <div>
                      <div className="font-semibold">{variant.size || 'N/A'}</div>
                      <div className="text-sm text-neutral-500">Size</div>
                    </div>
                    <div>
                      <div className="font-semibold">{variant.color || 'N/A'}</div>
                      <div className="text-sm text-neutral-500">Color</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingIndex(index)}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeVariant(index)}
                      className="text-danger-600 hover:text-danger-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
