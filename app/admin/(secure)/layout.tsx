"use client";
import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: '📊'
  },
  {
    title: 'Catalog',
    items: [
      { title: 'Products', href: '/admin/products', icon: '📦' },
      { title: 'Collections', href: '/admin/collections', icon: '📁' },
      { title: 'Inventory', href: '/admin/inventory', icon: '📋' }
    ]
  },
  {
    title: 'Content',
    items: [
      { title: 'Blog Posts', href: '/admin/blog', icon: '📝' },
      { title: 'Careers', href: '/admin/careers', icon: '💼' }
    ]
  },
  {
    title: 'Sales',
    items: [
      { title: 'Orders', href: '/admin/orders', icon: '🛒' },
      { title: 'Customers', href: '/admin/customers', icon: '👥' },
      { title: 'Analytics', href: '/admin/analytics', icon: '📈' }
    ]
  },
  {
    title: 'Settings',
    items: [
      { title: 'General', href: '/admin/settings/general', icon: '⚙️' },
      { title: 'Shipping', href: '/admin/settings/shipping', icon: '🚚' },
      { title: 'Payments', href: '/admin/settings/payments', icon: '💳' },
      { title: 'Team', href: '/admin/settings/team', icon: '👤' }
    ]
  }
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // Check authentication status
  const { data: session, error } = useSWR('/api/admin/session', fetcher);

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  // Authentication redirect effect
  useEffect(() => {
    if (error || (session && !session.authenticated)) {
      router.push('/admin/login');
    }
  }, [session, error, router]);

  // Show loading while checking authentication
  if (!session && !error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <div className="text-neutral-600">Checking authentication...</div>
        </div>
      </div>
    );
  }

  // Don't render admin interface if not authenticated
  if (!session?.authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onTouchEnd={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 bg-primary-600 text-white transition-all duration-300 flex flex-col
        ${sidebarOpen ? 'w-64' : 'w-0 lg:w-64'}
        ${sidebarCollapsed ? 'lg:!w-16' : ''}
        overflow-y-auto overflow-x-hidden
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 h-16 flex-shrink-0">
          <Link href="/admin" className={`font-display font-bold transition-all ${sidebarCollapsed ? 'lg:text-sm' : 'text-xl'}`}>
            {sidebarCollapsed ? 'WR' : 'SKYWALKER ADMIN'}
          </Link>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:block p-1 hover:bg-white/10 rounded transition-colors"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg className={`w-4 h-4 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-white/10 rounded transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              {item.href ? (
                <Link 
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
                    pathname === item.href 
                      ? 'bg-white/20 text-white' 
                      : 'hover:bg-white/10 text-white/90'
                  }`}
                  title={sidebarCollapsed ? item.title : ''}
                >
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <span className={`font-medium transition-all ${sidebarCollapsed ? 'lg:hidden' : ''}`}>
                    {item.title}
                  </span>
                </Link>
              ) : (
                <div>
                  <div className={`px-3 py-2 text-xs font-semibold text-white/70 uppercase tracking-wide ${sidebarCollapsed ? 'lg:hidden' : ''}`}>
                    {item.title}
                  </div>
                  <div className="space-y-1">
                    {item.items?.map((subItem, subIndex) => (
                      <Link 
                        key={subIndex}
                        href={subItem.href}
                        className={`flex items-center gap-3 px-6 py-2 rounded-lg transition-colors ${
                          pathname === subItem.href 
                            ? 'bg-white/20 text-white' 
                            : 'hover:bg-white/10 text-white/90'
                        } ${sidebarCollapsed ? 'lg:px-3' : ''}`}
                        title={sidebarCollapsed ? subItem.title : ''}
                      >
                        <span className="flex-shrink-0">{subItem.icon}</span>
                        <span className={`transition-all ${sidebarCollapsed ? 'lg:hidden' : ''}`}>
                          {subItem.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        
        {/* Footer */}
        <div className="p-3 border-t border-white/10 flex-shrink-0">
          <form action="/api/admin/logout" method="post">
            <button 
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left"
              title={sidebarCollapsed ? 'Logout' : ''}
            >
              <span className="flex-shrink-0">🚪</span>
              <span className={`transition-all ${sidebarCollapsed ? 'lg:hidden' : ''}`}>Logout</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-neutral-200 px-4 py-4 h-16 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="font-display text-xl font-bold text-primary-600">Admin Panel</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                target="_blank"
                className="text-accent-500 hover:text-accent-600 font-medium text-sm"
              >
                View Store ↗
              </Link>
              <div className="text-sm text-neutral-600">
                Admin User
              </div>
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}