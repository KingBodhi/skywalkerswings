"use client";
import { useState } from 'react';

export default function PaymentsSettingsPage() {
  const [stripeSettings, setStripeSettings] = useState({
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    secretKey: '••••••••••••••••',
    webhookSecret: '••••••••••••••••',
    testMode: true
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-primary-600 mb-2">Payment Settings</h1>
        <p className="text-neutral-600">Configure payment gateways and processing</p>
      </div>

      {/* Stripe Configuration */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">💳</span>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-primary-600">Stripe Configuration</h2>
            <p className="text-neutral-600">Secure payment processing by Stripe</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-success-50 border border-success-200 rounded-lg">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-semibold text-success-800">Stripe Connected</div>
                <div className="text-sm text-success-700">Ready to accept payments</div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
              stripeSettings.testMode 
                ? 'bg-accent-100 text-accent-700' 
                : 'bg-success-100 text-success-700'
            }`}>
              {stripeSettings.testMode ? 'Test Mode' : 'Live Mode'}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-primary-600 mb-2">Publishable Key</label>
              <input
                type="text"
                value={stripeSettings.publishableKey}
                onChange={(e) => setStripeSettings({...stripeSettings, publishableKey: e.target.value})}
                className="admin-input"
                placeholder="pk_test_..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-primary-600 mb-2">Secret Key</label>
              <input
                type="password"
                value={stripeSettings.secretKey}
                onChange={(e) => setStripeSettings({...stripeSettings, secretKey: e.target.value})}
                className="admin-input"
                placeholder="sk_test_..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-600 mb-2">Webhook Endpoint Secret</label>
            <input
              type="password"
              value={stripeSettings.webhookSecret}
              onChange={(e) => setStripeSettings({...stripeSettings, webhookSecret: e.target.value})}
              className="admin-input"
              placeholder="whsec_..."
            />
            <div className="text-sm text-neutral-500 mt-1">
              Webhook URL: https://yourstore.com/api/webhooks/stripe
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div>
              <div className="font-semibold text-neutral-900">Test Mode</div>
              <div className="text-sm text-neutral-600">Use Stripe test environment</div>
            </div>
            <input
              type="checkbox"
              checked={stripeSettings.testMode}
              onChange={(e) => setStripeSettings({...stripeSettings, testMode: e.target.checked})}
              className="w-5 h-5 text-primary-600 border-neutral-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* Accepted Payment Methods */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
        <h2 className="font-display text-xl font-bold text-primary-600 mb-6">Accepted Payment Methods</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Credit Cards', icon: '💳', enabled: true },
            { name: 'PayPal', icon: '🏦', enabled: false },
            { name: 'Apple Pay', icon: '📱', enabled: true },
            { name: 'Google Pay', icon: '🌐', enabled: true }
          ].map((method, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{method.icon}</span>
                <span className="font-medium text-neutral-900">{method.name}</span>
              </div>
              <input
                type="checkbox"
                defaultChecked={method.enabled}
                className="w-4 h-4 text-primary-600 border-neutral-300 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold transition-colors">
          Save Payment Settings
        </button>
      </div>
    </div>
  );
}