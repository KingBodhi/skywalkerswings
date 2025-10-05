"use client";
import { useState } from 'react';

export default function ShippingSettingsPage() {
  const [shippingZones, setShippingZones] = useState([
    {
      id: '1',
      name: 'United States',
      countries: ['United States'],
      rates: [
        { name: 'Standard Shipping', price: 995, freeThreshold: 50000 },
        { name: 'Express Shipping', price: 1995, freeThreshold: null }
      ]
    },
    {
      id: '2', 
      name: 'Canada',
      countries: ['Canada'],
      rates: [
        { name: 'Standard Shipping', price: 1495, freeThreshold: 75000 }
      ]
    }
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-primary-600 mb-2">Shipping Settings</h1>
        <p className="text-neutral-600">Configure shipping zones, rates, and policies</p>
      </div>

      {/* Free Shipping Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
        <h2 className="font-display text-xl font-bold text-primary-600 mb-6">Free Shipping</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div>
              <div className="font-semibold text-neutral-900">Offer Free Shipping</div>
              <div className="text-sm text-neutral-600">Enable free shipping promotions</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600 border-neutral-300 rounded" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-primary-600 mb-2">Free Shipping Threshold</label>
              <input
                type="number"
                defaultValue="500"
                className="admin-input"
                placeholder="Minimum order amount"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary-600 mb-2">Free Shipping Message</label>
              <input
                type="text"
                defaultValue="Free shipping on orders over $500"
                className="admin-input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Zones */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-primary-600">Shipping Zones</h2>
          <button className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
            Add Zone
          </button>
        </div>
        
        <div className="space-y-6">
          {shippingZones.map((zone) => (
            <div key={zone.id} className="border border-neutral-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-primary-600 text-lg">{zone.name}</h3>
                <button className="text-danger-600 hover:text-danger-700 text-sm font-medium">
                  Delete Zone
                </button>
              </div>
              
              <div className="space-y-3">
                {zone.rates.map((rate, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <div className="font-medium text-neutral-900">{rate.name}</div>
                      <div className="text-sm text-neutral-600">
                        {rate.freeThreshold ? `Free over $${rate.freeThreshold / 100}` : 'No free shipping'}
                      </div>
                    </div>
                    <div className="font-bold text-primary-600">
                      ${(rate.price / 100).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold transition-colors">
          Save Shipping Settings
        </button>
      </div>
    </div>
  );
}