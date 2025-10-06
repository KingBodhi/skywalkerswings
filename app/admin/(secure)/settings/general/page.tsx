"use client";
import { useState } from 'react';

export default function GeneralSettingsPage() {
  const [settings, setSettings] = useState({
    storeName: 'SkyFox Swings',
    storeEmail: 'info@skyfoxswings.com',
    storePhone: '1-800-SKYFOX',
    currency: 'USD',
    timezone: 'America/New_York',
    storeOnline: true,
    maintenanceMode: false
  });

  async function saveSettings() {
    try {
      const res = await fetch('/api/admin/settings/general', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      
      if (res.ok) {
        alert('Settings saved successfully');
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      alert('Network error');
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-primary-600 mb-2">General Settings</h1>
        <p className="text-neutral-600">Configure basic store information and preferences</p>
      </div>

      {/* Store Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
        <h2 className="font-display text-xl font-bold text-primary-600 mb-6">Store Information</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-primary-600 mb-2">Store Name</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => setSettings({...settings, storeName: e.target.value})}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-primary-600 mb-2">Store Email</label>
            <input
              type="email"
              value={settings.storeEmail}
              onChange={(e) => setSettings({...settings, storeEmail: e.target.value})}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-primary-600 mb-2">Store Phone</label>
            <input
              type="tel"
              value={settings.storePhone}
              onChange={(e) => setSettings({...settings, storePhone: e.target.value})}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-primary-600 mb-2">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => setSettings({...settings, currency: e.target.value})}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
            </select>
          </div>
        </div>
      </div>

      {/* Store Status */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
        <h2 className="font-display text-xl font-bold text-primary-600 mb-6">Store Status</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div>
              <div className="font-semibold text-neutral-900">Store Online</div>
              <div className="text-sm text-neutral-600">Allow customers to place orders</div>
            </div>
            <input
              type="checkbox"
              checked={settings.storeOnline}
              onChange={(e) => setSettings({...settings, storeOnline: e.target.checked})}
              className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
            />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div>
              <div className="font-semibold text-neutral-900">Maintenance Mode</div>
              <div className="text-sm text-neutral-600">Show maintenance page to visitors</div>
            </div>
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
              className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button 
          onClick={saveSettings}
          className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold transition-colors"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
