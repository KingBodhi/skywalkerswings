"use client";
import { useState } from 'react';
import Link from 'next/link';

const settingsCategories = [
  {
    title: 'General',
    description: 'Store information and basic settings',
    href: '/admin/settings/general',
    icon: '⚙️',
    items: ['Store name', 'Contact information', 'Currency', 'Timezone']
  },
  {
    title: 'Payments',
    description: 'Payment gateway configuration',
    href: '/admin/settings/payments', 
    icon: '💳',
    items: ['Stripe settings', 'PayPal configuration', 'Payment methods', 'Tax settings']
  },
  {
    title: 'Shipping',
    description: 'Shipping zones and rates',
    href: '/admin/settings/shipping',
    icon: '🚚', 
    items: ['Shipping zones', 'Rate tables', 'Free shipping thresholds', 'Carrier integrations']
  },
  {
    title: 'Team & Permissions',
    description: 'Manage admin users and roles',
    href: '/admin/settings/team',
    icon: '👤',
    items: ['Admin users', 'Role permissions', 'Team invitations', 'Access logs']
  },
  {
    title: 'Email & Notifications',
    description: 'Email templates and notification settings',
    href: '/admin/settings/notifications',
    icon: '📧',
    items: ['Order confirmations', 'Shipping notifications', 'Low stock alerts', 'Customer emails']
  },
  {
    title: 'Security',
    description: 'Security and compliance settings',
    href: '/admin/settings/security',
    icon: '🔒',
    items: ['Two-factor auth', 'API keys', 'Webhook endpoints', 'Audit logs']
  }
];

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-primary-600 mb-2">Settings</h1>
        <p className="text-neutral-600">Configure your store settings and preferences</p>
      </div>

      {/* Settings Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsCategories.map((category, index) => (
          <Link key={index} href={category.href} className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 hover:shadow-xl transition-all duration-300 h-full">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-primary-600 mb-2 group-hover:text-accent-500 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-neutral-600 mb-4">{category.description}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2 text-sm text-neutral-600">
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex items-center text-accent-500 font-semibold">
                Configure
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200">
        <h2 className="font-display text-xl font-bold text-primary-600 mb-6">Quick Settings</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-primary-600 mb-4">Store Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div>
                  <div className="font-medium">Store Online</div>
                  <div className="text-sm text-neutral-600">Customers can place orders</div>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" defaultChecked className="rounded border-neutral-300" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div>
                  <div className="font-medium">Maintenance Mode</div>
                  <div className="text-sm text-neutral-600">Show maintenance page to visitors</div>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="rounded border-neutral-300" />
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-primary-600 mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div>
                  <div className="font-medium">Low Stock Alerts</div>
                  <div className="text-sm text-neutral-600">Email when inventory runs low</div>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" defaultChecked className="rounded border-neutral-300" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div>
                  <div className="font-medium">Order Notifications</div>
                  <div className="text-sm text-neutral-600">Email for new orders</div>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" defaultChecked className="rounded border-neutral-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}