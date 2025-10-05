import { prisma } from '@/lib/prisma';

async function getCustomers() {
  try {
    const customers = await prisma.user.findMany({
      where: { role: { not: 'ADMIN' } },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    // Get order data for each customer
    const customersWithOrders = await Promise.all(
      customers.map(async (customer) => {
        const orders = await prisma.order.findMany({
          where: { email: customer.email },
          select: {
            total: true,
            createdAt: true
          }
        });
        
        return {
          ...customer,
          orderCount: orders.length,
          totalSpent: orders.reduce((sum, order) => sum + order.total, 0),
          lastOrderDate: orders.length > 0 ? orders[0].createdAt : null
        };
      })
    );
    
    return customersWithOrders;
  } catch (error) {
    console.error('Failed to fetch customers:', error);
    return [];
  }
}

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-primary-600 mb-2">Customers</h1>
        <p className="text-neutral-600">Manage customer accounts and relationships</p>
      </div>

      {/* Customer Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="text-3xl font-bold text-primary-600 mb-2">{customers.length}</div>
          <div className="text-neutral-600">Total Customers</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="text-3xl font-bold text-success-600 mb-2">
            {customers.filter(c => c.orderCount > 0).length}
          </div>
          <div className="text-neutral-600">Active Customers</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="text-3xl font-bold text-accent-600 mb-2">
            {customers.filter(c => c.orderCount > 1).length}
          </div>
          <div className="text-neutral-600">Repeat Customers</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            ${(customers.reduce((sum, c) => sum + c.totalSpent, 0) / 100).toLocaleString()}
          </div>
          <div className="text-neutral-600">Total CLV</div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
        {customers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-900">Customer</th>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-900">Role</th>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-900">Orders</th>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-900">Total Spent</th>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-900">Last Order</th>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-900">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-primary-600 text-sm">
                            {(customer.name || customer.email).charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-neutral-900">{customer.name || 'No name'}</div>
                          <div className="text-sm text-neutral-600">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded text-sm font-medium">
                        {customer.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-neutral-900">{customer.orderCount}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-neutral-900">${(customer.totalSpent / 100).toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-neutral-600">
                        {customer.lastOrderDate ? new Date(customer.lastOrderDate).toLocaleDateString() : 'Never'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-neutral-600">
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="font-display text-xl font-bold text-primary-600 mb-4">No customers yet</h3>
            <p className="text-neutral-600">Customer accounts will appear here when people register</p>
          </div>
        )}
      </div>
    </div>
  );
}