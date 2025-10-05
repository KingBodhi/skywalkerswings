import { prisma } from '@/lib/prisma';
import Link from 'next/link';

async function getCollections() {
  try {
    const collections = await prisma.collection.findMany({
      include: {
        products: {
          include: {
            product: {
              include: {
                images: true,
                variants: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return collections;
  } catch (error) {
    console.error('Failed to fetch collections:', error);
    return [];
  }
}

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary-600 mb-2">Collections</h1>
          <p className="text-neutral-600">Organize products into themed collections</p>
        </div>
        <Link 
          href="/admin/collections/new"
          className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          Create Collection
        </Link>
      </div>

      {/* Collections Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <div key={collection.id} className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="aspect-[16/9] bg-gradient-to-br from-primary-100 to-primary-200 relative">
              {collection.heroImage ? (
                <img 
                  src={collection.heroImage} 
                  alt={collection.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-4xl text-primary-600">📁</span>
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white/90 text-primary-600 px-2 py-1 rounded text-sm font-semibold">
                {collection.products.length} products
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-display text-xl font-bold text-primary-600 mb-2">{collection.title}</h3>
              <p className="text-sm text-neutral-600 mb-4">/{collection.handle}</p>
              
              <div className="flex gap-2">
                <Link
                  href={`/admin/collections/${collection.id}`}
                  className="flex-1 text-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Edit
                </Link>
                <Link
                  href={`/collection/${collection.handle}`}
                  target="_blank"
                  className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors font-medium"
                >
                  View ↗
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {collections.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="font-display text-xl font-bold text-primary-600 mb-4">No collections yet</h3>
          <p className="text-neutral-600 mb-6">Collections help organize your products into themed groups</p>
          <Link 
            href="/admin/collections/new"
            className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Create First Collection
          </Link>
        </div>
      )}
    </div>
  );
}