import { prisma } from '@/lib/prisma';
import Link from "next/link";

async function getAnalyticsData() {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
      totalRevenue,
      totalOrders,
      totalCustomers,
      topProducts,
      recentOrders,
      dailySales
    ] = await Promise.all([
      prisma.order.aggregate({
        _sum: { total: true },
        where: {
          createdAt: { gte: thirtyDaysAgo },
          status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] }
        }
      }),
      prisma.order.count({
        where: { createdAt: { gte: thirtyDaysAgo } }
      }),
      prisma.user.count({
        where: { 
          role: { not: 'ADMIN' },
          createdAt: { gte: thirtyDaysAgo }
        }
      }),
      prisma.orderItem.groupBy({
        by: ['title'],
        _sum: { qty: true, price: true },
        orderBy: { _sum: { price: 'desc' } },
        take: 5
      }),
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: { items: true }
      }),
      // Mock daily sales data - you can implement real daily aggregation
      Promise.resolve([
        { date: '2024-01-10', sales: 2400 },
        { date: '2024-01-11', sales: 1800 },
        { date: '2024-01-12', sales: 3200 },
        { date: '2024-01-13', sales: 2800 },
        { date: '2024-01-14', sales: 4100 },
        { date: '2024-01-15', sales: 3600 },
        { date: '2024-01-16', sales: 4800 }
      ])
    ]);

    return {
      revenue: totalRevenue._sum.total || 0,
      orders: totalOrders,
      customers: totalCustomers,
      conversionRate: totalOrders > 0 ? ((totalCustomers / totalOrders) * 100).toFixed(1) : '0.0',
      topProducts: topProducts.map(p => ({
        name: p.title,
        sales: p._sum.qty || 0,
        revenue: p._sum.price || 0
      })),
      recentOrders,
      dailySales
    };
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return {
      revenue: 0,
      orders: 0,
      customers: 0,
      conversionRate: '0.0',
      topProducts: [],
      recentOrders: [],
      dailySales: []
    };
  }
}

export default async function AnalyticsPage() {
  const analytics = await getAnalyticsData();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-primary-600 mb-2">Analytics</h1>
        <p className="text-neutral-600">Track your store's performance and growth</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">💰</span>
            <span className="text-sm font-semibold text-success-600 bg-success-100 px-2 py-1 rounded-full">
              +24%
            </span>
          </div>
          <div className="text-3xl font-bold text-primary-600 mb-1">
            ${(analytics.revenue / 100).toLocaleString()}
          </div>
          <div className="text-neutral-600">Revenue (30d)</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">🛒</span>
            <span className="text-sm font-semibold text-success-600 bg-success-100 px-2 py-1 rounded-full">
              +12%
            </span>
          </div>
          <div className="text-3xl font-bold text-primary-600 mb-1">{analytics.orders}</div>
          <div className="text-neutral-600">Orders (30d)</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">👥</span>
            <span className="text-sm font-semibold text-success-600 bg-success-100 px-2 py-1 rounded-full">
              +8%
            </span>
          </div>
          <div className="text-3xl font-bold text-primary-600 mb-1">{analytics.customers}</div>
          <div className="text-neutral-600">New Customers</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">📈</span>
            <span className="text-sm font-semibold text-accent-600 bg-accent-100 px-2 py-1 rounded-full">
              {analytics.conversionRate}%
            </span>
          </div>
          <div className="text-3xl font-bold text-primary-600 mb-1">{analytics.conversionRate}%</div>
          <div className="text-neutral-600">Conversion Rate</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <h2 className="font-display text-xl font-bold text-primary-600 mb-6">Top Products (30 days)</h2>
          <div className="space-y-4">
            {analytics.topProducts.length > 0 ? analytics.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div>
                  <div className="font-medium text-neutral-900">{product.name}</div>
                  <div className="text-sm text-neutral-600">{product.sales} sold</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-neutral-900">${(product.revenue / 100).toLocaleString()}</div>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-neutral-500">
                <div className="text-2xl mb-2">📦</div>
                <div>No sales data yet</div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-primary-600">Recent Orders</h2>
            <Link href="/admin/orders" className="text-accent-500 hover:text-accent-600 font-medium text-sm">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {analytics.recentOrders.length > 0 ? analytics.recentOrders.map((order: any) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div>
                  <div className="font-mono text-sm text-primary-600">#{order.id.slice(-8)}</div>
                  <div className="text-sm text-neutral-600">{order.email}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-neutral-900">${(order.total / 100).toFixed(2)}</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'PAID' ? 'bg-success-100 text-success-700' :
                    order.status === 'PENDING' ? 'bg-accent-100 text-accent-700' :
                    'bg-neutral-100 text-neutral-700'
                  }`}>
                    {order.status}
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-neutral-500">
                <div className="text-2xl mb-2">🛒</div>
                <div>No orders yet</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}