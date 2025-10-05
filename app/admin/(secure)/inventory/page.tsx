import { prisma } from '@/lib/prisma';

async function getInventory() {
  try {
    const inventory = await prisma.inventoryLevel.findMany({
      include: {
        variant: {
          include: {
            product: {
              include: {
                images: true
              }
            }
          }
        }
      },
      orderBy: { quantity: 'asc' }
    });
    return inventory;
  } catch (error) {
    console.error('Failed to fetch inventory:', error);
    return [];
  }
}

export default async function InventoryPage() {
  const inventory = await getInventory();
  const lowStockCount = inventory.filter(item => item.quantity < 10).length;
  const outOfStockCount = inventory.filter(item => item.quantity === 0).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-primary-600 mb-2">Inventory</h1>
        <p className="text-neutral-600">Track and manage product inventory levels</p>
      </div>

      {/* Inventory Alerts */}
      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <div className="bg-danger-50 border border-danger-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-danger-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div className="font-semibold text-danger-800">Inventory Alerts</div>
          </div>
          <div className="text-danger-700">
            {outOfStockCount > 0 && `${outOfStockCount} products are out of stock. `}
            {lowStockCount > 0 && `${lowStockCount} products are running low.`}
          </div>
        </div>
      )}

      {/* Inventory Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="text-3xl font-bold text-primary-600 mb-2">{inventory.length}</div>
          <div className="text-neutral-600">Total SKUs</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="text-3xl font-bold text-success-600 mb-2">
            {inventory.filter(item => item.quantity > 0).length}
          </div>
          <div className="text-neutral-600">In Stock</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="text-3xl font-bold text-accent-600 mb-2">{lowStockCount}</div>
          <div className="text-neutral-600">Low Stock</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="text-3xl font-bold text-danger-600 mb-2">{outOfStockCount}</div>
          <div className="text-neutral-600">Out of Stock</div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
        {inventory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-900">Product</th>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-900">SKU</th>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-900">Stock Level</th>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-900">Reserved</th>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-900">Available</th>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-900">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {inventory.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-neutral-100 rounded-lg overflow-hidden">
                          {item.variant.product.images?.[0] ? (
                            <img 
                              src={item.variant.product.images[0].url} 
                              alt={item.variant.product.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                              <span className="text-neutral-400 text-lg">📦</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-neutral-900">{item.variant.product.title}</div>
                          <div className="text-sm text-neutral-600">
                            {item.variant.size && `Size: ${item.variant.size}`}
                            {item.variant.color && ` • Color: ${item.variant.color}`}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-sm bg-neutral-100 px-2 py-1 rounded font-mono">{item.variant.sku}</code>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                        item.quantity === 0 ? 'bg-danger-100 text-danger-800' :
                        item.quantity < 10 ? 'bg-accent-100 text-accent-800' :
                        'bg-success-100 text-success-800'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          item.quantity === 0 ? 'bg-danger-500' :
                          item.quantity < 10 ? 'bg-accent-500' :
                          'bg-success-500'
                        }`}></div>
                        {item.quantity} units
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-neutral-700">{item.reserved}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-neutral-900">{item.quantity - item.reserved}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-neutral-600">{item.location}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="font-display text-xl font-bold text-primary-600 mb-4">No inventory data</h3>
            <p className="text-neutral-600">Inventory levels will appear when you add product variants</p>
          </div>
        )}
      </div>
    </div>
  );
}