import { prisma } from '@/lib/prisma';
import Link from 'next/link';

async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return orders;
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return [];
  }
}

const statusColors = {
  PENDING: 'bg-accent-100 text-accent-800 border-accent-200',
  PAID: 'bg-success-100 text-success-800 border-success-200',
  SHIPPED: 'bg-primary-100 text-primary-800 border-primary-200',
  DELIVERED: 'bg-success-100 text-success-800 border-success-200',
  CANCELLED: 'bg-neutral-100 text-neutral-800 border-neutral-200',
  REFUNDED: 'bg-danger-100 text-danger-800 border-danger-200'
};

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary-600 mb-2">Orders</h1>
          <p className="text-neutral-600">Manage customer orders and fulfillment</p>
        </div>
        <div className="text-sm text-neutral-500">
          {orders.length} total orders
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="text-3xl font-bold text-primary-600 mb-2">{orders.length}</div>
          <div className="text-neutral-600">Total Orders</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="text-3xl font-bold text-accent-600 mb-2">
            {orders.filter(o => o.status === 'PENDING').length}
          </div>
          <div className="text-neutral-600">Pending</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="text-3xl font-bold text-success-600 mb-2">
            {orders.filter(o => o.status === 'PAID').length}
          </div>
          <div className="text-neutral-600">Paid</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            ${(orders.reduce((sum, o) => sum + o.total, 0) / 100).toLocaleString()}
          </div>
          <div className="text-neutral-600">Revenue</div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-900">Order</th>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-900">Customer</th>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-900">Items</th>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-900">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-900">Total</th>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-900">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-mono text-sm text-primary-600">#{order.id.slice(-8)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-neutral-900">{order.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        {order.items.map(item => (
                          <div key={item.id} className="text-neutral-700">
                            {item.qty}x {item.title}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[order.status as keyof typeof statusColors] || statusColors.PENDING}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-neutral-900">${(order.total / 100).toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-neutral-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="font-display text-xl font-bold text-primary-600 mb-4">No orders yet</h3>
            <p className="text-neutral-600 mb-6">Orders will appear here when customers make purchases</p>
            <Link 
              href="/"
              className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Visit Store
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}