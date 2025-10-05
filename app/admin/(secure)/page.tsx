import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getDashboardData() {
  try {
    const totalProducts = await prisma.product.count();
    const totalCollections = await prisma.collection.count();
    const totalOrders = await prisma.order.count();
    const totalCustomers = await prisma.user.count({ where: { role: { not: 'ADMIN' } } });
    
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { items: true }
    });
    
    const lowStockProducts = await prisma.variant.findMany({
      where: { inventory: { quantity: { lt: 10 } } },
      include: { product: true, inventory: true },
      take: 5
    });
    
    const monthlyRevenue = await prisma.order.aggregate({
      _sum: { total: true },
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30))
        }
      }
    });

    return {
      totalProducts,
      totalCollections,
      totalOrders,
      totalCustomers,
      recentOrders,
      lowStockProducts,
      monthlyRevenue: monthlyRevenue._sum.total || 0
    };
  } catch (error) {
    console.error('Dashboard error:', error);
    return {
      totalProducts: 0,
      totalCollections: 0,
      totalOrders: 0,
      totalCustomers: 0,
      recentOrders: [],
      lowStockProducts: [],
      monthlyRevenue: 0
    };
  }
}

export default async function AdminDashboard() {
  const data = await getDashboardData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-primary-600 mb-2">Dashboard</h1>
        <p className="text-neutral-600">Overview of your store performance</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/products">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="text-3xl mb-4">📦</div>
            <div className="text-3xl font-bold text-primary-600 mb-1">{data.totalProducts}</div>
            <div className="text-neutral-600">Products</div>
          </div>
        </Link>

        <Link href="/admin/orders">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">🛒</span>
              <span className="text-sm font-semibold text-success-600 bg-success-100 px-2 py-1 rounded-full">
                New
              </span>
            </div>
            <div className="text-3xl font-bold text-primary-600 mb-1">{data.totalOrders}</div>
            <div className="text-neutral-600">Orders</div>
          </div>
        </Link>

        <Link href="/admin/customers">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="text-3xl mb-4">👥</div>
            <div className="text-3xl font-bold text-primary-600 mb-1">{data.totalCustomers}</div>
            <div className="text-neutral-600">Customers</div>
          </div>
        </Link>

        <Link href="/admin/analytics">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="text-3xl mb-4">💰</div>
            <div className="text-3xl font-bold text-primary-600 mb-1">
              ${(data.monthlyRevenue / 100).toLocaleString()}
            </div>
            <div className="text-neutral-600">Revenue</div>
          </div>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-primary-600">Recent Orders</h2>
            <Link href="/admin/orders" className="text-accent-500 hover:text-accent-600 font-medium">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {data.recentOrders.length > 0 ? data.recentOrders.map((order: any) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div>
                  <div className="font-mono text-sm text-primary-600">#{order.id.slice(-8)}</div>
                  <div className="text-sm text-neutral-600">{order.email}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-neutral-900">${(order.total / 100).toFixed(2)}</div>
                  <div className="text-xs px-2 py-1 bg-success-100 text-success-700 rounded-full">
                    {order.status}
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-neutral-500">
                <div className="text-2xl mb-2">🛒</div>
                <div className="mb-2">No orders yet</div>
                <Link href="/" className="text-accent-500 hover:text-accent-600 text-sm font-medium">
                  Visit store
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-primary-600">Inventory Alerts</h2>
            <Link href="/admin/inventory" className="text-accent-500 hover:text-accent-600 font-medium">
              Manage Stock
            </Link>
          </div>
          
          <div className="space-y-4">
            {data.lowStockProducts.length > 0 ? data.lowStockProducts.map((variant: any) => (
              <div key={variant.id} className="flex items-center justify-between p-4 bg-danger-50 border border-danger-200 rounded-lg">
                <div>
                  <div className="font-medium text-neutral-900">{variant.product.title}</div>
                  <div className="text-sm text-neutral-600">{variant.sku}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-danger-600">{variant.inventory?.quantity || 0} left</div>
                  <Link 
                    href={`/admin/products/${variant.productId}`}
                    className="text-xs text-accent-500 hover:text-accent-600 font-medium"
                  >
                    Restock
                  </Link>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-neutral-500">
                <div className="text-2xl mb-2">✅</div>
                <div>All products well stocked</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
        <h2 className="font-display text-xl font-bold text-primary-600 mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            href="/admin/products/new"
            className="flex items-center gap-3 p-4 bg-accent-50 hover:bg-accent-100 rounded-xl transition-colors border border-accent-200"
          >
            <span className="text-2xl">➕</span>
            <div>
              <div className="font-semibold text-accent-700">Add Product</div>
              <div className="text-sm text-accent-600">Create new product</div>
            </div>
          </Link>
          
          <Link 
            href="/admin/orders"
            className="flex items-center gap-3 p-4 bg-primary-50 hover:bg-primary-100 rounded-xl transition-colors border border-primary-200"
          >
            <span className="text-2xl">📋</span>
            <div>
              <div className="font-semibold text-primary-700">Process Orders</div>
              <div className="text-sm text-primary-600">Review pending orders</div>
            </div>
          </Link>
          
          <Link 
            href="/admin/inventory"
            className="flex items-center gap-3 p-4 bg-danger-50 hover:bg-danger-100 rounded-xl transition-colors border border-danger-200"
          >
            <span className="text-2xl">⚠️</span>
            <div>
              <div className="font-semibold text-danger-700">Stock Alerts</div>
              <div className="text-sm text-danger-600">Review low inventory</div>
            </div>
          </Link>
          
          <Link 
            href="/admin/analytics"
            className="flex items-center gap-3 p-4 bg-success-50 hover:bg-success-100 rounded-xl transition-colors border border-success-200"
          >
            <span className="text-2xl">📊</span>
            <div>
              <div className="font-semibold text-success-700">View Reports</div>
              <div className="text-sm text-success-600">Sales analytics</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}